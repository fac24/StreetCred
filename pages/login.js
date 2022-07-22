import Image from "next/image";
import logo from "../public/logo.svg";
import { FaFacebook, FaGoogle } from "react-icons/fa";

import supabase from "../utils/supabaseClient.js";

function Login() {
  async function handleGoogleLogin(event) {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "google",
    });
  }

  async function handleFacebookLogin(event) {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "facebook",
    });
  }

  return (
    <div className="login-page">
      <header>
        <Image
          src={logo}
          alt="StreetCred logo"
          layout="intrinsic"
          className="logo"
        />
        <p>Start sharing.</p>
        <p>Start caring.</p>
      </header>
      <section className="login-buttons">
        <button onClick={handleGoogleLogin} className="login-button google">
          <FaGoogle />
          Log in with Google
        </button>
        <button onClick={handleFacebookLogin} className="login-button facebook">
          <FaFacebook />
          Log in with Facebook
        </button>
      </section>
    </div>
  );
}

export default Login;
