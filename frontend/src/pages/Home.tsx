import { Link } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="page home-page">
      <h1>Campus Food Rescue</h1>
      <p>Connecting campus food donors with people who need it — reducing waste, one meal at a time.</p>

      {!user && (
        <div className="home-actions">
          <Link to="/login"><button>Login</button></Link>
          <Link to="/register"><button className="btn-secondary">Register</button></Link>
        </div>
      )}
    </div>
  );
}
