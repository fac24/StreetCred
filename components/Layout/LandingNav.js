import Link from "next/link";
import Image from "next/image";
import logo from "../../public/full-logo.svg";

function LandingNav() {
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
      <nav>
        <Link href="/login">
          <a className="web-login-button">Log in or sign up</a>
        </Link>
      </nav>
    </header>
  );
}

export default LandingNav;
