import { useState } from "react";
import type { FormEvent } from "react";
import type { Donation, DonationPayload } from "../types";

interface DonationFormProps {
  userId: number;
  initialData?: Donation; 
  onSubmit: (payload: DonationPayload) => Promise<void>;
  onCancel?: () => void;
}

function toDatetimeLocal(isoString: string): string {
  const date = new Date(isoString);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60 * 1000);//user time zone.....
  return local.toISOString().slice(0, 16);
}

export default function DonationForm({ userId, initialData, onSubmit, onCancel }: DonationFormProps) {
  const [foodName, setFoodName] = useState(initialData?.foodName ?? "");
  const [quantity, setQuantity] = useState(initialData?.quantity ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [location, setLocation] = useState(initialData?.location ?? "");
  const [expiryTime, setExpiryTime] = useState(
    initialData ? toDatetimeLocal(initialData.expiryTime) : ""
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await onSubmit({
        foodName,
        quantity,
        description,
        location,
        expiryTime: new Date(expiryTime).toISOString(),
        userId,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save donation");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {error && <p className="error-text">{error}</p>}

      <label>
        Food Name
        <input
          type="text"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          required
        />
      </label>

      <label>
        Quantity
        <input
          type="text"
          placeholder="e.g. 5 boxes, 2 kg"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </label>

      <label>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </label>

      <label>
        Pickup Location
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </label>

      <label>
        Expiry Time
        <input
          type="datetime-local"
          value={expiryTime}
          onChange={(e) => setExpiryTime(e.target.value)}
          required
        />
      </label>

      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : initialData ? "Update Donation" : "Add Donation"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
