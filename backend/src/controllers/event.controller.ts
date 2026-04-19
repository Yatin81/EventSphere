import { Request, Response } from "express";
import { IEventService } from "../interfaces/IEventService";

export class EventController {
  constructor(private service: IEventService) {}

  async getEvents(req: Request, res: Response) {
    try {
      const events = await this.service.getEvents();
      res.json(events);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async getEvent(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const event = await this.service.getEvent(id);
      res.json(event);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async createEvent(req: Request, res: Response) {
    try {
      const event = await this.service.createEvent(req.body);
      res.json(event);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async deleteEvent(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await this.service.deleteEvent(id);
      res.json({ message: "Event deleted" });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }
}