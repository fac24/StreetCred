import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../utils/supabaseClient";

const AuthContext = createContext();

export const getUser = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", userId);

  return data?.[0] ?? null;
};

export function AuthWrapper({ children, user: initialUser, authenticated }) {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  async function fetchUser(userId) {
    setUser(await getUser(userId));
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

  const auth = { user, loading, authenticated };

  const canShowUserProtectedContent = true;

  return canShowUserProtectedContent ? (
    <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
  ) : null;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
