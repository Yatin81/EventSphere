export class EventService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async getEvents() {
        return this.repo.getAllEvents();
    }
    async getEvent(id) {
        return this.repo.getEventById(id);
    }
    async createEvent(data) {
        return this.repo.createEvent(data);
    }
    async deleteEvent(id) {
        return this.repo.deleteEvent(id);
    }
}
