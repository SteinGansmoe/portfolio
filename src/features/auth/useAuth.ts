import { useEffect, useState } from "react";
import { getUser, isAdmin } from "./auth";

type AuthState =
  | { status: "loading" }
  | { status: "guest" }
  | { status: "user"; userId: string }
  | { status: "admin"; userId: string };

export function useAuth() {
  const [state, setState] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    let isMounted = true;

    async function run() {
      try {
        const user = await getUser();

        if (!user) {
          if (!isMounted) return;
          setState({ status: "guest" });
          return;
        }

        const ok = await isAdmin(user.id);
        if (!isMounted) return;

        setState(ok ? { status: "admin", userId: user.id } : { status: "user", userId: user.id });
      } catch {
        if (!isMounted) return;
        setState({ status: "guest" });
      }
    }

    run();

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}
