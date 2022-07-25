import { useRouter } from "next/router";
import supabase from "../../utils/supabaseClient";
import CurrentLocation from "../../components/CurrentLocation/CurrentLocation";
import { useEffect, useState } from "react";
import UserPhotoUpload from "../../components/UserProfile/UserPhotoUpload";

// useEffect(() => {
//   /* fires when a user signs in or out */
//   const { data: authListener } = supabase.auth.onAuthStateChange(
//     (event, session) => {
//       handleAuthChange(event, session);
//       if (event === "SIGNED_IN") {
//         setAuthenticatedState("authenticated");
//         router.push("/profile-settings");
//       }
//       if (event === "SIGNED_OUT") {
//         setAuthenticatedState("not-authenticated");
//         router.push("/login");
//       }
//     }
//   );

//   checkUser();
//   return () => {
//     authListener.unsubscribe();
//   };
// }, []);

// 1. To verify user's information (name, avatar_url, location, bio) is 100% filled.
// 2. if(user information is 100%) then { redirect user to /groups}
// 3. if(user infromation is missing something) then { return the edit form }

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

  console.log(user);

  if (user) {
    const verify_location = user.location ? user.location : null;
    console.log(verify_location);
    return (
      <section>
        <h2>Edit your profile</h2>
        <h3>{user.name}</h3>
        <p>Upload a photo</p>
        <img src={user.avatar_url} />
        <UserPhotoUpload />
        <label>Set your location </label>
        <p>{user.location}</p>
        <CurrentLocation />
        <label>Add a bio:</label>
        <textarea>{user.user_bio}</textarea>
        <button type="submit">Submit</button>
      </section>
    );
  }

  // if there is no user information(like null)
  return <div>Loading...</div>;
}

export default ProfileSettings;
