import { Request, Response } from "express";
import { EventService } from "../services/event.service.js";

const service = new EventService();

export class EventController {
  async getEvents(req: Request, res: Response) {
    const data = await service.getEvents();
    res.json(data);
  }

  async createEvent(req: Request, res: Response) {
    const data = await service.createEvent(req.body);
    res.json(data);
  }
}