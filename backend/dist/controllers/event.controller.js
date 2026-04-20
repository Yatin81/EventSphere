export class EventController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getEvents(req, res) {
        try {
            const events = await this.service.getEvents();
            res.json(events);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
    async getEvent(req, res) {
        try {
            const id = Number(req.params.id);
            const event = await this.service.getEvent(id);
            res.json(event);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
    async createEvent(req, res) {
        try {
            const event = await this.service.createEvent(req.body);
            res.json(event);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
    async deleteEvent(req, res) {
        try {
            const id = Number(req.params.id);
            await this.service.deleteEvent(id);
            res.json({ message: "Event deleted" });
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
}
