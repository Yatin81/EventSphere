import { Router } from "express";
import { SeatController } from "../controllers/seat.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();
const controller = new SeatController();

router.post(
  "/",
  authMiddleware,
  requireRole("ADMIN"),
  controller.createSeats.bind(controller)
);

router.get("/:eventId/layout", controller.getLayout.bind(controller));
router.get("/:eventId/available", controller.getAvailable.bind(controller));

export default router;