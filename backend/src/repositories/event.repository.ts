import { BaseRepository } from "./base.repository";
import { IEventRepository } from "../interfaces/IEventRepository";
import { Prisma, Event } from "@prisma/client";

export class EventRepository extends BaseRepository implements IEventRepository {
  async getAllEvents(): Promise<Event[]> {
    return this.db.event.findMany({
      include: {
        venue: true
      }
    });
  }

  async getEventById(id: number): Promise<Event | null> {
    return this.db.event.findUnique({
      where: { id },
      include: {
        venue: true,
        seats: true
      }
    });
  }

  async createEvent(data: any): Promise<Event> {
    try {
      return await this.db.event.create({
        data: {
          name: data.name,
          date: new Date(data.date),
          venueId: data.venueId,
          category: data.category || "Trending",
          imageUrl: data.imageUrl,
          description: data.description
        }
      });
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          throw new Error("Selected venue does not exist.");
        }
      }
      throw e;
    }
  }

  async deleteEvent(id: number): Promise<void> {
    await this.db.event.delete({
      where: { id }
    });
  }
}