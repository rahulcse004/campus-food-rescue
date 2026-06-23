import { api } from "./api";
import type { Donation, DonationPayload } from "../types";

export const donationService = {
  create: async (payload: DonationPayload): Promise<Donation> => {
    const res = await api.post<Donation>("/donations", payload);
    return res.data;
  },

  update: async (id: number, payload: DonationPayload): Promise<Donation> => {
    const res = await api.put<Donation>(`/donations/${id}`, payload);
    return res.data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/donations/${id}`);
  },

  getByUser: async (userId: number): Promise<Donation[]> => {
    const res = await api.get<Donation[]>(`/donations/user/${userId}`);
    return res.data;
  },

  getAvailable: async (): Promise<Donation[]> => {
    const res = await api.get<Donation[]>("/donations/available");
    return res.data;
  },

  getAll: async (): Promise<Donation[]> => {
    const res = await api.get<Donation[]>("/donations");
    return res.data;
  },
};
