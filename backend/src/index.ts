import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import eventRoutes from "./routes/event.routes";
import seatRoutes from "./routes/seat.routes";
import bookingRoutes from "./routes/booking.routes";
import venueRoutes from "./routes/venue.routes";
import { CleanupService } from "./services/cleanup.service";
import { SeatRepository } from "./repositories/seat.repository";

dotenv.config();

const seatRepo = new SeatRepository();
const cleanupService = new CleanupService(seatRepo);
cleanupService.start(60000);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/seats", seatRoutes);
app.use("/booking", bookingRoutes);
app.use("/venues", venueRoutes);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});