import { useState } from "react";

import supabase from "../../utils/supabaseClient";

function JoinGroup(props) {
  const [joined, setJoined] = useState(false);

  const { user } = useAuthContext();
  const groupId = props.groupId;
  const members = props.members;

  async function handleJoin() {
    members.push(user.id);

    const { data, error } = await supabase
      .from("groups")
      .update({ members: members })
      .eq("id", groupId);

    setJoined(true);
  }

  return (
    <button onClick={handleJoin}>{joined ? "Joined" : "Join the Group"}</button>
  );
}

export default JoinGroup;
