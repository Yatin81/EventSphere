import { Request, Response } from "express";
import { IVenueService } from "../interfaces/IVenueService";

export class VenueController {
  constructor(private service: IVenueService) {}

  async getVenues(req: Request, res: Response) {
    try {
      const venues = await this.service.getAllVenues();
      res.json(venues);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async createVenue(req: Request, res: Response) {
    try {
      const venue = await this.service.createVenue(req.body);
      res.json(venue);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async deleteVenue(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await this.service.deleteVenue(id);
      res.json({ message: "Venue deleted" });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }
}
