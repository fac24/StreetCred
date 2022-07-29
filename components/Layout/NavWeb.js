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
        <Link href="/">
          <Image
            src={logo}
            alt="StreetCred logo"
            layout="intrinsic"
            className="logo"
          />
        </Link>
      </div>
      <nav className="navigation-web">
        {props.user && (
          <>
            <Link href="/groups">
              <a className="menu-item" id="groups">
                Groups
              </a>
            </Link>

            <Link href="/messages">
              <a className="menu-item" id="messages">
                Messages
              </a>
            </Link>

            <Link href={`/profiles/${props.user}`}>
              <a className="menu-item" id="profile">
                Profile
              </a>
            </Link>
          </>
        )}
      </nav>
      {props.user && (
        <button onClick={handleLogOut} className="web-login-button" id="logout">
          Log Out
        </button>
      )}
    </header>
  );
}

export default NavWeb;
