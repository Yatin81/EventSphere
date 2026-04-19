import { Router } from "express";
import { BookingController } from "../controllers/booking.controllers";
import { BookingService } from "../services/booking.service";
import { BookingRepository } from "../repositories/booking.repository";
import { SeatRepository } from "../repositories/seat.repository";
import { DynamicPricing } from "../services/pricing_strategies.service";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const bookingRepo = new BookingRepository();
const seatRepo = new SeatRepository();
const pricingStrategy = new DynamicPricing();
const service = new BookingService(bookingRepo, seatRepo, pricingStrategy);
const controller = new BookingController(service);

router.post("/", authMiddleware, controller.book.bind(controller));
router.get("/my-bookings", authMiddleware, controller.getMyBookings.bind(controller));
router.post("/:id/cancel", authMiddleware, controller.cancel.bind(controller));

export default router;