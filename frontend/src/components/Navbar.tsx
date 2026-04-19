import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-12 py-5 flex justify-between items-center transition-all duration-500 ${isScrolled ? "bg-cinematic-black shadow-2xl py-3" : "bg-gradient-to-b from-black/80 to-transparent py-6"}`}>
      <div className="flex items-center space-x-12">
        <Link to="/" className="text-3xl font-black tracking-tighter text-netflix-red hover:scale-105 transition-transform">
          EVENTSPHERE
        </Link>

        <div className="hidden md:flex items-center space-x-6 text-[11px] font-black uppercase tracking-[0.2em]">
          <Link to="/" className="text-white hover:text-white/70 transition-colors">Home</Link>
          <Link to="/" className="text-white/60 hover:text-white transition-colors">Trending</Link>
          <Link to="/" className="text-white/60 hover:text-white transition-colors">Nearby</Link>
          {role === "USER" && (
            <Link to="/my-tickets" className="text-prime-blue hover:text-white transition-colors">My Collection</Link>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {role === "ADMIN" && (
          <Link to="/admin" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Command Center</Link>
        )}

        {role ? (
          <button 
            onClick={logout}
            className="text-white/40 hover:text-white transition-colors"
          >
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          </button>
        ) : (
          <Link 
            to="/login"
            className="bg-prime-blue text-white px-8 py-2.5 rounded-md font-black text-[10px] uppercase tracking-widest hover:bg-prime-blue/80 transition-all shadow-xl shadow-prime-blue/20"
          >
            Access Portal
          </Link>
        )}
      </div>
    </nav>
  );
}