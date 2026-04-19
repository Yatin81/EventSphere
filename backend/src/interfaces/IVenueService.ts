import { Venue } from "@prisma/client";

export interface IVenueService {
  getAllVenues(): Promise<Venue[]>;
  getVenue(id: number): Promise<Venue | null>;
  createVenue(data: any): Promise<Venue>;
  deleteVenue(id: number): Promise<void>;
}
