import type { Donation } from "../types";

interface DonationCardProps {
  donation: Donation;
  children?: React.ReactNode; 
}

export default function DonationCard({ donation, children }: DonationCardProps) {
  const expiry = new Date(donation.expiryTime);

  return (
    <div className="card">
      <div className="card-header">
        <h3>{donation.foodName}</h3>
        <span className={`status-badge status-${donation.status.toLowerCase()}`}>
          {donation.status}
        </span>
      </div>
      <p><strong>Quantity:</strong> {donation.quantity}</p>
      {donation.description && <p><strong>Description:</strong> {donation.description}</p>}
      <p><strong>Pickup Location:</strong> {donation.location}</p>
      <p><strong>Expires:</strong> {expiry.toLocaleString()}</p>

      {children && <div className="card-actions">{children}</div>}
    </div>
  );
}
