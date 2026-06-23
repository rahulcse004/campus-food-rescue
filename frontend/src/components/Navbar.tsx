import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Campus Food Rescue
      </Link>

      <div className="navbar-links">
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && user.role === "DONOR" && <Link to="/donor">My Donations</Link>}
        {user && user.role === "RECEIVER" && <Link to="/receiver">Available Food</Link>}
        {user && user.role === "ADMIN" && <Link to="/admin">Admin Panel</Link>}

        {user && (
          <>
            <span className="navbar-user">
              {user.name} ({user.role})
            </span>
            <button onClick={handleLogout} className="btn-link">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
