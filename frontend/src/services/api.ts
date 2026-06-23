import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (data?.message) return data.message;
    if (data && typeof data === "object") {
      const firstFieldError = Object.values(data)[0];
      if (typeof firstFieldError === "string") return firstFieldError;
    }
    if (error.message) return error.message;
  }
  return "Something went wrong. Please try again.";
}
