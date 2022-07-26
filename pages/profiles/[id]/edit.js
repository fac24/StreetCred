import router, { useRouter } from "next/router";
import supabase from "../../../utils/supabaseClient";
import CurrentLocation from "../../../components/CurrentLocation/CurrentLocation";
import { useEffect, useState } from "react";
import UserPhotoUpload from "../../../components/UserProfile/UserPhotoUpload";

// 1. To verify user's information (name, avatar_url, location, bio) is 100% filled.
// 2. if(user information is 100%) then { redirect user to /groups}
// 3. if(user infromation is missing something) then { return the edit form }

function ProfileSettings(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postcode, setPostcode] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
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

  useEffect(() => {
    // Check active sessions and sets the user
    const session = supabase.auth.session();

    setUser(session?.user ?? null);
    setLoading(false);

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );
    return () => {
      listener?.unsubscribe();
    };
  }, []);

  //if the user just logged in this will be null, so we need to rely on the onAuthChanged,
  //if the user has logged in before, supabase.auth.user() will have a user
  useEffect(() => {
    async function getUser() {
      const user = supabase.auth.user();
      //find in the db the matching profile
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user.id);
      setUser(data[0]);
    }
    getUser();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const { data, error } = await supabase
      .from("profiles")
      .update({
        user_bio: bio,
        location: postcode,
        created: true,
        avatar_url: avatar,
      })
      .eq("id", user.id);

    router.push(`/profiles/${user.id}`);
  }

  if (user && access) {
    return (
      <form onSubmit={handleSubmit}>
        <h2>Edit profile</h2>
        <h3>Hi, {user.name}</h3>

        <UserPhotoUpload
          user_id={user.id}
          avatar={user.avatar_url ? user.avatar_url : avatar}
          setAvatar={setAvatar}
        />

        <h4>2. Set your location</h4>
        <CurrentLocation
          value={user.location}
          postcode={(postcode) => setPostcode(postcode)}
        />
        <h4>3. Add a short bio</h4>
        <textarea
          value={user.user_bio ? user.user_bio : bio}
          onChange={(event) => setBio(event.target.value)}
        ></textarea>
        <br />
        <button type="submit">Update profile</button>
      </form>
    );
  }

  // if there is no user information(like null)
  // or other users try to access user's edit page by url
  return <div>You can't access to this page.</div>;
  // return <div>Loading...</div>;
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
