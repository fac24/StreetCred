import router, { useRouter } from "next/router";
import supabase from "../../utils/supabaseClient";
import CurrentLocation from "../../components/CurrentLocation/CurrentLocation";
import { useEffect, useState } from "react";
//import UserPhotoUpload from "../../components/UserProfile/UserPhotoUpload";
import { useAuthContext } from "../../context/auth";
import makeGetServerSidePropsWithUser from "../../utils/makeGetServerSidePropsWithUser";
import { FaHouseUser } from "react-icons/fa";

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
        /*         avatar_url: avatar, */
        longitude: postcodeDetails.result.longitude,
        latitude: postcodeDetails.result.latitude,
      })
      .eq("id", user.id);

    router.push(`/profiles/${user.id}`);
  }

  if (user) {
    return (
      <section className="set-profile-page">
        <form onSubmit={handleSubmit} className="profile-set-form">
          <h2>Hi {user.name}!</h2>
          <FaHouseUser className="profile-set-icon" />
          <p>To complete the sign up process, follow these steps:</p>

          {/* <h4>1. Set your profile photo</h4>
          <UserPhotoUpload
            user_id={user.id}
            avatar={avatar}
            setAvatar={setAvatar}
          /> */}
          <div className="form-div">
            <h3>Set your location</h3>
            <CurrentLocation postcode={(postcode) => setPostcode(postcode)} />
          </div>
          <div className="form-div">
            <h3>Add a short bio</h3>
            <textarea
              value={bio}
              onChange={(event) => setBio(event.target.value)}
            ></textarea>
          </div>
          <button type="submit" id="create" className="create-profile-button">
            Create your profile
          </button>
        </form>
      </section>
    );
  }

  // if there is no user information(like null)
  return <div>Loading...</div>;
}

export const getServerSideProps = makeGetServerSidePropsWithUser();

export default ProfileSettings;
