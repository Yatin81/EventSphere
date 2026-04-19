import { useRef } from "react";
import EventCard from "./EventCard";

interface EventRowProps {
  title: string;
  events: any[];
}

export default function EventRow({ title, events }: EventRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (events.length === 0) return null;

  return (
    <div className="space-y-4 py-8">
      <h3 className="px-8 text-xl font-black uppercase tracking-widest text-white/40 italic">
        {title} <span className="ml-2 h-1 w-12 bg-prime-blue inline-block mb-1"></span>
      </h3>
      
      <div className="group relative">
        <button 
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 z-20 w-12 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
        >
          <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
        </button>
        
        <div 
          ref={rowRef}
          className="flex space-x-6 overflow-x-auto overflow-y-visible py-4 no-scrollbar px-8"
        >
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <button 
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 z-20 w-12 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
        >
          <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  );
}
