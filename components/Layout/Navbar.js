import supabase from "../../utils/supabaseClient";

import { useRouter } from "next/router";
import { useAuthContext } from "../../context/auth";
import NavWeb from "./NavWeb";
import NavMobile from "./NavMobile";
import useViewport from "../Hooks/useViewport";
import { useEffect, useState } from "react";

function Navbar() {
  const router = useRouter();
  const { user } = useAuthContext();

  const { width } = useViewport();
  const breakpoint = 620;

  console.log(user);

  return width < breakpoint ? (
    <NavMobile userId={user?.id} />
  ) : (
    <NavWeb userId={user?.id} />
  );
}

export default Navbar;
