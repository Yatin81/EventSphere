import { Link } from "react-router-dom";

export default function BookingSuccess() {
  return (
    <div className="max-w-2xl mx-auto py-20 text-center">
      <div className="relative group inline-block mb-12">
         <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur opacity-20 group-hover:opacity-40 transition animate-pulse"></div>
         <div className="relative w-32 h-32 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40">
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
         </div>
      </div>

      <h1 className="text-5xl font-black tracking-tighter uppercase italic mb-6">RESERVATION <span className="text-green-500">CONFIRMED</span></h1>
      <p className="text-slate-400 text-lg max-w-md mx-auto mb-12 font-medium">Your credentials have been validated and your seats are now secured. Prepare for the experience.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
         <Link to="/" className="w-full">
            <button className="w-full bg-slate-900 border border-white/5 hover:border-blue-500/50 text-slate-300 font-black py-5 rounded-2xl transition-all uppercase text-[10px] tracking-widest">
              Back to Events
            </button>
         </Link>
         <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-500/20 uppercase text-[10px] tracking-widest">
            Download Ticket
         </button>
      </div>

      <p className="mt-12 text-[10px] font-black text-slate-700 uppercase tracking-[0.5em]">TICKET_ID: ES-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
    </div>
  );
}