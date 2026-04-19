import { Link } from "react-router-dom";

interface HeroProps {
  event: any;
}

export default function Hero({ event }: HeroProps) {
  if (!event) return null;

  return (
    <div className="relative w-full h-[70vh] overflow-hidden rounded-[2.5rem] mb-12 group">
      <div className="absolute inset-0">
        <img 
          src={event.imageUrl || `https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2070`} 
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cinematic-black via-cinematic-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cinematic-black via-transparent to-transparent"></div>
      </div>

      <div className="absolute bottom-0 left-0 p-12 w-full md:w-2/3 space-y-6">
        <div className="flex items-center space-x-4">
           <span className="bg-prime-blue text-white text-[10px] font-black px-3 py-1 rounded tracking-widest uppercase">Premium Insight</span>
           <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest italic">{event.category}</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none drop-shadow-2xl">
          {event.name}
        </h1>
        
        <p className="text-slate-300 text-sm md:text-lg max-w-xl font-medium leading-relaxed line-clamp-3">
          {event.description || "The definitive experience of the season. Join thousands of visionaries for a night of unparalleled spectacle and connection."}
        </p>

        <div className="flex items-center space-x-4 pt-4">
           <Link to={`/events/${event.id}`} className="bg-white text-black font-black px-10 py-5 rounded-xl hover:bg-prime-blue hover:text-white transition-all transform active:scale-95 shadow-2xl flex items-center group/btn">
              <svg className="w-5 h-5 mr-3 fill-current transition-transform group-hover/btn:scale-110" viewBox="0 0 24 24"><path d="M7 6v12l10-6z"/></svg>
              BOOK NOW
           </Link>
           <Link to={`/events/${event.id}`} className="bg-white/10 backdrop-blur-md border border-white/10 text-white font-black px-10 py-5 rounded-xl hover:bg-white/20 transition-all flex items-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              MORE INFO
           </Link>
        </div>
      </div>
    </div>
  );
}
