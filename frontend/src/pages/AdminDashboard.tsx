import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { Link, useSearchParams } from "react-router-dom";

export default function AdminDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "events";
  const [events, setEvents] = useState<any[]>([]);
  const [venues, setVenues] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState({ revenue: 0, occupancy: 0 });
  const [loading, setLoading] = useState(true);

  const setActiveTab = (tab: string) => {
    setSearchParams({ tab });
  };

  // Venue form state
  const [vName, setVName] = useState("");
  const [vLocation, setVLocation] = useState("");

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "events") {
        const res = await api.get("/events");
        setEvents(res.data);
        // Calculate basic analytics
        const totalRevenue = res.data.reduce((acc: number, e: any) => acc + (e.bookings?.reduce((a: number, b: any) => a + b.totalAmount, 0) || 0), 0);
        setAnalytics({ revenue: totalRevenue, occupancy: 75 }); // Mock occupancy for now
      } else if (activeTab === "venues") {
        const res = await api.get("/venues");
        setVenues(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    await api.delete(`/events/${id}`);
    fetchData();
  };

  const createVenue = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/venues", { name: vName, location: vLocation });
    setVName("");
    setVLocation("");
    fetchData();
    alert("Venue initialized.");
  };

  return (
    <div className="space-y-12 pb-20">
      <header className="bg-slate-900/50 border border-white/5 p-12 rounded-[3rem] backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 blur-[120px] -mr-48 -mt-48 transition-all group-hover:bg-purple-600/20"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-8 md:mb-0">
             <h1 className="text-5xl font-black tracking-tighter uppercase italic">
                COMMAND <span className="text-purple-500">CENTER</span>
             </h1>
             <p className="text-slate-400 mt-2 font-medium tracking-wide">Elite Administrative Infrastructure for EventSphere.</p>
          </div>
          <div className="flex bg-slate-950/50 p-2 rounded-2xl border border-white/5">
             <button 
                onClick={() => setActiveTab("events")}
                className={`px-8 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all ${activeTab === "events" ? "bg-purple-600 text-white shadow-xl shadow-purple-500/20" : "text-slate-500 hover:text-white"}`}
             >
                Events
             </button>
             <button 
                onClick={() => setActiveTab("venues")}
                className={`px-8 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all ${activeTab === "venues" ? "bg-purple-600 text-white shadow-xl shadow-purple-500/20" : "text-slate-500 hover:text-white"}`}
             >
                Venues
             </button>
          </div>
        </div>
      </header>

      {/* Analytics Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-slate-900/30 border border-white/5 p-8 rounded-[2rem] hover:border-purple-500/20 transition-all">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 mb-2">GROSS_REVENUE</p>
            <p className="text-4xl font-black text-white">${analytics.revenue}<span className="text-xs font-medium text-slate-500 ml-2 italic">USD</span></p>
         </div>
         <div className="bg-slate-900/30 border border-white/5 p-8 rounded-[2rem] hover:border-blue-500/20 transition-all">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 mb-2">AVG_OCCUPANCY</p>
            <p className="text-4xl font-black text-white">{analytics.occupancy}<span className="text-xs font-medium text-slate-500 ml-2 italic">%</span></p>
         </div>
         <div className="bg-slate-900/30 border border-white/5 p-8 rounded-[2rem] hover:border-emerald-500/20 transition-all">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 mb-2">SYSTEM_HEALTH</p>
            <p className="text-4xl font-black text-white">NOMINAL<span className="text-xs font-medium text-emerald-500 ml-2 italic">100%</span></p>
         </div>
      </section>

      {activeTab === "events" ? (
        <section className="space-y-8">
          <div className="flex justify-between items-end px-2">
             <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 italic">ACTIVE_INVENTORY / EVENTS</h3>
             <Link to="/admin/create-event">
                <button className="bg-white text-black font-black px-6 py-3 rounded-xl text-[10px] tracking-widest uppercase hover:bg-purple-600 hover:text-white transition-all shadow-xl hover:shadow-purple-500/20">Init_Event</button>
             </Link>
          </div>

          <div className="space-y-4">
             {events.map((event) => (
                <div key={event.id} className="group bg-slate-900/50 border border-white/5 p-6 rounded-[2rem] flex flex-col md:flex-row justify-between items-center hover:bg-slate-900 transition-all">
                   <div className="flex items-center mb-4 md:mb-0">
                      <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mr-6 font-black text-xl italic text-slate-600 group-hover:text-purple-400 group-hover:bg-purple-500/10 transition-all">
                         {event.name.charAt(0)}
                      </div>
                      <div>
                         <h4 className="text-lg font-black uppercase tracking-tight group-hover:text-purple-400 transition-colors">{event.name}</h4>
                         <p className="text-xs text-slate-500 font-medium uppercase mt-1 italic">{new Date(event.date).toLocaleDateString()} @ {event.venue?.name || "Global Arena"}</p>
                      </div>
                   </div>
                   <div className="flex space-x-3 w-full md:w-auto">
                      <Link to="/admin/create-seats" className="flex-1 md:flex-none">
                         <button className="w-full bg-slate-800 text-slate-400 px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border border-white/5 hover:bg-slate-750">Seat_Config</button>
                      </Link>
                      <button 
                        onClick={() => deleteEvent(event.id)}
                        className="flex-1 md:flex-none bg-red-500/10 text-red-500 px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border border-red-500/20 hover:bg-red-600 hover:text-white transition-all"
                      >
                        Eliminate
                      </button>
                   </div>
                </div>
             ))}
          </div>
        </section>
      ) : (
        <section className="space-y-12">
           <div className="bg-slate-900/50 border border-white/5 p-12 rounded-[2.5rem] backdrop-blur-xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-10 italic">INITIALIZE_SITE / NEW_VENUE</h3>
              <form onSubmit={createVenue} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <input 
                    className="bg-slate-950 border border-white/5 rounded-2xl px-6 py-5 outline-none focus:border-purple-500/50 transition-all font-bold text-sm placeholder:text-slate-800"
                    placeholder="VENUE_NAME (E.G. TITAN_ARENA)"
                    value={vName}
                    onChange={(e) => setVName(e.target.value)}
                    required
                 />
                 <input 
                    className="bg-slate-950 border border-white/5 rounded-2xl px-6 py-5 outline-none focus:border-purple-500/50 transition-all font-bold text-sm placeholder:text-slate-800"
                    placeholder="LOCATION (E.G. SECTOR_7_HUB)"
                    value={vLocation}
                    onChange={(e) => setVLocation(e.target.value)}
                    required
                 />
                 <button className="bg-purple-600 text-white font-black rounded-2xl hover:bg-purple-500 transition-all shadow-xl shadow-purple-500/20 uppercase text-[10px] tracking-[0.2em]">Deploy_Venue</button>
              </form>
           </div>

           <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 px-2 italic">VENUE_DATABASE / ACTIVE_SITES</h3>
              {venues.map((venue) => (
                 <div key={venue.id} className="bg-slate-900/50 border border-white/5 p-6 rounded-3xl flex justify-between items-center group">
                    <div className="flex items-center">
                       <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mr-6 border border-white/5 group-hover:bg-blue-600/10 transition-all">
                          <svg className="w-5 h-5 text-slate-600 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                       </div>
                       <div>
                          <h4 className="font-black uppercase tracking-tight group-hover:text-blue-400 transition-colors">{venue.name}</h4>
                          <p className="text-[10px] text-slate-500 font-medium uppercase mt-0.5 tracking-widest">{venue.location}</p>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </section>
      )}
    </div>
  );
}