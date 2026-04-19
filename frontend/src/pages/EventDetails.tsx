import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/axios";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    api.get(`/events/${id}`).then((res) => setEvent(res.data));
  }, [id]);

  if (!event) return (
    <div className="h-[80vh] flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-prime-blue border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="-mt-24 min-h-screen">
      {/* Cinematic Header */}
      <div className="relative h-[65vh] w-full overflow-hidden">
        <img 
          src={event.imageUrl || `https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2070`} 
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cinematic-black via-cinematic-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cinematic-black/80 via-transparent to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-12 md:p-20 w-full md:w-3/4 space-y-6">
           <div className="flex items-center space-x-4">
              <span className="bg-netflix-red text-white text-[10px] font-black px-3 py-1 rounded-sm tracking-widest uppercase">Official Selection</span>
              <span className="text-prime-blue text-xs font-black uppercase tracking-[0.2em]">{event.category}</span>
           </div>
           <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic text-white drop-shadow-2xl">
             {event.name}
           </h1>
           <div className="flex items-center space-x-6 text-white/60 font-bold uppercase text-[10px] tracking-widest">
              <span>{new Date(event.date).getFullYear()}</span>
              <span className="border border-white/20 px-2 rounded">4K ULTRA HD</span>
              <span>{event.venue?.name}</span>
           </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-7xl mx-auto px-12 py-12 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
           <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 italic">PROGRAM_SYNOPSIS</h3>
              <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed">
                {event.description || `Prepare for a journey beyond the ordinary. "${event.name}" brings together top-tier performers and cutting-edge production to create a milestone event in the region. Immerse yourself in a world of high-fidelity audio and stunning visual landscapes.`}
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl group hover:bg-white/10 transition-all">
                 <p className="text-[10px] font-black uppercase tracking-widest text-prime-blue mb-4">Event Geometry</p>
                 <div className="space-y-1">
                    <p className="text-xl font-black text-white">{event.venue?.name || "The Void Arena"}</p>
                    <p className="text-sm font-medium text-white/50">{event.venue?.location || "Sector 7-G"}</p>
                 </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl group hover:bg-white/10 transition-all">
                 <p className="text-[10px] font-black uppercase tracking-widest text-netflix-red mb-4">Transmission Date</p>
                 <div className="space-y-1">
                    <p className="text-xl font-black text-white">{new Date(event.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    <p className="text-sm font-medium text-white/50">{new Date(event.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] h-fit sticky top-32">
           <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mb-8 text-center">ACCESS_RESERVATION</h4>
           <div className="space-y-6">
              <Link to={`/booking/${event.id}`}>
                <button className="w-full bg-prime-blue hover:bg-white hover:text-black text-white font-black py-6 rounded-2xl transition-all duration-300 uppercase text-xs tracking-[0.2em] shadow-2xl shadow-prime-blue/20 transform active:scale-[0.98]">
                  SELECT SEATS
                </button>
              </Link>
              <button className="w-full bg-white/10 hover:bg-white/5 text-white font-black py-4 rounded-xl transition-all uppercase text-[10px] tracking-widest">
                 ADD TO MY LIST
              </button>
           </div>
           <p className="text-center text-[9px] font-bold text-white/20 uppercase mt-8 tracking-widest leading-relaxed">
              * Verification Required Upon Entry<br/>
              * Digital Assets Only
           </p>
        </div>
      </div>
    </div>
  );
}