import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function CreateSeats() {
  const [eventId, setEventId] = useState("");
  const [rows, setRows] = useState("");
  const [seatsPerRow, setSeatsPerRow] = useState("");
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingEvents, setFetchingEvents] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data);
        if (res.data.length > 0) {
          setEventId(res.data[0].id.toString());
        }
      } catch (e) {
        console.error("Failed to fetch events", e);
      } finally {
        setFetchingEvents(false);
      }
    };
    fetchEvents();
  }, []);

  const generate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventId) {
      alert("Please select a valid event.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/seats", {
        eventId: Number(eventId),
        rows: rows.split(",").map((r) => r.trim()),
        seatsPerRow: Number(seatsPerRow),
      });
      alert("Seats generated successfully");
      navigate("/admin");
    } catch (e: any) {
      alert("Generation failed: " + (e.response?.data?.error || e.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="bg-slate-900/50 border border-white/5 rounded-[2.5rem] p-12 backdrop-blur-xl shadow-2xl">
        <header className="mb-12">
           <Link to="/admin" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-purple-500 transition-colors flex items-center mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Return to CMD Center
           </Link>
           <h1 className="text-4xl font-black tracking-tighter uppercase italic">CONFIGURE <span className="text-purple-500">LAYOUT</span></h1>
           <p className="text-slate-400 text-sm mt-3 font-medium">Batch generate seating structures for an event.</p>
        </header>

        <form onSubmit={generate} className="space-y-8">
          <div className="space-y-6">
             <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">Assigned Event</label>
                {fetchingEvents ? (
                  <div className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-5 animate-pulse text-slate-700 font-bold text-sm">
                     IDENTIFYING TARGET EVENTS...
                  </div>
                ) : events.length > 0 ? (
                  <select
                    className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-5 outline-none focus:border-purple-500/50 transition-all font-bold text-sm text-slate-300 appearance-none cursor-pointer"
                    value={eventId}
                    onChange={(e) => setEventId(e.target.value)}
                    required
                  >
                    {events.map((ev) => (
                      <option key={ev.id} value={ev.id}>{ev.name.toUpperCase()} — {ev.venue?.name?.toUpperCase() || "GLOBAL"}</option>
                    ))}
                  </select>
                ) : (
                  <div className="w-full bg-red-500/10 border border-red-500/20 rounded-2xl px-6 py-5 text-red-500 font-bold text-sm flex flex-col space-y-2">
                     <span className="text-[10px] uppercase">No events found in registry.</span>
                     <Link to="/admin?tab=events" className="text-[9px] uppercase underline tracking-widest hover:text-white transition-colors">Initialize Event First</Link>
                  </div>
                )}
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">Row Identifiers (Comma Separated)</label>
                   <input
                     className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-5 outline-none focus:border-purple-500/50 transition-all font-bold text-sm placeholder:text-slate-800"
                     placeholder="A, B, C, D"
                     value={rows}
                     onChange={(e) => setRows(e.target.value)}
                     required
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">Seats Count Per Row</label>
                   <input
                     className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-5 outline-none focus:border-purple-500/50 transition-all font-bold text-sm placeholder:text-slate-800"
                     placeholder="Count: 10"
                     value={seatsPerRow}
                     onChange={(e) => setSeatsPerRow(e.target.value)}
                     required
                   />
                </div>
             </div>
          </div>

          <button 
            type="submit" 
            disabled={loading || events.length === 0}
            className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-black py-6 rounded-2xl transition-all shadow-2xl shadow-purple-500/30 uppercase text-xs tracking-widest transform active:scale-[0.98]"
          >
            {loading ? "GENERATING GEOMETRY..." : "GENERATE SEATING MAPPING"}
          </button>
        </form>
      </div>
    </div>
  );
}