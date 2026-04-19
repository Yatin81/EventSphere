import { BaseRepository } from "./base.repository";
import { ISeatRepository } from "../interfaces/ISeatRepository";
import { Seat } from "@prisma/client";

export class SeatRepository extends BaseRepository implements ISeatRepository {
  async createSeats(data: any[]): Promise<any> {
    return this.db.seat.createMany({
      data
    });
  }

  async getSeatsByEvent(eventId: number): Promise<Seat[]> {
    return this.db.seat.findMany({
      where: { eventId }
    });
  }

  async getAvailableSeats(eventId: number): Promise<Seat[]> {
    return this.db.seat.findMany({
      where: {
        eventId,
        status: "AVAILABLE",
        OR: [
          { lockedUntil: null },
          { lockedUntil: { lt: new Date() } }
        ]
      }
    });
  }

  async updateSeatStatus(seatId: number, status: string, lockedUntil?: Date | null, lockedByUserId?: number | null): Promise<Seat> {
    return this.db.seat.update({
      where: { id: seatId },
      data: {
        status,
        lockedUntil,
        lockedByUserId
      }
    });
  }

  async findSeatById(id: number): Promise<Seat | null> {
    return this.db.seat.findUnique({
      where: { id }
    });
  }
}