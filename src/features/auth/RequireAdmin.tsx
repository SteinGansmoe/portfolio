import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUser, isAdmin } from "./auth";

type Status = "loading" | "authed_admin" | "authed_not_admin" | "not_logged_in" | "error";

export function RequireAdmin() {
  const location = useLocation();
  const [status, setStatus] = useState<Status>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function run() {
      try {
        const user = await getUser();

        if (!user) {
          if (!isMounted) return;
          setStatus("not_logged_in");
          return;
        }

        const ok = await isAdmin(user.id);

        if (!isMounted) return;
        setStatus(ok ? "authed_admin" : "authed_not_admin");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        if (!isMounted) return;
        setErrorMessage(message);
        setStatus("error");
      }
    }

    run();
    return () => {
      isMounted = false;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="rounded-2xl border border-slate-800/70 bg-slate-900/30 p-4 text-slate-300">
        Sjekker tilgang…
      </div>
    );
  }

  if (status === "not_logged_in") {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (status === "authed_not_admin") {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
        Du er innlogget, men har ikke admin-tilgang.
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
        Klarte ikke å sjekke admin-tilgang: <span className="text-red-100">{errorMessage}</span>
      </div>
    );
  }

  return <Outlet />;
}
