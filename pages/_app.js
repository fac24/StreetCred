import "../styles/globals.css";

import Layout from "../components/Layout/Layout";
import Navbar from "../components/Layout/Navbar";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import supabase from "../utils/supabaseClient";
import { AuthWrapper, useAuthContext } from "../context/auth";

function MyApp({ Component, pageProps }) {
  return (
    <AuthWrapper>
      <Layout>
        <Navbar />
        <Component {...pageProps} />
      </Layout>
    </AuthWrapper>
  );
}

export default MyApp;
