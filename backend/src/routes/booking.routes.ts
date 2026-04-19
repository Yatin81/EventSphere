import { Router } from "express";
import { BookingController } from "../controllers/booking.controllers";
import { authMiddleware } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();
const controller = new BookingController();

router.post(
  "/",
  authMiddleware,
  requireRole("USER"),
  controller.book.bind(controller)
);

export default router;