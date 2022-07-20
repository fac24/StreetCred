import React from "react";
import { useState, useEffect } from "react";
import supabase from "../../utils/supabaseClient";
import CurrentLocation from "../CurrentLocation/CurrentLocation";

function GroupsForm() {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupLocation, setGroupLocation] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [groupAvatar, setGroupAvatar] = useState("");
  const [publicity, setPublicity] = useState(true);

  async function handleAvatarChange(display) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setAvatarPreview(onLoadEvent.target.result);
    };

    setGroupAvatar(display.target.files[0]);

    reader.readAsDataURL(display.target.files[0]);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", groupAvatar);
    formData.append("upload_preset", "group_avatars");

    const cloudinary = await fetch(
      "https://api.cloudinary.com/v1_1/streetcred/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((response) => response.json());

    const { data, error } = await supabase.from("groups").insert([
      {
        name: groupName,
        description: groupDescription,
        location: groupLocation,
        avatar: cloudinary.secure_url,
        members: [],
        public: publicity,
      },
    ]);
  }

  //Borrow fishing related items from our group
  // Lake Street Fishers

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="group-name">Your group&apos;s name</label>
        <input
          type="text"
          id="group-name"
          name="group-name"
          placeholder="e.g. N16 Cyclists"
          value={groupName}
          onChange={(event) => setGroupName(event.target.value)}
          required
        />
        <label htmlFor="group-location">Group Location</label>
        <CurrentLocation postcode={(postcode) => setGroupLocation(postcode)} />

        <label htmlFor="group-description">Description</label>
        <textarea
          id="group-description"
          name="group-description"
          placeholder="Describe the purpose of your group."
          value={groupDescription}
          onChange={(event) => setGroupDescription(event.target.value)}
          required
        ></textarea>

        <label htmlFor="group-avatar">Group avatar</label>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          id="group-avatar"
          name="group-avatar"
          onChange={handleAvatarChange}
          required
        />
        <img src={avatarPreview} alt="preview" />

        <div>
          <input
            type="radio"
            id="invite-only"
            name="publicity"
            value={false}
            onChange={(event) => setPublicity(event.target.value)}
          />
          <label htmlFor="invite-only">Invite Only</label>

          <input
            type="radio"
            id="public-only"
            name="publicity"
            value={true}
            onChange={(event) => setPublicity(event.target.value)}
          />
          <label htmlFor="public-only">Public</label>
        </div>

        <button type="submit">Create Group</button>
      </form>
    </>
  );
}

export default GroupsForm;
