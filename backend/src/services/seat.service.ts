import { ISeatRepository } from "../interfaces/ISeatRepository";
import { ISeatService } from "../interfaces/ISeatService";

export class SeatService implements ISeatService {
  constructor(private repo: ISeatRepository) {}

  async createSeats(eventId: number, rows: string[], seatsPerRow: number) {
    const seats = [];
    for (const row of rows) {
      for (let i = 1; i <= seatsPerRow; i++) {
        seats.push({
          eventId,
          row,
          seatNumber: i,
          status: "AVAILABLE"
        });
      }
    }
    return this.repo.createSeats(seats);
  }

  async getSeatLayout(eventId: number) {
    return this.repo.getSeatsByEvent(eventId);
  }

  async getAvailableSeats(eventId: number) {
    return this.repo.getAvailableSeats(eventId);
  }

  async lockSeats(userId: number, eventId: number, seatIds: number[]) {
    // Lock for 5 minutes
    const lockedUntil = new Date(Date.now() + 5 * 60 * 1000);
    
    for (const id of seatIds) {
      const seat = await this.repo.findSeatById(id);
      if (!seat || seat.status !== "AVAILABLE") {
         throw new Error(`Seat ${id} is not available`);
      }
      
      // Check if already locked by someone else
      if (seat.lockedUntil && seat.lockedUntil > new Date() && seat.lockedByUserId !== userId) {
          throw new Error(`Seat ${id} is already locked by another user`);
      }

      await this.repo.updateSeatStatus(id, "AVAILABLE", lockedUntil, userId);
    }
  }
}