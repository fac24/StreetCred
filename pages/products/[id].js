import supabase from "../../utils/supabaseClient";

function Product(props) {
  console.log(props);
  return (
    <>
      <h1>this will be product</h1>
    </>
  );
}

export async function getStaticPaths() {
  const { data, error } = await supabase.from("profiles").select();
  const profiles = data ? data : [0];

  const paths = profiles.map((profile) => ({
    params: { id: `${profile.id}` },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps(context) {
  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("id", context.params.id);

  return { props: { profile: data } };
}

export default Product;
