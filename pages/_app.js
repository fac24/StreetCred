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
