import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/axios";

export default function SeatSelection() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState<any[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSeats();
    const interval = setInterval(fetchSeats, 10000); // Polling every 10s for real-time feel
    return () => clearInterval(interval);
  }, [eventId]);

  const fetchSeats = () => {
    api.get(`/seats/${eventId}/layout`).then((res) => {
      setSeats(res.data);
    });
  };

  const toggleSeat = (id: number, status: string, lockedUntil: string | null) => {
    if (status === "BOOKED") return;
    
    // Check if locked by someone else
    if (lockedUntil && new Date(lockedUntil) > new Date()) {
       // Ideally we'd also check lockedByUserId, but for simplicity:
       return;
    }

    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  };

  const handleBooking = async () => {
    if (selected.length === 0) return;
    setLoading(true);
    try {
      // 1. Lock seats first
      await api.post("/seats/lock", {
        eventId: Number(eventId),
        seatIds: selected,
      });

      // 2. Then Book (in a real app, this might be a separate payment step)
      await api.post("/booking", {
        eventId: Number(eventId),
        seatIds: selected,
      });

      navigate("/success");
    } catch (e: any) {
      alert("Booking failed: " + (e.response?.data?.error || e.message));
      fetchSeats(); // Refresh layout
    } finally {
      setLoading(false);
    }
  };

  const getSeatColor = (seat: any) => {
    if (seat.status === "BOOKED") return "bg-slate-800 text-slate-600 cursor-not-allowed opacity-50";
    
    const isLocked = seat.lockedUntil && new Date(seat.lockedUntil) > new Date();
    if (isLocked) return "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 cursor-not-allowed";

    if (selected.includes(seat.id)) return "bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-110 z-10 font-bold border-blue-400";
    
    return "bg-slate-900 border border-white/5 hover:border-blue-500/50 hover:bg-slate-800 transition-all text-slate-400";
  };

  return (
    <div className="space-y-12 pb-20">
      <header className="text-center">
        <h1 className="text-4xl font-black tracking-tighter uppercase italic mb-4">RESERVE YOUR <span className="text-blue-500">EXPERIENCE</span></h1>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">Select your preferred seats from the layout below. Seats are held for 5 minutes once you proceed to checkout.</p>
      </header>

      <div className="relative max-w-4xl mx-auto bg-slate-900/50 border border-white/5 p-12 rounded-[3rem] backdrop-blur-xl">
        {/* Stage Label */}
        <div className="w-full h-2 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full mb-16 opacity-50 shadow-[0_10px_30px_rgba(59,130,246,0.3)]"></div>
        <p className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 -mt-12 mb-20 italic">STAGE / FRONT AREA</p>

        {seats.length > 0 ? (
          <>
            <div className="grid grid-cols-10 gap-4 mb-20 px-4">
              {seats.map((seat) => (
                <div
                  key={seat.id}
                  onClick={() => toggleSeat(seat.id, seat.status, seat.lockedUntil)}
                  className={`aspect-square flex items-center justify-center rounded-xl text-xs cursor-pointer transition-all duration-300 transform ${getSeatColor(seat)}`}
                >
                  {seat.row}{seat.seatNumber}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-8 border-t border-white/5 pt-10">
               <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-slate-900 border border-white/5 rounded-md"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Available</span>
               </div>
               <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-blue-600 rounded-md"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Selected</span>
               </div>
               <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-yellow-500/20 border border-yellow-500/30 rounded-md"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Locked</span>
               </div>
               <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-slate-800 rounded-md opacity-50"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Occupied</span>
               </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20 bg-slate-950/30 rounded-[2rem] border border-white/5">
             <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8 opacity-20 outline outline-4 outline-white/5">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
             </div>
             <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-2 italic">Null_Geometry / No Seats</h3>
             <p className="text-slate-400 text-sm font-medium mb-10">This cinematic experience has no seating map configured yet.</p>
             {localStorage.getItem("role") === "ADMIN" && (
                <Link to="/admin/create-seats">
                   <button className="bg-prime-blue text-white font-black px-8 py-3 rounded-xl text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-all shadow-2xl shadow-prime-blue/20">
                      Deploy Seating Map
                   </button>
                </Link>
             )}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-slate-950/80 backdrop-blur-2xl border-t border-white/5 px-8 py-6 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Seats Selected</p>
            <p className="text-2xl font-black">{selected.length} <span className="text-sm font-medium text-slate-500 ml-1 italic capitalize">Tickets</span></p>
          </div>

          <button
            onClick={handleBooking}
            disabled={selected.length === 0 || loading}
            className={`px-12 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all transform active:scale-95 shadow-2xl ${
              selected.length > 0 
                ? "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/30" 
                : "bg-slate-800 text-slate-500 cursor-not-allowed"
            }`}
          >
            {loading ? "INITIALIZING SECURE BOOKING..." : "CONFIRM RESERVATION"}
          </button>
        </div>
      </div>
    </div>
  );
}