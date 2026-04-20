import { BaseRepository } from "./base.repository";
export class VenueRepository extends BaseRepository {
    async findAll() {
        return this.db.venue.findMany();
    }
    async findById(id) {
        return this.db.venue.findUnique({ where: { id } });
    }
    async create(data) {
        return this.db.venue.create({ data });
    }
    async delete(id) {
        await this.db.venue.delete({ where: { id } });
    }
}
