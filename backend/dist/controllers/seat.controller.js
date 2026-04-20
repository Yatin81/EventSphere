export class SeatController {
    service;
    constructor(service) {
        this.service = service;
    }
    async createSeats(req, res) {
        try {
            let { eventId, rows, seatsPerRow } = req.body;
            eventId = Number(eventId);
            seatsPerRow = Number(seatsPerRow);
            if (typeof rows === "string") {
                rows = rows.split(",");
            }
            const result = await this.service.createSeats(eventId, rows, seatsPerRow);
            res.json(result);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
    async getLayout(req, res) {
        try {
            const eventId = Number(req.params.eventId);
            const layout = await this.service.getSeatLayout(eventId);
            res.json(layout);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
    async getAvailable(req, res) {
        try {
            const eventId = Number(req.params.eventId);
            const seats = await this.service.getAvailableSeats(eventId);
            res.json(seats);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
    async lockSeats(req, res) {
        try {
            const userId = req.user.id;
            const { eventId, seatIds } = req.body;
            await this.service.lockSeats(userId, eventId, seatIds);
            res.json({ message: "Seats locked" });
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
}
