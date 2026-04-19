import { Router } from "express";
import { EventController } from "../controllers/event.controller";
import { authMiddleware } from "../middleware/middleware";

const router = Router();
const controller = new EventController();

router.get("/", controller.getEvents.bind(controller));
router.get("/:id", controller.getEvent.bind(controller));

router.post("/", authMiddleware, controller.createEvent.bind(controller));
router.delete("/:id", authMiddleware, controller.deleteEvent.bind(controller));

export default router;