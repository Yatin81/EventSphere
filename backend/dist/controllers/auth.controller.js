export class AuthController {
    service;
    constructor(service) {
        this.service = service;
    }
    async signup(req, res) {
        try {
            const { email, password, role } = req.body;
            const data = await this.service.signup(email, password, role);
            res.json(data);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const data = await this.service.login(email, password);
            res.json(data);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
}
