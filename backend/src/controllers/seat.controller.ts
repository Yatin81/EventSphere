import { Request, Response } from "express";
import { SeatService } from "../services/seat.service";

const service = new SeatService();

export class SeatController {
  async createSeats(req: Request, res: Response) {
    try {
      let { eventId, rows, seatsPerRow } = req.body;

      eventId = Number(eventId);
      seatsPerRow = Number(seatsPerRow);

      if (typeof rows === "string") {
        rows = rows.split(",");
      }

      const result = await service.createSeats(
        eventId,
        rows,
        seatsPerRow
      );

      res.json(result);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async getLayout(req: Request, res: Response) {
    try {
      const eventId = Number(req.params.eventId);

      const layout = await service.getSeatLayout(eventId);

      res.json(layout);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async getAvailable(req: Request, res: Response) {
    try {
      const eventId = Number(req.params.eventId);

      const seats = await service.getAvailableSeats(eventId);

      res.json(seats);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }
}