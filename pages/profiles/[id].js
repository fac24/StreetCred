import { useRouter } from "next/router";
import supabase from "../../utils/supabaseClient";
import Link from "next/link";
import { useState, useEffect } from "react";

function Profile(props) {
  const router = useRouter();
  const [access, setAccess] = useState(false);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // to check if user can access to edit button
  let user_id;
  if (supabase.auth.user()) {
    for (const [key, value] of Object.entries(supabase.auth.user())) {
      if (key == "id") {
        user_id = value;
      }
    }
  }

  useEffect(() => {
    setAccess(props.profile[0].id == user_id);
  }, []);

  return (
    <section>
      <h1>Profile</h1>
      <img src={props.profile[0].avatar_url} />
      <br />
      {access ? (
        <Link href={`${props.profile[0].id}/edit`}>
          <a>Edit</a>
        </Link>
      ) : null}

      <h2>{props.profile[0].name}</h2>
      <p>{props.profile[0].points} points</p>
      <p>Location: {props.profile[0].location}</p>
      <p>Bio: {props.profile[0].user_bio}</p>

      <div>
        <h3>Groups</h3>
        <ul>
          <li>Group 1</li>
          <li>Group 2</li>
        </ul>
      </div>

      <div>
        <h3>Borrowed Products</h3>
        <ul>
          <li>Product 1</li>
          <li>Product 2</li>
        </ul>
      </div>

      <div>
        <h3>Posted Products</h3>
        <ul>
          <li>Product 1</li>
          <li>Product 2</li>
        </ul>
      </div>
    </section>
  );
}

export async function getStaticPaths() {
  const { data, error } = await supabase.from("profiles").select();
  const profiles = data ? data : ["20352919-b6ad-46e9-972d-6e086e7c7580"];

  const paths = profiles?.map((profile) => ({
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

export default Profile;
