import supabase from "../../utils/supabaseClient";

import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import NavWeb from "./NavWeb";
import NavMobile from "./NavMobile";
import useViewport from "../Hooks/useViewport";
import Link from "next/link";

function Navbar(props) {
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
