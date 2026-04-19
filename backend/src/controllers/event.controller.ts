import { Request, Response } from "express";
import { EventService } from "../services/event.service";

const service = new EventService();

export class EventController {
  async getEvents(req: Request, res: Response) {
    try {
      const events = await service.getEvents();
      res.json(events);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async getEvent(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const event = await service.getEvent(id);
      res.json(event);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async createEvent(req: Request, res: Response) {
    try {
      const event = await service.createEvent(req.body);
      res.json(event);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async deleteEvent(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await service.deleteEvent(id);
      res.json({ message: "Event deleted" });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }
}