import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const service = new AuthService();

export class AuthController {
  async signup(req: Request, res: Response) {
    try {
      const { email, password, role } = req.body;

      const data = await service.signup(email, password, role);

      res.json(data);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const data = await service.login(email, password);

      res.json(data);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }
}