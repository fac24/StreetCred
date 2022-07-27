import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import supabase from "../../utils/supabaseClient";
import { useAuthContext } from "../../context/auth";
import NavWeb from "./NavWeb";
import NavMobile from "./NavMobile";
import LandingNav from "./LandingNav";
import useViewport from "../Hooks/useViewport";

function Navbar() {
  const router = useRouter();
  const { user } = useAuthContext();

  const { width } = useViewport();
  const breakpoint = 620;

  if (!user) {
    return <LandingNav />;
  }

  return width < breakpoint ? (
    <NavMobile userId={user?.id} />
  ) : (
    <NavWeb userId={user?.id} />
  );
}

export default Navbar;
