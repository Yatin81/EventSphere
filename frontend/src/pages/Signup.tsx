import { useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const navigate = useNavigate();

  const signup = async () => {
    await api.post("/auth/signup", { email, password, role });
    navigate("/login");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-6 text-white rounded">
        <input
          placeholder="Email"
          className="block mb-3 p-2 text-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          className="block mb-3 p-2 text-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="mb-3 text-black"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button
          onClick={signup}
          className="bg-green-500 px-4 py-2"
        >
          Signup
        </button>
      </div>
    </div>
  );
}