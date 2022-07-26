import "../styles/Home.module.css";
import LandingWeb from "../components/About/LandingWeb";
import LandingMobile from "../components/About/LandingMobile";
import useViewport from "../components/Hooks/useViewport";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import supabase from "../utils/supabaseClient";
import { useAuthContext } from "../context/auth";

function Home() {
  const { width } = useViewport();
  const auth = useAuthContext();
  const breakpoint = 620;

  return width < breakpoint ? <LandingMobile /> : <LandingWeb />;
}

export default Home;
