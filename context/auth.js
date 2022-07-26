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

    if (user && user.created) {
      router.push("/groups");
    }
  }, [user]);

  let auth = { user, setUser, loading, setLoading };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
