import { useRouter } from "next/router";
import supabase from "../../utils/supabaseClient";
import Link from "next/link";
import { useState, useEffect } from "react";

function Profile(props) {
  const router = useRouter();
  const [access, setAccess] = useState(false);

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

  async function handleLogOut() {
    const { error } = await supabase.auth.signOut();
    router.push("/login");
  }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <section className="user-profile">
      <h1>Profile</h1>
      <img src={props.profile[0].avatar_url} className="profile-avatar"/>
      <br />
      {access ? (
        <Link href={`${props.profile[0].id}/edit`}>
          <a>Edit Profile</a>
        </Link>
      ) : null}
{/* 
      <button onClick={handleLogOut} className="web-login-button">
        Log Out
      </button> */}

      <div className="profile-about-user">
      <h2 className="user-profile-name">{props.profile[0].name}</h2>
      <div className="profile-points-location">
      <p>Location: {props.profile[0].location}</p>
      <p>Points: {props.profile[0].points}</p>
      </div>
      <p>Bio: {props.profile[0].user_bio}</p>
      </div>


      <div className="profile-groups profile-divs">
        <h3 className="profile-div-heading">Groups</h3>
        <ul>
          
        </ul>
      </div>

      <div className="profile-borrowed-products profile-divs">
        <h3 className="profile-div-heading">Borrowed Products</h3>
        <ul>
          
        </ul>
      </div>

      <div className="profile-posted-products profile-divs">
        <h3 className="profile-div-heading">Posted Products</h3>
        <ul>
         
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
