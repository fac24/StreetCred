import supabase from "../../utils/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/router";

import Image from "next/image";
import logo from "../../public/full-logo.svg";
import { useAuthContext } from "../../context/auth";

function Navbar() {
  const router = useRouter();
  const { user } = useAuthContext();

  async function handleLogOut() {
    const { error } = await supabase.auth.signOut();
    router.push("/login");
  }

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
