import { Seat } from "@prisma/client";

export interface ISeatRepository {
  createSeats(data: any[]): Promise<any>;
  getSeatsByEvent(eventId: number): Promise<Seat[]>;
  getAvailableSeats(eventId: number): Promise<Seat[]>;
  updateSeatStatus(seatId: number, status: string, lockedUntil?: Date | null, lockedByUserId?: number | null): Promise<Seat>;
  findSeatById(id: number): Promise<Seat | null>;
  releaseExpiredLocks(): Promise<void>;
}
