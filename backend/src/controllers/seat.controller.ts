import { Request, Response } from "express";
import { ISeatService } from "../interfaces/ISeatService";

export class SeatController {
  constructor(private service: ISeatService) {}

  async createSeats(req: Request, res: Response) {
    try {
      let { eventId, rows, seatsPerRow } = req.body;
      eventId = Number(eventId);
      seatsPerRow = Number(seatsPerRow);

      if (typeof rows === "string") {
        rows = rows.split(",");
      }

      const result = await this.service.createSeats(eventId, rows, seatsPerRow);
      res.json(result);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async getLayout(req: Request, res: Response) {
    try {
      const eventId = Number(req.params.eventId);
      const layout = await this.service.getSeatLayout(eventId);
      res.json(layout);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async getAvailable(req: Request, res: Response) {
    try {
      const eventId = Number(req.params.eventId);
      const seats = await this.service.getAvailableSeats(eventId);
      res.json(seats);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async lockSeats(req: any, res: Response) {
     try {
       const userId = req.user.id;
       const { eventId, seatIds } = req.body;
       await this.service.lockSeats(userId, eventId, seatIds);
       res.json({ message: "Seats locked" });
     } catch (e: any) {
       res.status(400).json({ error: e.message });
     }
  }
}