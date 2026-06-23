import { api } from "./api";
import type { LoginPayload, RegisterPayload, User } from "../types";

export const authService = {
  register: async (payload: RegisterPayload): Promise<User> => {
    const res = await api.post<User>("/users/register", payload);
    return res.data;
  },

  login: async (payload: LoginPayload): Promise<User> => {
    const res = await api.post<User>("/users/login", payload);
    return res.data;
  },
};
