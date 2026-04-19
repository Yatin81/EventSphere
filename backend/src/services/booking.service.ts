import { prisma } from "../lib/prisma";
import { BookingRepository } from "../repositories/booking.repository";

export class BookingService {
  repo = new BookingRepository();

  async bookSeats(userId: number, eventId: number, seatIds: number[]) {
    if (!seatIds || seatIds.length === 0) {
      throw new Error("No seats selected");
    }

    return prisma.$transaction(async (tx) => {
      const seats = await this.repo.findAvailableSeats(tx, seatIds);

      if (seats.length !== seatIds.length) {
        throw new Error("Some seats already booked");
      }
      const booking = await this.repo.createBooking(tx, {
        userId,
        eventId,
        status: "CONFIRMED",
        totalAmount: seatIds.length * 100
      });
      await this.repo.markSeatsBooked(tx, seatIds);
      await this.repo.linkSeats(tx, booking.id, seatIds);

      return booking;
    });
  }
}