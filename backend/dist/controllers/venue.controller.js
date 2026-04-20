export class VenueController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getVenues(req, res) {
        try {
            const venues = await this.service.getAllVenues();
            res.json(venues);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
    async createVenue(req, res) {
        try {
            const venue = await this.service.createVenue(req.body);
            res.json(venue);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
    async deleteVenue(req, res) {
        try {
            const id = Number(req.params.id);
            await this.service.deleteVenue(id);
            res.json({ message: "Venue deleted" });
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
}
