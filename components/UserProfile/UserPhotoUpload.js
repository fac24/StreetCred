import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../utils/supabaseClient";

function UserPhotoUpload({ user_id }) {
  const [user, setUser] = useState(user_id);
  const [imageSrc, setImageSrc] = useState("");
  const router = useRouter();

  // check user object from user id that is given as prop.

  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user);
      if (data === null) console.log("user data is null");
      else setUser(data[0]);
    }
    getUser();
  }, []);

  // get img reference from user's input
  const userImg = useRef();

  // when user click update button
  // 1. check the user's input to update user data
  // 2. upload image file to cloudinary as formdata via api
  // 3. Get cloudinary image url
  // 4. insert users input to supabase
  // 5. Redirect to user's profile page
  async function handleUserPhotoUpload(event) {
    event.preventDefault();
    const selectedUserImg = userImg.current.files[0];

    const formData = new FormData();
    formData.append("file", selectedUserImg);
    formData.append("upload_preset", "user_avatar");

    // upload picture to cloudinary
    const API_ENDPOINT =
      "https://api.cloudinary.com/v1_1/streetcred/image/upload";

    const options = {
      method: "POST",
      body: formData,
    };

    const cloudinary = await fetch(API_ENDPOINT, options).then((response) => {
      return response.json();
    });

    const { data, error } = await supabase
      .from("profiles")
      .update({
        avatar_url: cloudinary.secure_url,
      })
      .eq("id", user.id);

    router.push(`/profiles/${user_id}`);
  }

  function previewHandler(event) {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  return (
    <>
      <h4>Update Profile picture</h4>
      <img
        src={imageSrc ? imageSrc : user.avatar_url}
        alt="preview uploaded image"
        width={200}
        height={200}
      />
      <form encType="multipart/form-data" onSubmit={handleUserPhotoUpload}>
        <label htmlFor="user-img">Chnage user avatar</label>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          id="item-img"
          name="item-img"
          ref={userImg}
          onChange={previewHandler}
        />

        <button type="submit">Update profile picture</button>
      </form>
    </>
  );
}

export default UserPhotoUpload;
