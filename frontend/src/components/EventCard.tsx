import { Link } from "react-router-dom";

interface EventCardProps {
  event: any;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link to={`/events/${event.id}`} className="block relative flex-shrink-0 w-72 md:w-80 group cursor-pointer transition-all duration-300 first:ml-8 hover:z-10">
      <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_40px_-10px_rgba(0,168,225,0.4)]">
        <img 
          src={event.imageUrl || `https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80&w=1074`} 
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cinematic-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        <div className="absolute bottom-0 left-0 p-4 w-full opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
           <p className="text-[10px] font-black uppercase tracking-widest text-prime-blue mb-1">{event.category}</p>
           <h4 className="text-sm font-black uppercase tracking-tight text-white mb-2">{event.name}</h4>
           <div className="flex items-center space-x-2 text-[9px] font-bold text-white/60">
              <span className="border border-white/20 px-1 rounded">HD</span>
              <span>{new Date(event.date).toLocaleDateString()}</span>
           </div>
        </div>
      </div>
    </Link>
  );
}
