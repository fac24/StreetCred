import "../styles/globals.css";

import Layout from "../components/Layout/Layout";
import Navbar from "../components/Layout/Navbar";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import supabase from "../utils/supabaseClient";
import { AuthWrapper } from "../context/auth";

const LOGIN_SUCCESS_ROUTE = "/login-success";

const useAuthWatch = () => {
  const router = useRouter();
  const [authenticatedState, setAuthenticatedState] =
    useState("not-authenticated");
  const isLoginSuccessRoute = router.pathname === LOGIN_SUCCESS_ROUTE;

  const onAuthenticated = () => {
    setAuthenticatedState("authenticated");
    if (isLoginSuccessRoute) {
      router.push(router.query.redirectTo ?? "/groups");
    }
  };
  const session = supabase.auth.session();

  useEffect(() => {
    /* fires when a user signs in or out */
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        await handleAuthChange(event, session);
        if (event === "SIGNED_IN") {
          onAuthenticated();
        }
        if (event === "SIGNED_OUT") {
          setAuthenticatedState("not-authenticated");
          router.push("/login");
        }
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, [isLoginSuccessRoute]);

  const syncExistingSession = async () => {
    if (session) {
      await handleAuthChange("SIGNED_IN", session);
      onAuthenticated();
    }
  };

  useEffect(() => {
    syncExistingSession();
  }, [session, isLoginSuccessRoute]);

  async function handleAuthChange(event, session) {
    /* sets and removes the Supabase cookie */
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  }

  return authenticatedState === "authenticated";
};

function MyApp({ Component, pageProps }) {
  const authenticated = useAuthWatch();

  return (
    <AuthWrapper user={pageProps?.user ?? null} authenticated={authenticated}>
      <Layout>
        <Navbar>
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
