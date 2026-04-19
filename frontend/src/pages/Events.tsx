import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { Link } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    api.get("/events").then((res) => setEvents(res.data));
  }, []);

  return (
    <div className="p-6">
      {events.map((event) => (
        <div key={event.id} className="bg-gray-800 text-white p-4 mb-3">
          <h2>{event.name}</h2>

          <Link to={`/booking/${event.id}`}>
            <button className="bg-green-500 px-3 py-1 mt-2">
              Book
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}