import supabase from "../utils/supabaseClient";

function Protected({ user }) {
  console.log({ user });
  return (
    <div>
      <h2>Protected route</h2>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  /* check to see if a user is set */
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/login" } };
  }

  /* if a user is set, pass it to the page via props */
  return { props: { user } };
}

export default Protected;
