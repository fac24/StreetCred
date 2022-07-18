import supabase from "../utils/supabaseClient.js";

function signUp() {
  /*   FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  }); */

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
      <h1>Sign up page</h1>
      <button onClick={handleGoogleLogin}>Log in with Google</button>
      <button onClick={handleFacebookLogin}>Log in with Facebook</button>
    </>
  );
}

export default signUp;
