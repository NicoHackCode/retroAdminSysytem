import { UserSession } from "../models/User";

export function getCurrentUser(): UserSession | null {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}
