import { Venue } from "@prisma/client";

export interface IVenueRepository {
  findAll(): Promise<Venue[]>;
  findById(id: number): Promise<Venue | null>;
  create(data: any): Promise<Venue>;
  delete(id: number): Promise<void>;
}
