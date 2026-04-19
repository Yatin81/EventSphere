import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [venueId, setVenueId] = useState("");
  const [venues, setVenues] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingVenues, setFetchingVenues] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await api.get("/venues");
        setVenues(res.data);
        if (res.data.length > 0) {
          setVenueId(res.data[0].id.toString());
        }
      } catch (e) {
        console.error("Failed to fetch venues", e);
      } finally {
        setFetchingVenues(false);
      }
    };
    fetchVenues();
  }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!venueId) {
      alert("Please select a valid venue.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/events", {
        name,
        date,
        venueId: Number(venueId),
      });
      alert("Event created successfully");
      navigate("/admin");
    } catch (e: any) {
      alert("Creation failed: " + (e.response?.data?.error || e.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="bg-slate-900/50 border border-white/5 rounded-[2.5rem] p-12 backdrop-blur-xl shadow-2xl">
        <header className="mb-12">
           <Link to="/admin" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-blue-500 transition-colors flex items-center mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Return to CMD Center
           </Link>
           <h1 className="text-4xl font-black tracking-tighter uppercase italic">INITIALIZE <span className="text-blue-500">EVENT</span></h1>
           <p className="text-slate-400 text-sm mt-3 font-medium">Define metadata for a new system event entry.</p>
        </header>

        <form onSubmit={create} className="space-y-8">
          <div className="space-y-4">
             <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">Event Identification</label>
                <input
                  className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-5 outline-none focus:border-blue-500/50 transition-all font-bold text-sm placeholder:text-slate-800"
                  placeholder="E.G. QUANTUM SUMMIT 2026"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">Schedule / Timestamp</label>
                   <input
                     type="datetime-local"
                     className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-5 outline-none focus:border-blue-500/50 transition-all font-bold text-sm text-slate-300"
                     value={date}
                     onChange={(e) => setDate(e.target.value)}
                     required
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">Venue Assignment</label>
                   {fetchingVenues ? (
                     <div className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-5 animate-pulse text-slate-700 font-bold text-sm">
                        LOADING LOCATIONS...
                     </div>
                   ) : venues.length > 0 ? (
                     <select
                       className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-5 outline-none focus:border-blue-500/50 transition-all font-bold text-sm text-slate-300 appearance-none cursor-pointer"
                       value={venueId}
                       onChange={(e) => setVenueId(e.target.value)}
                       required
                     >
                       {venues.map((v) => (
                         <option key={v.id} value={v.id}>{v.name.toUpperCase()} — {v.location.toUpperCase()}</option>
                       ))}
                     </select>
                   ) : (
                     <div className="w-full bg-red-500/10 border border-red-500/20 rounded-2xl px-6 py-5 text-red-500 font-bold text-sm flex flex-col space-y-2">
                        <span className="text-[10px] uppercase">No venues detected in sector.</span>
                        <Link to="/admin?tab=venues" className="text-[9px] uppercase underline tracking-widest hover:text-white transition-colors">Deploy Venue First</Link>
                     </div>
                   )}
                </div>
             </div>
          </div>

          <button 
            type="submit" 
            disabled={loading || venues.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-black py-6 rounded-2xl transition-all shadow-2xl shadow-blue-500/30 uppercase text-xs tracking-widest transform active:scale-[0.98]"
          >
            {loading ? "PROCESSING ENTITY..." : "CREATE EVENT ENTITY"}
          </button>
        </form>
      </div>
    </div>
  );
}