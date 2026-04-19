import { Response } from "express";
import { IBookingService } from "../interfaces/IBookingService";

export class BookingController {
  constructor(private service: IBookingService) {}

  async book(req: any, res: Response) {
    try {
      const userId = req.user.id;
      const { eventId, seatIds } = req.body;

      if (!eventId || !seatIds || seatIds.length === 0) {
        return res.status(400).json({ error: "Invalid input" });
      }

      const booking = await this.service.bookSeats(
        userId,
        eventId,
        seatIds
      );

      res.json(booking);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async getMyBookings(req: any, res: Response) {
    try {
      const data = await this.service.getUserBookings(req.user.id);
      res.json(data);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async cancel(req: any, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await this.service.cancelBooking(id);
      res.json(data);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }
}