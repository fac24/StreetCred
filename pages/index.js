import "../styles/Home.module.css";
import LandingWeb from "../components/About/LandingWeb";
import LandingMobile from "../components/About/LandingMobile";
import useViewport from "../components/Hooks/useViewport";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import supabase from "../utils/supabaseClient";
import { useAuthContext } from "../context/auth";

function Home() {
  const auth = useAuthContext();
  const { width } = useViewport();
  const breakpoint = 620;
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

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
    if (user) {
      router.push("/create-profile");
      if (user.location && user.user_bio && user.name && user.avatar_url) {
        router.push("/groups");
      }
    }
  }, [user]);

  return width < breakpoint ? <LandingMobile /> : <LandingWeb />;
}

export default Home;
