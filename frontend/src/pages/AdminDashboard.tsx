import { useEffect, useState } from "react";
import { userService } from "../services/userService";
import { donationService } from "../services/donationService";
import { getErrorMessage } from "../services/api";
import type { User, Donation } from "../types";

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"users" | "donations">("donations");

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [u, d] = await Promise.all([userService.getAll(), donationService.getAll()]);
      setUsers(u);
      setDonations(d);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleDeleteDonation = async (id: number) => {
    if (!confirm("Delete this donation?")) return;
    try { await donationService.remove(id); await loadData(); }
    catch (err) { setError(getErrorMessage(err)); }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm("Delete this user?")) return;
    try { await userService.remove(id); await loadData(); }
    catch (err) { setError(getErrorMessage(err)); }
  };

  const available = donations.filter(d => d.status === "AVAILABLE").length;
  const requested = donations.filter(d => d.status === "REQUESTED").length;

  return (
    <div className="page admin-bg">
      <div className="page-header"><h2>Admin Panel</h2></div>

      <div className="stats-bar">
        <div className="stat-card"><div className="stat-number">{users.length}</div><div className="stat-label">Total Users</div></div>
        <div className="stat-card"><div className="stat-number">{donations.length}</div><div className="stat-label">Total Donations</div></div>
        <div className="stat-card"><div className="stat-number">{available}</div><div className="stat-label">Available</div></div>
        <div className="stat-card"><div className="stat-number">{requested}</div><div className="stat-label">Requested</div></div>
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="tabs">
        <button className={tab === "donations" ? "tab active" : "tab"} onClick={() => setTab("donations")}>Donations ({donations.length})</button>
        <button className={tab === "users" ? "tab active" : "tab"} onClick={() => setTab("users")}>Users ({users.length})</button>
      </div>

      {loading ? <p>Loading...</p> : tab === "donations" ? (
        <table className="admin-table">
          <thead><tr><th>ID</th><th>Food Name</th><th>Quantity</th><th>Location</th><th>Status</th><th>Donor ID</th><th></th></tr></thead>
          <tbody>
            {donations.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td><td>{d.foodName}</td><td>{d.quantity}</td><td>{d.location}</td>
                <td><span className={`status-badge status-${d.status.toLowerCase()}`}>{d.status}</span></td>
                <td>{d.userId}</td>
                <td><button onClick={() => handleDeleteDonation(d.id)} className="btn-danger btn-sm">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="admin-table">
          <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th></th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td>
                <td><button onClick={() => handleDeleteUser(u.id)} className="btn-danger btn-sm">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}