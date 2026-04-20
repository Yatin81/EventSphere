export class BookingController {
    service;
    constructor(service) {
        this.service = service;
    }
    async book(req, res) {
        try {
            const userId = req.user.id;
            const { eventId, seatIds } = req.body;
            if (!eventId || !seatIds || seatIds.length === 0) {
                return res.status(400).json({ error: "Invalid input" });
            }
            const booking = await this.service.bookSeats(userId, eventId, seatIds);
            res.json(booking);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
    async getMyBookings(req, res) {
        try {
            const data = await this.service.getUserBookings(req.user.id);
            res.json(data);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
    async cancel(req, res) {
        try {
            const id = Number(req.params.id);
            const data = await this.service.cancelBooking(id);
            res.json(data);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
}
