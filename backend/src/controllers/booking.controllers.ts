import { Response } from "express";
import { BookingService } from "../services/booking.service";

const service = new BookingService();

export class BookingController {
  async book(req: any, res: Response) {
    try {
      const userId = req.user.id;
      const { eventId, seatIds } = req.body;

      if (!eventId || !seatIds || seatIds.length === 0) {
        return res.status(400).json({ error: "Invalid input" });
      }

      const booking = await service.bookSeats(
        userId,
        eventId,
        seatIds
      );

      res.json(booking);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }
}