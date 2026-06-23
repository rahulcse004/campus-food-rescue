import { api } from "./api";
import type { PickupRequest, RequestPayload } from "../types";

export const requestService = {
  create: async (payload: RequestPayload): Promise<PickupRequest> => {
    const res = await api.post<PickupRequest>("/requests", payload);
    return res.data;
  },

  getByReceiver: async (receiverId: number): Promise<PickupRequest[]> => {
    const res = await api.get<PickupRequest[]>(`/requests/receiver/${receiverId}`);
    return res.data;
  },

  getAll: async (): Promise<PickupRequest[]> => {
    const res = await api.get<PickupRequest[]>("/requests");
    return res.data;
  },
};
