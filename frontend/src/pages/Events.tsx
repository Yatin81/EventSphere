import { useEffect, useState } from "react";
import { api } from "../api/axios";
import Hero from "../components/Hero";
import EventRow from "../components/EventRow";

export default function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/events").then((res) => {
      setEvents(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="h-[80vh] flex items-center justify-center">
       <div className="w-16 h-16 border-4 border-prime-blue border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  // Group events by category
  const categories: Record<string, any[]> = {};
  events.forEach(event => {
    const cat = event.category || "Trending";
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(event);
  });

  const heroEvent = events[0];

  return (
    <div className="-mt-24 space-y-0">
      <Hero event={heroEvent} />
      
      <div className="pb-24 -mt-12 relative z-10">
        {Object.entries(categories).map(([name, catEvents]) => (
          <EventRow key={name} title={name} events={catEvents} />
        ))}
        
        {/* Placeholder row for "Cinematic Feel" if only one category exists */}
        {Object.keys(categories).length === 1 && (
           <EventRow title="Recommended For You" events={events} />
        )}
      </div>
    </div>
  );
}