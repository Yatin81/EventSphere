import { prisma } from "../lib/prisma";
export class BookingService {
    bookingRepo;
    seatRepo;
    pricingStrategy;
    constructor(bookingRepo, seatRepo, pricingStrategy) {
        this.bookingRepo = bookingRepo;
        this.seatRepo = seatRepo;
        this.pricingStrategy = pricingStrategy;
    }
    async bookSeats(userId, eventId, seatIds) {
        // Use transaction for atomic booking
        return await prisma.$transaction(async (tx) => {
            // 1. Calculate occupancy for Strategy-based Pricing
            const allSeatsCount = await tx.seat.count({ where: { eventId } });
            const bookedSeatsCount = await tx.seat.count({ where: { eventId, status: "BOOKED" } });
            const occupancyRate = allSeatsCount > 0 ? bookedSeatsCount / allSeatsCount : 0;
            const BASE_PRICE = 100;
            const finalPrice = this.pricingStrategy.calculatePrice(BASE_PRICE, occupancyRate);
            // 2. Verify seats are still available/locked by this user
            for (const id of seatIds) {
                const seat = await tx.seat.findUnique({ where: { id } });
                if (!seat || (seat.status !== "AVAILABLE" && seat.status !== "BOOKED")) {
                    if (seat?.status === "BOOKED")
                        throw new Error(`Seat ${id} is already booked`);
                }
                if (seat?.lockedByUserId && seat.lockedByUserId !== userId && seat.lockedUntil && seat.lockedUntil > new Date()) {
                    throw new Error(`Seat ${id} is locked by another user`);
                }
            }
            // 3. Create booking with calculated price
            const booking = await this.bookingRepo.createBooking({
                userId,
                eventId,
                status: "CONFIRMED",
                totalAmount: seatIds.length * finalPrice,
                seatIds
            });
            // 4. Update seat status to BOOKED
            for (const id of seatIds) {
                await tx.seat.update({
                    where: { id },
                    data: {
                        status: "BOOKED",
                        lockedUntil: null,
                        lockedByUserId: null
                    }
                });
            }
            return booking;
        });
    }
    async getUserBookings(userId) {
        return prisma.booking.findMany({
            where: { userId },
            include: {
                event: { include: { venue: true } },
                seats: { include: { seat: true } }
            },
            orderBy: { id: "desc" }
        });
    }
    async cancelBooking(bookingId) {
        return await prisma.$transaction(async (tx) => {
            const booking = await tx.booking.findUnique({
                where: { id: bookingId },
                include: { seats: true, event: true }
            });
            if (!booking)
                throw new Error("Booking not found");
            if (booking.status === "CANCELLED")
                throw new Error("Booking already cancelled");
            // Refund Policy: No cancellations within 24 hours of event
            const eventDate = new Date(booking.event.date);
            const now = new Date();
            const diffMs = eventDate.getTime() - now.getTime();
            const diffHours = diffMs / (1000 * 60 * 60);
            if (diffHours < 24) {
                throw new Error("Cancellations are not permitted within 24 hours of the event start time.");
            }
            // 1. Update booking status
            await tx.booking.update({
                where: { id: bookingId },
                data: { status: "CANCELLED" }
            });
            // 2. Release seats
            for (const bs of booking.seats) {
                await tx.seat.update({
                    where: { id: bs.seatId },
                    data: {
                        status: "AVAILABLE",
                        lockedUntil: null,
                        lockedByUserId: null
                    }
                });
            }
            return { message: "Booking cancelled and seats released" };
        });
    }
}
