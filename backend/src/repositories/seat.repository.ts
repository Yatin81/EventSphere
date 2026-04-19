import { prisma } from "../lib/prisma";

export class SeatRepository {
  async createManySeats(data: any[]) {
    return prisma.seat.createMany({
      data
    });
  }

  async getSeatsByEvent(eventId: number) {
    return prisma.seat.findMany({
      where: { eventId },
      orderBy: [
        { row: "asc" },
        { seatNumber: "asc" }
      ]
    });
  }

  async getAvailableSeats(eventId: number) {
    return prisma.seat.findMany({
      where: {
        eventId,
        status: "AVAILABLE"
      }
    });
  }
}