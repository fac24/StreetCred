import Image from "next/image";
import Link from "next/link";
import logo from "../public/only-logo.svg";
import logoText from "../public/logo-text.svg";
import { FaFacebook, FaGoogle } from "react-icons/fa";

import supabase from "../utils/supabaseClient.js";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter();
  const { redirectTo } = router.query;

  const createLoginHandler = (provider) => (event) =>
    supabase.auth.signIn(
      {
        provider: provider,
      },
      {
        redirectTo: `${window.location.origin}/login-success?redirectTo=${
          redirectTo || "/groups"
        }`,
      }
    );

  const handleGoogleLogin = createLoginHandler("google");
  const handleFacebookLogin = createLoginHandler("facebook");

  return (
    <div className="login-page">
      <header>
        <Link href="/">
          <div className="login-logo-section">
            <Image
              src={logo}
              alt="StreetCred logo"
              width={130}
              height={130}
              /* layout="intrinsic" */
              className="logo"
            />
            <Image
              src={logoText}
              alt="StreetCred logo"
              width={280}
              height={80}
              className="logo"
            />
          </div>
        </Link>
        <h2 className="login-text">
          <span>Start sharing.</span>
          <span>Start caring.</span>
        </h2>
      </header>
      <section className="login-buttons">
        <button onClick={handleGoogleLogin} className="login-button google">
          <FaGoogle className="social-logo" />
          <span>Continue with Google</span>
        </button>
        <button onClick={handleFacebookLogin} className="login-button facebook">
          <FaFacebook className="social-logo" />
          <span>Continue with Facebook</span>
        </button>
      </section>
    </div>
  );
}

export default Login;
