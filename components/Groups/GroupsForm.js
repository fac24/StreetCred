import React from "react";
import { useState, useEffect } from "react";

function GroupsForm() {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupAvatar, setGroupAvatar] = useState("");
  const [publicity, setPublicity] = useState(true);

  function handleAvatarChange(display) {
    //get file path on user's machine
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setGroupAvatar(onLoadEvent.target.result);
    };

    reader.readAsDataURL(display.target.files[0]);
  }

  const cloudinary = await fetch(
    "https://api.cloudinary.com/v1_1/streetcred/image/upload",
    {
      method: "POST",
      body: formData,
    }
  ).then((response) => response.json());

  async function handleFormSubmit(event) {
    event.preventDefault();

    console.log(groupName, groupDescription, groupAvatar, publicity);
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="group-name">Your group's name</label>
        <input
          type="text"
          id="group-name"
          name="group-name"
          placeholder="e.g. N16 Cyclists"
          value={groupName}
          onChange={(event) => setGroupName(event.target.value)}
        />

        <label htmlFor="group-description">Description</label>
        <textarea
          id="group-description"
          name="group-description"
          placeholder="Describe the purpose of your group."
          value={groupDescription}
          onChange={(event) => setGroupDescription(event.target.value)}
        ></textarea>

        <label htmlFor="group-avatar">Group avatar</label>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          id="group-avatar"
          name="group-avatar"
          onChange={handleAvatarChange}
        />
        <img src={groupAvatar} alt="preview" />

        <div>
          <input
            type="radio"
            id="invite-only"
            name="publicity"
            value={publicity}
            onChange={(event) => setPublicity(event.target.value)}
          />
          <label htmlFor="invite-only">Invite Only</label>

          <input
            type="radio"
            id="public-only"
            name="publicity"
            value={publicity}
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
