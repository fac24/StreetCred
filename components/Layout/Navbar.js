import supabase from "../../utils/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthContext } from "../../context/auth";

import Image from "next/image";
import logo from "../../public/full-logo.svg";

function Navbar() {
  const router = useRouter();
  const { user } = useAuthContext();

  async function handleLogOut() {
    const { error } = await supabase.auth.signOut();
  }
  // Hide navbar when no user is authenticated
  if (!user) {
    return null;
  }

  return (
    <header className="header">
      <div className="logo-div">
        <Image
          src={logo}
          alt="StreetCred logo"
          layout="intrinsic"
          className="logo"
        />
      </div>
      <nav>
        <Link href="/groups">
          <a className="menu-item">Groups</a>
        </Link>
      </nav>
      <button onClick={handleLogOut} className="web-login-button">
        Log Out
      </button>
    </header>
  );
}

export default Navbar;
