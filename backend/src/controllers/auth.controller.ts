import { Request, Response } from "express";
import { IAuthService } from "../interfaces/IAuthService";

export class AuthController {
  constructor(private service: IAuthService) {}

  async signup(req: Request, res: Response) {
    try {
      const { email, password, role } = req.body;
      const data = await this.service.signup(email, password, role);
      res.json(data);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const data = await this.service.login(email, password);
      res.json(data);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }
}