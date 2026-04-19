import { useState } from "react";
import { api } from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      navigate("/");
    } catch (e: any) {
      alert("Login failed: " + (e.response?.data?.error || "Server unreachable"));
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-slate-900/90 border border-white/5 rounded-[2.2rem] p-10 sm:p-12 backdrop-blur-2xl shadow-2xl">
          <header className="mb-10 text-center">
             <div className="w-16 h-16 bg-blue-600 rounded-3xl mx-auto mb-6 flex items-center justify-center rotate-3 group-hover:rotate-6 transition-transform shadow-2xl shadow-blue-500/40">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
             </div>
             <h1 className="text-4xl font-black mb-3 tracking-tighter uppercase italic">Welcome <span className="text-blue-500">Back</span></h1>
             <p className="text-slate-400 text-sm font-medium">Your next experience is just a log in away.</p>
          </header>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Identity / Email</label>
              <input
                type="email"
                className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-5 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-bold placeholder:text-slate-700"
                placeholder="PROTAGONIST@EVENTS.COM"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Access / Password</label>
              <input
                type="password"
                className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-5 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-bold placeholder:text-slate-700"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black font-black py-5 rounded-2xl transition-all shadow-2xl hover:bg-blue-600 hover:text-white transform active:scale-[0.97] uppercase text-[11px] tracking-[0.3em] mt-4"
            >
              Sign In Now
            </button>
          </form>

          <footer className="mt-12 text-center">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
              New Participant?{" "}
              <Link to="/signup" className="text-blue-500 hover:text-blue-400 transition-colors ml-1">Register Entity</Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}