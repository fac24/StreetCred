import router, { useRouter } from "next/router";
import supabase from "../../utils/supabaseClient";
import CurrentLocation from "../../components/CurrentLocation/CurrentLocation";
import { useEffect, useState } from "react";
import UserPhotoUpload from "../../components/UserProfile/UserPhotoUpload";
import { useAuthContext } from "../../context/auth";

// 1. To verify user's information (name, avatar_url, location, bio) is 100% filled.
// 2. if(user information is 100%) then { redirect user to /groups}
// 3. if(user infromation is missing something) then { return the edit form }

function ProfileSettings(props) {
  const { user } = useAuthContext();
  const [postcode, setPostcode] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const postcodeRequest = await fetch(
      `https://api.postcodes.io/postcodes/${postcode}`
    );
    const postcodeDetails = await postcodeRequest.json();

    if (postcodeDetails.status !== 200) {
      console.error("Postcode invalid");
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({
        user_bio: bio,
        location: postcode,
        created: true,
        avatar_url: avatar,
        longitude: postcodeDetails.result.longitude,
        latitude: postcodeDetails.result.latitude,
      })
      .eq("id", user.id);

    router.push(`/profiles/${user.id}`);
  }

  if (user) {
    return (
      <form onSubmit={handleSubmit}>
        <h2>Create your profile</h2>
        <h3>Hi, {user.name}</h3>
        <p>To complete the sign up process, follow these steps:</p>

        <UserPhotoUpload
          user_id={user.id}
          avatar={avatar}
          setAvatar={setAvatar}
        />

        <h4>2. Set your location</h4>
        <CurrentLocation postcode={(postcode) => setPostcode(postcode)} />
        <h4>3. Add a short bio</h4>
        <textarea
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        ></textarea>
        <button type="submit">Create your profile</button>
      </form>
    );
  }

  // if there is no user information(like null)
  return <div>Loading...</div>;
}

export default ProfileSettings;
