import { useState, useEffect } from "react";
import supabase from "../../utils/supabaseClient";

function GetSender(props) {
  const [senderProfile, setSenderProfile] = useState("");

  useEffect(() => {
    async function getProfile() {
      const { data, error } = await supabase
        .from("profiles")
        .select("name, avatar_url")
        .eq("id", props.sender);

      setSenderProfile(data[0]);
    }

    getProfile();
  }, []);

  return (
    <div>
      <img src={senderProfile.avatar_url}></img>
      <p>{senderProfile.name}</p>
    </div>
  );
}

export default GetSender;
