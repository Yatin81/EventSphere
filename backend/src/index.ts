import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import eventRoutes from "./routes/event.routes";
import seatRoutes from "./routes/seat.routes";
import bookingRoutes from "./routes/booking.routes";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/seats", seatRoutes);
app.use("/booking", bookingRoutes);

app.listen(3000, () => {
  console.log("Server running on 3000");
});