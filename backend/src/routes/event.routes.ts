import { Router } from "express";
import { EventController } from "../controllers/event.controller";
import { EventService } from "../services/event.service";
import { EventRepository } from "../repositories/event.repository";
import { authMiddleware } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();
const repo = new EventRepository();
const service = new EventService(repo);
const controller = new EventController(service);

router.get("/", controller.getEvents.bind(controller));
router.get("/:id", controller.getEvent.bind(controller));

router.post(
  "/",
  authMiddleware,
  requireRole("ADMIN"),
  controller.createEvent.bind(controller)
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  controller.deleteEvent.bind(controller)
);

export default router;