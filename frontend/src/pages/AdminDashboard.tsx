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

        const totalRevenue = res.data.reduce(
          (acc: number, e: any) =>
            acc +
            (e.bookings?.reduce(
              (a: number, b: any) => a + b.totalAmount,
              0
            ) || 0),
          0
        );

        setAnalytics({ revenue: totalRevenue, occupancy: 75 });
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

  // ✅ FIX: use loading state properly
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white font-black">
        Loading Admin Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      <header className="bg-slate-900/50 border border-white/5 p-12 rounded-[3rem] backdrop-blur-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-5xl font-black tracking-tighter uppercase italic">
              COMMAND <span className="text-purple-500">CENTER</span>
            </h1>
            <p className="text-slate-400 mt-2 font-medium tracking-wide">
              Elite Administrative Infrastructure for EventSphere.
            </p>
          </div>

          <div className="flex bg-slate-950/50 p-2 rounded-2xl border border-white/5">
            <button
              onClick={() => setActiveTab("events")}
              className={`px-8 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all ${
                activeTab === "events"
                  ? "bg-purple-600 text-white"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              Events
            </button>

            <button
              onClick={() => setActiveTab("venues")}
              className={`px-8 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all ${
                activeTab === "venues"
                  ? "bg-purple-600 text-white"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              Venues
            </button>
          </div>
        </div>
      </header>

      {/* Analytics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/30 p-8 rounded-[2rem]">
          <p className="text-xs text-slate-500">Revenue</p>
          <p className="text-3xl font-bold">${analytics.revenue}</p>
        </div>

        <div className="bg-slate-900/30 p-8 rounded-[2rem]">
          <p className="text-xs text-slate-500">Occupancy</p>
          <p className="text-3xl font-bold">{analytics.occupancy}%</p>
        </div>

        <div className="bg-slate-900/30 p-8 rounded-[2rem]">
          <p className="text-xs text-slate-500">System</p>
          <p className="text-3xl font-bold text-green-400">Healthy</p>
        </div>
      </section>

      {activeTab === "events" ? (
        <section>
          <div className="flex justify-between mb-6">
            <h3 className="font-bold">Events</h3>
            <Link to="/admin/create-event">
              <button className="bg-white text-black px-4 py-2 rounded">
                Create Event
              </button>
            </Link>
          </div>

          {events.map((event) => (
            <div
              key={event.id}
              className="bg-slate-900 p-4 rounded mb-3 flex justify-between"
            >
              <div>
                <p className="font-bold">{event.name}</p>
                <p className="text-sm text-slate-400">
                  {new Date(event.date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2">
                <Link to="/admin/create-seats">
                  <button className="bg-slate-700 px-3 py-1 rounded text-sm">
                    Seats
                  </button>
                </Link>

                <button
                  onClick={() => deleteEvent(event.id)}
                  className="bg-red-500 px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section>
          <form onSubmit={createVenue} className="flex gap-4 mb-6">
            <input
              placeholder="Venue Name"
              value={vName}
              onChange={(e) => setVName(e.target.value)}
              className="p-2 rounded bg-slate-800"
            />

            <input
              placeholder="Location"
              value={vLocation}
              onChange={(e) => setVLocation(e.target.value)}
              className="p-2 rounded bg-slate-800"
            />

            <button className="bg-purple-600 px-4 py-2 rounded">
              Add Venue
            </button>
          </form>

          {venues.map((venue) => (
            <div key={venue.id} className="bg-slate-900 p-4 rounded mb-3">
              <p className="font-bold">{venue.name}</p>
              <p className="text-sm text-slate-400">{venue.location}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}