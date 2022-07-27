import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../utils/supabaseClient";

function UserPhotoUpload({ user_id, avatar, setAvatar }) {
  const [user, setUser] = useState(user_id);
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

    setAvatar(cloudinary.secure_url);
  }

  function previewHandler(event) {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setAvatar(onLoadEvent.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  return (
    <>
      <h4>1. Upload your avatar</h4>
      <img
        src={avatar ? avatar : user.avatar_url}
        alt="preview uploaded image"
        width={200}
        height={200}
      />
      <form encType="multipart/form-data" onSubmit={handleUserPhotoUpload}>
        <label htmlFor="user-img">Upload user avatar</label>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          id="item-img"
          name="item-img"
          ref={userImg}
          onChange={previewHandler}
        />
      </form>
    </>
  );
}

export default UserPhotoUpload;
