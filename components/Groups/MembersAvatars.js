import { useEffect, useState } from "react";
import supabase from "../../utils/supabaseClient";

function MembersAvatars(props) {
  const [avatars, setAvatars] = useState([]);
  const array = [];

  useEffect(() => {
    async function getAvatar(memberId) {
      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", memberId);

      //console.log(data);
      array.push(data[0]);
      setAvatars(array);
    }

    props.members.map((member) => {
      getAvatar(member);
    });
  }, []);

  return (
    <div>
      <ul>
        {avatars.map((avatar) => {
          console.log(avatar);
        })}
      </ul>
    </div>
  );
}

export default MembersAvatars;
