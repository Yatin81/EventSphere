import { Booking } from "@prisma/client";

export interface IBookingService {
  bookSeats(userId: number, eventId: number, seatIds: number[]): Promise<Booking>;
  getUserBookings(userId: number): Promise<any[]>;
  cancelBooking(bookingId: number): Promise<any>;
}
