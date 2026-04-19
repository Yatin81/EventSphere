import { BaseRepository } from "./base.repository";
import { IBookingRepository } from "../interfaces/IBookingRepository";
import { Booking } from "@prisma/client";

export class BookingRepository extends BaseRepository implements IBookingRepository {
  async createBooking(data: any): Promise<Booking> {
    return this.db.booking.create({
      data: {
        userId: data.userId,
        eventId: data.eventId,
        status: data.status,
        totalAmount: data.totalAmount,
        seats: {
          create: data.seatIds.map((seatId: number) => ({
            seatId: seatId
          }))
        }
      }
    });
  }

  async getBookingById(id: number): Promise<Booking | null> {
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