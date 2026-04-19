import { IVenueRepository } from "../interfaces/IVenueRepository";
import { IVenueService } from "../interfaces/IVenueService";

export class VenueService implements IVenueService {
  constructor(private repo: IVenueRepository) {}

  async getAllVenues() {
    return this.repo.findAll();
  }

  async getVenue(id: number) {
    return this.repo.findById(id);
  }

  async createVenue(data: any) {
    return this.repo.create(data);
  }

  async deleteVenue(id: number) {
    return this.repo.delete(id);
  }
}
