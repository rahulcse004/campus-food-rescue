import { useEffect, useState } from "react";
import { useAuth } from "../services/AuthContext";
import { donationService } from "../services/donationService";
import { requestService } from "../services/requestService";
import { getErrorMessage } from "../services/api";
import DonationCard from "../components/DonationCard";
import type { Donation } from "../types";

export default function ReceiverDashboard() {
  const { user } = useAuth();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [requestedIds, setRequestedIds] = useState<Set<number>>(new Set());

  const loadDonations = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await donationService.getAvailable();
      setDonations(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDonations();
  }, []);

  const handleRequestPickup = async (donationId: number) => {
    if (!user) return;
    setError("");
    try {
      await requestService.create({ donationId, receiverId: user.id });
      setRequestedIds((prev) => new Set(prev).add(donationId));
      await loadDonations(); // refresh since donation status changes to REQUESTED
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (!user) return null;

  return (
    <div className="page receiver-bg">
      <h2>Available Donations</h2>

      {error && <p className="error-text">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : donations.length === 0 ? (
        <p>No donations available right now. Check back later!</p>
      ) : (
        <div className="card-grid">
          {donations.map((donation) => (
            <DonationCard key={donation.id} donation={donation}>
              <button
                onClick={() => handleRequestPickup(donation.id)}
                disabled={requestedIds.has(donation.id)}
              >
                {requestedIds.has(donation.id) ? "Requested" : "Request Pickup"}
              </button>
            </DonationCard>
          ))}
        </div>
      )}
    </div>
  );
}