import { useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await api.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.user.role);

    navigate("/");
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
        <button
          onClick={login}
          className="bg-blue-500 px-4 py-2"
        >
          Login
        </button>
      </div>
    </div>
  );
}