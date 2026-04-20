import { BaseRepository } from "./base.repository";
export class BookingRepository extends BaseRepository {
    async createBooking(data) {
        return this.db.booking.create({
            data: {
                userId: data.userId,
                eventId: data.eventId,
                status: data.status,
                totalAmount: data.totalAmount,
                seats: {
                    create: data.seatIds.map((seatId) => ({
                        seatId: seatId
                    }))
                }
            }
        });
    }
    async getBookingById(id) {
        return this.db.booking.findUnique({
            where: { id },
            include: {
                seats: true,
                user: true,
                event: true
            }
        });
    }
}
