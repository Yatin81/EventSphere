import { BaseRepository } from "./base.repository";
export class AuthRepository extends BaseRepository {
    async findByEmail(email) {
        return this.db.user.findUnique({
            where: { email }
        });
    }
    async createUser(data) {
        return this.db.user.create({
            data
        });
    }
}
