import { useEffect, useState } from "react";
import { api } from "../api/axios";

export default function MyTickets() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/booking/my-bookings");
      setBookings(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id: number) => {
    if (!confirm("Are you sure you want to cancel this reservation?")) return;
    try {
      await api.post(`/booking/${id}/cancel`);
      fetchBookings();
    } catch (e: any) {
      alert("Cancellation failed: " + (e.response?.data?.error || e.message));
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <header className="relative py-10 px-8 rounded-3xl bg-gradient-to-br from-indigo-600/10 via-transparent to-blue-600/10 border border-white/5 overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">
            MY <span className="text-blue-500">RESERVATIONS</span>
          </h1>
          <p className="text-slate-400 mt-2 font-medium">Manage your active tickets and history.</p>
        </div>
      </header>

      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-20 text-slate-700 font-black uppercase tracking-widest italic animate-pulse">Syncing Tickets...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-32 bg-slate-900/20 border border-dashed border-white/5 rounded-[3rem]">
            <p className="text-slate-600 font-bold uppercase tracking-widest">No reservations found in your history.</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.id}
              className={`group bg-slate-900/50 border border-white/5 p-8 rounded-[2rem] flex flex-col md:flex-row justify-between items-center transition-all hover:bg-slate-900 ${booking.status === "CANCELLED" ? "opacity-50 grayscale" : ""}`}
            >
              <div className="flex items-center space-x-8 mb-6 md:mb-0">
                <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center border border-white/10 text-3xl font-black text-slate-600 italic">
                  {booking.event.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight uppercase group-hover:text-blue-400 transition-colors">
                    {booking.event.name}
                  </h3>
                  <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mt-1 italic">
                    {new Date(booking.event.date).toLocaleDateString()} @ {booking.event.venue.name}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {booking.seats.map((s: any) => (
                      <span key={s.seatId} className="bg-blue-600/10 text-blue-400 text-[10px] font-black px-3 py-1 rounded-full border border-blue-500/20 uppercase tracking-widest">
                        {s.seat.row}{s.seat.seatNumber}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center md:text-right space-y-4 w-full md:w-auto">
                 <div>
                    <span className={`text-[9px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full border ${booking.status === "CONFIRMED" ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"}`}>
                       {booking.status}
                    </span>
                 </div>
                 <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic pt-2">Total Paid: <span className="text-white ml-2">${booking.totalAmount}</span></p>
                 
                 {booking.status === "CONFIRMED" && (
                    <button
                      onClick={() => cancelBooking(booking.id)}
                      className="w-full md:w-auto bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white px-6 py-3 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest border border-white/5"
                    >
                      Cancel Access
                    </button>
                 )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
