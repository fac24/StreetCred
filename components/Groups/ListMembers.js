import RandomKey from "../Hooks/RandomKey";

import { useEffect, useState } from "react";
import supabase from "../../utils/supabaseClient";

function ListMembers(props) {
  const [members, setMembers] = useState([]);

  const groupMembers = props.groupMembers;

  useEffect(() => {
    async function getMembers() {
      const membersObjects = [];
      groupMembers.map(async (member) => {
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", member);

        membersObjects.push(data[0]);
        setMembers(membersObjects);
      });
    }

    getMembers();
  }, [groupMembers]);

  return (
    <section>
      <ul>
        {members.map((member) => {
          const avatar = member.avatar_url;
          return (
            <li key={RandomKey()}>
              <img src={avatar} alt="image" />
              <p>{member.name}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ListMembers;
