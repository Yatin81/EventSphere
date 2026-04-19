import { useState } from "react";
import { api } from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/signup", { email, password, role });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      navigate("/");
      window.location.reload(); // Refresh to update Navbar state
    } catch (e: any) {
      alert("Signup failed: " + (e.response?.data?.error || "Server unreachable"));
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-slate-900/90 border border-white/5 rounded-[2.2rem] p-10 sm:p-12 backdrop-blur-2xl shadow-2xl">
          <header className="mb-10 text-center">
             <div className="w-16 h-16 bg-purple-600 rounded-3xl mx-auto mb-6 flex items-center justify-center -rotate-3 group-hover:-rotate-6 transition-transform shadow-2xl shadow-purple-500/40">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
             </div>
             <h1 className="text-4xl font-black mb-3 tracking-tighter uppercase italic">Create <span className="text-purple-500">Account</span></h1>
             <p className="text-slate-400 text-sm font-medium">Join the elite network of event enthusiasts.</p>
          </header>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Identity / Email</label>
              <input
                type="email"
                className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-5 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/5 transition-all text-sm font-bold placeholder:text-slate-700"
                placeholder="NEW_USER@EVENTS.COM"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Role / Designation</label>
              <select
                className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-5 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/5 transition-all text-sm font-bold appearance-none cursor-pointer"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="USER" className="bg-slate-900">STANDARD USER</option>
                <option value="ADMIN" className="bg-slate-900">ADMINISTRATOR</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Access / Password</label>
              <input
                type="password"
                className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-5 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/5 transition-all text-sm font-bold placeholder:text-slate-700"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black font-black py-5 rounded-2xl transition-all shadow-2xl hover:bg-purple-600 hover:text-white transform active:scale-[0.97] uppercase text-[11px] tracking-[0.3em] mt-4"
            >
              Initialize Profile
            </button>
          </form>

          <footer className="mt-12 text-center">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
              Existing Member?{" "}
              <Link to="/login" className="text-purple-500 hover:text-purple-400 transition-colors ml-1">Access Vault</Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}