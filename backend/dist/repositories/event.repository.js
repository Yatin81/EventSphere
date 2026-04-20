import { BaseRepository } from "./base.repository";
import { Prisma } from "@prisma/client";
export class EventRepository extends BaseRepository {
    async getAllEvents() {
        return this.db.event.findMany({
            include: {
                venue: true
            }
        });
    }
    async getEventById(id) {
        return this.db.event.findUnique({
            where: { id },
            include: {
                venue: true,
                seats: true
            }
        });
    }
    async createEvent(data) {
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
        }
        catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2003') {
                    throw new Error("Selected venue does not exist.");
                }
            }
            throw e;
        }
    }
    async deleteEvent(id) {
        await this.db.event.delete({
            where: { id }
        });
    }
}
