import { useEffect, useRef, useState } from "react";
import supabase from "../../utils/supabaseClient";

function UserPhotoUpload({ user_id }) {
  const [user, setUser] = useState(user_id);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user);
      setUser(data[0]);
    }
    getUser();
  }, []);

  const userImg = useRef();

  async function handleUserPhotoUpload(event) {
    event.preventDefault();
    const selectedUserImg = userImg.current.files[0];

    const formData = new FormData();
    formData.append("file", selectedUserImg);
    formData.append("upload_preset", "vwz7spwe");

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

    // for image preview
    setImageSrc(cloudinary.secure_url);
    // insert products input to supabase
    const { data, error } = await supabase.from("avatar_url").update([
      {
        image: cloudinary.secure_url,
      },
    ]);

    function previewHandler(display) {
      const reader = new FileReader();
      reader.onload = function (onLoadEvent) {
        setImageSrc(onLoadEvent.target.result);
      };
      reader.readAsDataURL(display.target.files[0]);
    }

    return (
      <form encType="multipart/form-data" onSubmit={handleUserPhotoUpload}>
        <label htmlFor="user-img">User Image</label>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          id="item-img"
          name="item-img"
          ref={userImg}
          onChange={previewHandler}
        />
        <p>Preview:</p>
        <img
          src={imageSrc}
          alt="preview uploaded image"
          width={200}
          height={200}
        />
        <button type="button">Change profile picture</button>
      </form>
    );
  }
}

export default UserPhotoUpload;
