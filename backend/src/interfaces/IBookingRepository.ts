import { Booking } from "@prisma/client";

export interface IBookingRepository {
  createBooking(data: any): Promise<Booking>;
  getBookingById(id: number): Promise<Booking | null>;
}
