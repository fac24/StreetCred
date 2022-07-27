import { useEffect, useState } from "react";
import supabase from "../../utils/supabaseClient";

function GetRequester(props) {
  const [requesterProfile, setRequesterProfile] = useState("");

  useEffect(() => {
    async function getProfile() {
      const { data, error } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", props.requester);

      setRequesterProfile(data[0].name);
    }

    getProfile();
  }, []);

  return <p>{requesterProfile}</p>;
}

export default GetRequester;
