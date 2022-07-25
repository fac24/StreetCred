import { useRouter } from "next/router";
import supabase from "../../utils/supabaseClient";
import CurrentLocation from "../../components/CurrentLocation/CurrentLocation";
import { useEffect, useState } from "react";
import UserPhotoUpload from "../../components/UserProfile/UserPhotoUpload";

function ProfileSettings(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  console.log(user);

  //get currently authenticated user
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

  //create a new column in the DB? created for example (boolean).
  //if it's false --> sign-up, if true --> the profile has been set up
  //when receive the user from the DB, have to check if it has been created
  //problem: when login the user is null. Probably because the authentication doesn't happen instantly, so the user doesn't exist.

  if (user) {
    return (
      <section>
        <h2>Edit your profile</h2>
        <h3>{user.name}</h3>
        <p>Upload a photo</p>
        <img src={user.avatar_url} />
        <UserPhotoUpload />
        <label>Set your location </label>
        <CurrentLocation />
        <label>Add a bio:</label>
        <textarea></textarea>
        <button type="submit">Submit</button>
      </section>
    );
  }

  return <div>Loading...</div>;
}

export default ProfileSettings;
