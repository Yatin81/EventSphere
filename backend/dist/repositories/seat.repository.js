import { BaseRepository } from "./base.repository";
export class SeatRepository extends BaseRepository {
    async createSeats(data) {
        return this.db.seat.createMany({
            data
        });
    }
    async getSeatsByEvent(eventId) {
        return this.db.seat.findMany({
            where: { eventId }
        });
    }
    async getAvailableSeats(eventId) {
        return this.db.seat.findMany({
            where: {
                eventId,
                status: "AVAILABLE",
                OR: [
                    { lockedUntil: null },
                    { lockedUntil: { lt: new Date() } }
                ]
            }
        });
    }
    async updateSeatStatus(seatId, status, lockedUntil, lockedByUserId) {
        return this.db.seat.update({
            where: { id: seatId },
            data: {
                status,
                lockedUntil,
                lockedByUserId
            }
        });
    }
    async findSeatById(id) {
        return this.db.seat.findUnique({
            where: { id }
        });
    }
    async releaseExpiredLocks() {
        await this.db.seat.updateMany({
            where: {
                status: "AVAILABLE",
                lockedUntil: { lt: new Date() }
            },
            data: {
                lockedUntil: null,
                lockedByUserId: null
            }
        });
    }
}
