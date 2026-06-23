import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import type { Role } from "../types";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRole: Role;
}

// Redirects to /login if not logged in, or home if logged in with the wrong role.
export default function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
///// this is bacically says who is allowed to acces the allowed page .