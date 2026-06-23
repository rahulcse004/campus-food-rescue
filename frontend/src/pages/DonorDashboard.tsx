import { useEffect, useState } from "react";
import { useAuth } from "../services/AuthContext";
import { donationService } from "../services/donationService";
import { getErrorMessage } from "../services/api";
import DonationCard from "../components/DonationCard";
import DonationForm from "../components/DonationForm";
import type { Donation, DonationPayload } from "../types";

export default function DonorDashboard() {
  const { user } = useAuth();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingDonation, setEditingDonation] = useState<Donation | null>(null);

  const loadDonations = async () => {
    if (!user) return;
    setLoading(true);
    setError("");
    try {
      const data = await donationService.getByUser(user.id);
      setDonations(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDonations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleCreate = async (payload: DonationPayload) => {
    await donationService.create(payload);
    setShowForm(false);
    await loadDonations();
  };

  const handleUpdate = async (payload: DonationPayload) => {
    if (!editingDonation) return;
    await donationService.update(editingDonation.id, payload);
    setEditingDonation(null);
    await loadDonations();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this donation?")) return;
    try {
      await donationService.remove(id);
      await loadDonations();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (!user) return null;

  return (
    <div className="page donor-bg">
      <div className="page-header">
        <h2>My Donations</h2>
        {!showForm && !editingDonation && (
          <button onClick={() => setShowForm(true)}>+ Add Donation</button>
        )}
      </div>

      {error && <p className="error-text">{error}</p>}

      {showForm && (
        <div className="form-panel">
          <h3>New Donation</h3>
          <DonationForm
            userId={user.id}
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {editingDonation && (
        <div className="form-panel">
          <h3>Edit Donation</h3>
          <DonationForm
            userId={user.id}
            initialData={editingDonation}
            onSubmit={handleUpdate}
            onCancel={() => setEditingDonation(null)}
          />
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : donations.length === 0 ? (
        <p>You haven't added any donations yet.</p>
      ) : (
        <div className="card-grid">
          {donations.map((donation) => (
            <DonationCard key={donation.id} donation={donation}>
              <button onClick={() => setEditingDonation(donation)}>Edit</button>
              <button onClick={() => handleDelete(donation.id)} className="btn-danger">
                Delete
              </button>
            </DonationCard>
          ))}
        </div>
      )}
    </div>
  );
}