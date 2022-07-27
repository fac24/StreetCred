import supabase from "../../utils/supabaseClient";

import { useRouter } from "next/router";
import { useAuthContext } from "../../context/auth";
import NavWeb from "./NavWeb";
import NavMobile from "./NavMobile";
import useViewport from "../Hooks/useViewport";
import { useEffect, useState } from "react";

function Navbar() {
  const router = useRouter();
  // const { user } = useAuthContext();
  const [user, setUser] = useState("");

  const { width } = useViewport();
  const breakpoint = 620;

  useEffect(() => {
    checkUser();
  }, [user]);

  async function checkUser() {
    const user = await supabase.auth.user();
    if (user) {
      setUser(user.id);
    } else {
      console.log("no user");
    }
  }

  return width < breakpoint ? (
    <NavMobile userId={user} />
  ) : (
    <NavWeb userId={user} />
  );
}

export default Navbar;
