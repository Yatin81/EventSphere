import { prisma } from "../lib/prisma";
import { redis } from "../lib/redis";
import { BookingRepository } from "../repositories/booking.repository";

export class BookingService {
  repo = new BookingRepository();

  async bookSeats(userId: number, eventId: number, seatIds: number[]) {
    if (!seatIds || seatIds.length === 0) {
      throw new Error("No seats selected");
    }

    const lockKeys = seatIds.map((id) => `seat:${id}`);
    for (const key of lockKeys) {
      const locked = await redis.set(key, "locked", "NX", "EX", 60);
      if (!locked) {
        throw new Error("Some seats are being booked by another user");
      }
    }

    try {
      const booking = await prisma.$transaction(async (tx) => {
        const seats = await this.repo.findAvailableSeats(tx, seatIds);

        if (seats.length !== seatIds.length) {
          throw new Error("Some seats already booked");
        }

        const created = await this.repo.createBooking(tx, {
          userId,
          eventId,
          status: "CONFIRMED",
          totalAmount: seatIds.length * 100
        });

        await this.repo.markSeatsBooked(tx, seatIds);
        await this.repo.linkSeats(tx, created.id, seatIds);

        return created;
      });

      return booking;
    } finally {
      await redis.del(...lockKeys);
    }
  }
}