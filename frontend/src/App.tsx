import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import SeatSelection from "./pages/SeatSelection";
import AdminDashboard from "./pages/AdminDashboard";
import CreateEvent from "./pages/CreateEvent";
import CreateSeats from "./pages/CreateSeats";
import BookingSuccess from "./pages/BookingSuccess";
import MyTickets from "./pages/MyTickets";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />

      <main className="pt-24">
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/events/:id" element={<EventDetails />} />

          <Route
            path="/booking/:eventId"
            element={
              <ProtectedRoute role="USER">
                <SeatSelection />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/create-event"
            element={
              <ProtectedRoute role="ADMIN">
                <CreateEvent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/create-seats"
            element={
              <ProtectedRoute role="ADMIN">
                <CreateSeats />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-tickets"
            element={
              <ProtectedRoute role="USER">
                <MyTickets />
              </ProtectedRoute>
            }
          />

          <Route path="/success" element={<BookingSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}