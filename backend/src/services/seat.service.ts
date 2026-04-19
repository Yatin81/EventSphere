import { SeatRepository } from "../repositories/seat.repository";

export class SeatService {
  repo = new SeatRepository();

  async createSeats(eventId: number, rows: string[], seatsPerRow: number) {
    if (!Array.isArray(rows) || rows.length === 0) {
      throw new Error("Invalid rows");
    }

    if (!seatsPerRow || seatsPerRow <= 0) {
      throw new Error("Invalid seatsPerRow");
    }

    const data = rows.flatMap((row) =>
      Array.from({ length: seatsPerRow }, (_, i) => ({
        eventId,
        row,
        seatNumber: i + 1,
        status: "AVAILABLE"
      }))
    );

    return this.repo.createManySeats(data);
  }

  async getSeatLayout(eventId: number) {
    const seats = await this.repo.getSeatsByEvent(eventId);

    const layout: any = {};

    for (const seat of seats) {
      if (!layout[seat.row]) {
        layout[seat.row] = [];
      }
      layout[seat.row].push(seat);
    }

    return layout;
  }

  async getAvailableSeats(eventId: number) {
    return this.repo.getAvailableSeats(eventId);
  }
}