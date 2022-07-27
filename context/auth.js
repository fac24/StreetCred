import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../utils/supabaseClient";

const AuthContext = createContext();

export function AuthWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  async function fetchUser(userId) {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", userId);

    setUser(data[0]);
    setLoading(false);
  }

  useEffect(() => {
    // Check active sessions and sets the user
    const user = supabase.auth.user();
    const session = supabase.auth.session();

    if (session) {
      fetchUser(user.id);
    }

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session && session.user) {
          fetchUser(session.user.id);
        }
        if (event === "SIGNED_OUT") {
          setUser(null);
          router.push("/login");
        }
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user && !user.created) {
      router.push("/create-profile");
    }
  }, [user]);

  async function handleAuthChange(event, session) {
    /* sets and removes the Supabase cookie */
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  }

  let auth = { user, loading };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
