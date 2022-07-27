import Image from "next/image";
import logo from "../../public/full-logo.svg";
import Link from "next/link";
import supabase from "../../utils/supabaseClient";
import Router, { useRouter } from "next/router";

function NavWeb(props) {
  const router = useRouter();

  async function handleLogOut() {
    const { error } = await supabase.auth.signOut();
    router.push("/login");
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
      <nav className="navigation-web">
        <Link href="/groups">
          <a className="menu-item">Groups</a>
        </Link>

        <Link href="/messages">
          <a className="menu-item">Messages</a>
        </Link>

        <Link href={`/profiles/${props.user}`}>
          <a className="menu-item">Profile</a>
        </Link>
      </nav>
      <button onClick={handleLogOut} className="web-login-button">
        Log Out
      </button>
    </header>
  );
}

export default NavWeb;
