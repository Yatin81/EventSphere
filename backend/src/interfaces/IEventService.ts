import { Event } from "@prisma/client";

export interface IEventService {
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | null>;
  createEvent(data: any): Promise<Event>;
  deleteEvent(id: number): Promise<void>;
}
