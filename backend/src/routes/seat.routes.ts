import { Router } from "express";
import { SeatController } from "../controllers/seat.controller";
import { SeatService } from "../services/seat.service";
import { SeatRepository } from "../repositories/seat.repository";
import { authMiddleware } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();
const repo = new SeatRepository();
const service = new SeatService(repo);
const controller = new SeatController(service);

router.post(
  "/",
  authMiddleware,
  requireRole("ADMIN"),
  controller.createSeats.bind(controller)
);

router.get("/:eventId/layout", controller.getLayout.bind(controller));
router.get("/:eventId/available", controller.getAvailable.bind(controller));

router.post(
  "/lock",
  authMiddleware,
  controller.lockSeats.bind(controller)
);

export default router;