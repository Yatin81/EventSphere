export class VenueService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async getAllVenues() {
        return this.repo.findAll();
    }
    async getVenue(id) {
        return this.repo.findById(id);
    }
    async createVenue(data) {
        return this.repo.create(data);
    }
    async deleteVenue(id) {
        return this.repo.delete(id);
    }
}
