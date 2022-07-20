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
    <>
      <h1>Login</h1>
      <button onClick={handleGoogleLogin}>Log in with Google</button>
      <button onClick={handleFacebookLogin}>Log in with Facebook</button>
    </>
  );
}

export default Login;
