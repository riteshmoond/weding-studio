import { useEffect, useState } from "react";
import { api, clearSession, getCurrentUser, getToken, subscribeToSession } from "../lib/api";
import { AuthContext } from "./auth-context";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(getCurrentUser);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      const token = getToken();
      if (!token) {
        if (active) {
          setUser(null);
          setReady(true);
        }
        return;
      }

      try {
        const result = await api("/auth/me");
        if (active) {
          localStorage.setItem("royalStudioUser", JSON.stringify(result.user));
          setUser(result.user);
        }
      } catch (error) {
        if (error.status === 401) clearSession();
        if (active) setUser(getCurrentUser());
      } finally {
        if (active) setReady(true);
      }
    }

    restoreSession();
    const unsubscribe = subscribeToSession(() => {
      if (active) setUser(getCurrentUser());
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ user, ready }}>{children}</AuthContext.Provider>;
}
