import "../styles/globals.css";

import Layout from "../components/Layout/Layout";
import Navbar from "../components/Layout/Navbar";
import useViewport from "../components/Hooks/useViewport";
import NavWeb from "../components/Layout/NavWeb";
import NavMobile from "../components/Layout/NavMobile";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import supabase from "../utils/supabaseClient";
import { AuthWrapper, useAuthContext } from "../context/auth";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  const [authenticatedState, setAuthenticatedState] =
    useState("not-authenticated");

  const { width } = useViewport();
  const breakpoint = 620;

  const router = useRouter();

  useEffect(() => {
    /* fires when a user signs in or out */
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        if (event === "SIGNED_IN") {
          setAuthenticatedState("authenticated");
        }
        if (event === "SIGNED_OUT") {
          setAuthenticatedState("not-authenticated");
          router.push("/login");
        }
      }
    );

    checkUser();
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  async function checkUser() {
    /* when the component loads, checks user to show or hide Sign In link */
    const user = await supabase.auth.user();
    if (user) {
      setUser(user);
      setAuthenticatedState("authenticated");
    }
  }

  async function handleAuthChange(event, session) {
    /* sets and removes the Supabase cookie */
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  }

  return (
    <AuthWrapper>
      <Layout>
        <Navbar user={user}>
          <Link href="/protected">
            <a>Protected</a>
          </Link>
        </Navbar>
        <Component {...pageProps} />
      </Layout>
    </AuthWrapper>
  );
}

export default MyApp;
