import { EventRepository } from "../repositories/event.repository.js";

export class EventService {
  repo = new EventRepository();

  getEvents() {
    return this.repo.getEvents();
  }

  createEvent(data: any) {
    return this.repo.createEvent(data);
  }
}