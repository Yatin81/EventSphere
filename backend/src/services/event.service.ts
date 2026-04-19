import { EventRepository } from "../repositories/event.repository";

export class EventService {
  repo = new EventRepository();

  async getEvents() {
    return this.repo.getAllEvents();
  }

  async getEvent(id: number) {
    const event = await this.repo.getEventById(id);
    if (!event) throw new Error("Event not found");
    return event;
  }

  async createEvent(data: any) {
    if (!data.name || !data.date || !data.venueId) {
      throw new Error("Missing required fields");
    }

    return this.repo.createEvent(data);
  }

  async deleteEvent(id: number) {
    return this.repo.deleteEvent(id);
  }
}