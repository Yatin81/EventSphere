import { Event } from "@prisma/client";

export interface IEventRepository {
  getAllEvents(): Promise<Event[]>;
  getEventById(id: number): Promise<Event | null>;
  createEvent(data: any): Promise<Event>;
  deleteEvent(id: number): Promise<void>;
}
