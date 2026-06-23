// Mirrors backend enums/entities exactly

export type Role = "DONOR" | "RECEIVER" | "ADMIN";

export type DonationStatus = "AVAILABLE" | "REQUESTED" | "COMPLETED" | "EXPIRED";

export type RequestStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface Donation {
  id: number;
  foodName: string;
  quantity: string;
  description: string;
  location: string;
  expiryTime: string; // ISO date string
  status: DonationStatus;
  userId: number;
}

export interface DonationPayload {
  foodName: string;
  quantity: string;
  description: string;
  location: string;
  expiryTime: string; // ISO date string
  userId: number;
}

export interface PickupRequest {
  id: number;
  donationId: number;
  receiverId: number;
  status: RequestStatus;
}

export interface RequestPayload {
  donationId: number;
  receiverId: number;
}
