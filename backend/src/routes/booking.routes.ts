import { Router } from "express";
import { BookingController } from "../controllers/booking.controllers";
import { authMiddleware } from "../middleware/middleware";

const router = Router();
const controller = new BookingController();

router.post("/", authMiddleware, controller.book.bind(controller));

export default router;