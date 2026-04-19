import { prisma } from "../lib/prisma";

export class EventRepository {
  async getAllEvents() {
    return prisma.event.findMany({
      include: {
        venue: true
      }
    });
  }

  async getEventById(id: number) {
    return prisma.event.findUnique({
      where: { id },
      include: {
        venue: true,
        seats: true
      }
    });
  }

  async createEvent(data: any) {
    return prisma.event.create({
      data
    });
  }

  async deleteEvent(id: number) {
    return prisma.event.delete({
      where: { id }
    });
  }
}