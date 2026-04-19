import { BaseRepository } from "./base.repository";
import { IVenueRepository } from "../interfaces/IVenueRepository";
import { Venue } from "@prisma/client";

export class VenueRepository extends BaseRepository implements IVenueRepository {
  async findAll(): Promise<Venue[]> {
    return this.db.venue.findMany();
  }

  async findById(id: number): Promise<Venue | null> {
    return this.db.venue.findUnique({ where: { id } });
  }

  async create(data: any): Promise<Venue> {
    return this.db.venue.create({ data });
  }

  async delete(id: number): Promise<void> {
    await this.db.venue.delete({ where: { id } });
  }
}
