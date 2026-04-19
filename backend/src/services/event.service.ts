import { IEventRepository } from "../interfaces/IEventRepository";
import { IEventService } from "../interfaces/IEventService";

export class EventService implements IEventService {
  constructor(private repo: IEventRepository) {}

  async getEvents() {
    return this.repo.getAllEvents();
  }

  async getEvent(id: number) {
    return this.repo.getEventById(id);
  }

  async createEvent(data: any) {
    return this.repo.createEvent(data);
  }

  async deleteEvent(id: number) {
    return this.repo.deleteEvent(id);
  }
}