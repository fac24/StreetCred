import "../styles/globals.css";

import Layout from "../components/Layout/Layout";
import Navbar from "../components/Layout/Navbar";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import supabase from "../utils/supabaseClient";
import { AuthWrapper, useAuthContext } from "../context/auth";

function MyApp({ Component, pageProps }) {
  // const [authenticatedState, setAuthenticatedState] =
  //   useState("not-authenticated");

  // const router = useRouter();

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
