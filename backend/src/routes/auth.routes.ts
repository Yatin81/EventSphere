import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { AuthRepository } from "../repositories/auth.repository";

const router = Router();
const repo = new AuthRepository();
const service = new AuthService(repo);
const controller = new AuthController(service);

router.post("/signup", controller.signup.bind(controller));
router.post("/login", controller.login.bind(controller));

export default router;