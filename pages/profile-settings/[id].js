import { useRouter } from "next/router";
import supabase from "../../utils/supabaseClient";

function ProfileSettings(props) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h2>Create your profile</h2>
      <h3>{props.profile[0].name}</h3>
      <p>Upload a photo</p>
      <img src={props.profile[0].avatar_url} />
      <label>Set your location </label>
      <CurrentLocation />
    </section>
  );
}

export async function getStaticPaths() {
  const { data, error } = await supabase.from("profiles").select();
  const profiles = data ? data : ["20352919-b6ad-46e9-972d-6e086e7c7580"];

  const paths = profiles.map((profile) => ({
    params: { id: `${profile.id}` },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps(context) {
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", context.params.id);

  return { props: { profile: data } };
}

export default ProfileSettings;
