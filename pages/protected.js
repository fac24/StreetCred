import supabase from "../utils/supabaseClient";

function Protected(props) {
  return (
    <div>
      <h2>Protected route</h2>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/login" } };
  }

  return { props: { user } };
}

export default Protected;
