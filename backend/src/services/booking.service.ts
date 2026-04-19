import { prisma } from "../lib/prisma";
import { redis } from "../lib/redis";
import { BookingRepository } from "../repositories/booking.repository";

export class BookingService {
  repo = new BookingRepository();

  async bookSeats(userId: number, eventId: number, seatIds: number[]) {
    const lockKeys = seatIds.map((id) => `seat:${id}`);

    // 🔒 Step 1: Lock seats in Redis
    for (const key of lockKeys) {
      const result = await redis.set(key, "locked", "NX", "EX", 60);
      if (!result) {
        throw new Error("Some seats are being booked by another user");
      }
    }

    try {
      // 🔥 Step 2: DB Transaction
      const booking = await prisma.$transaction(async (tx) => {
        const seats = await this.repo.findAvailableSeats(tx, seatIds);

        if (seats.length !== seatIds.length) {
          throw new Error("Some seats already booked");
        }

        const createdBooking = await this.repo.createBooking(tx, {
          userId,
          eventId,
          status: "CONFIRMED",
          totalAmount: seatIds.length * 100
        });

        await this.repo.markSeatsBooked(tx, seatIds);

        await this.repo.linkSeats(tx, createdBooking.id, seatIds);

        return createdBooking;
      });

      return booking;
    } finally {
      await redis.del(...lockKeys);
    }
  }
}