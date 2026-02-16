import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "./useAuth";

type Props = {
  children: ReactNode;
};

export function RequireGuest({ children }: Props) {
  const auth = useAuth();

  if (auth.status === "loading") {
    return null; // or spinner
  }

  if (auth.status === "guest") {
    return <>{children}</>;
  }

  return <Navigate to="/" replace />;
}
