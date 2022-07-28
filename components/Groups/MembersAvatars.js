import { useEffect, useState } from "react";
import RandomKey from "../Hooks/RandomKey";
import supabase from "../../utils/supabaseClient";

function MembersAvatars(props) {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    async function getAvatars(memberId) {
      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url")
        .limit(3)
        .order("created_at", { ascending: false })
        .in("id", [props.members]);

      setAvatars(data);
    }

    getAvatars();
  }, []);

  return (
    <ul className="groups-list-members">
      {avatars.map((avatar, index) => {
        const url = avatar === undefined ? "/only-logo.svg" : avatar.avatar_url;
        return (
          <li key={index} className="groups-list-member">
            <img
              src={url}
              alt="group member avatar"
              className="groups-list-members-avatar"
            />
          </li>
        );
      })}
    </ul>
  );
}

export default MembersAvatars;
