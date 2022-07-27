import { useEffect, useState } from "react";
import RandomKey from "../Hooks/RandomKey";
import supabase from "../../utils/supabaseClient";

function MembersAvatars(props) {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    const array = [];

    async function getAvatar(memberId) {
      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", memberId);

      array.push(data[0]);

      setAvatars(array.slice(0, 3));
    }

    props.members.map((member) => {
      getAvatar(member);
    });
  }, []);

  return (
    <ul className="groups-list-members">
      {avatars.map((avatar) => {
        const url = avatar === undefined ? "/only-logo.svg" : avatar.avatar_url;
        return (
          <li key={RandomKey()} className="groups-list-member">
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
