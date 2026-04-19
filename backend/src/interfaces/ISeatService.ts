import { Seat } from "@prisma/client";

export interface ISeatService {
  createSeats(eventId: number, rows: string[], seatsPerRow: number): Promise<any>;
  getSeatLayout(eventId: number): Promise<any>;
  getAvailableSeats(eventId: number): Promise<Seat[]>;
  lockSeats(userId: number, eventId: number, seatIds: number[]): Promise<void>;
}
