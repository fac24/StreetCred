import { useState } from "react";
import supabase from "../../utils/supabaseClient";

function MembersAvatars(props) {
  const [avatars, setAvatars] = useState([]);

  props.members.map((member) => {
    /*     async function getData() {
      const { data, error } = supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", member);
 */
    console.log(member);
  });

  return <div>MembersAvatars</div>;
}

export default MembersAvatars;
