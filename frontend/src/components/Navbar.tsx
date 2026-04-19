import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-black text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">EventSphere</h1>

      <div className="space-x-4">
        <Link to="/">Events</Link>

        {role === "ADMIN" && <Link to="/admin">Admin</Link>}

        {role ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
}