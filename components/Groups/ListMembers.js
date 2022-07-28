import RandomKey from "../Hooks/RandomKey";

import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import supabase from "../../utils/supabaseClient";

function ListMembers(props) {
  const [members, setMembers] = useState([]);
  const router = useRouter();

  const groupMembers = props.groupMembers;

  useEffect(() => {
    async function getMembers() {
      const membersObjects = [];
      groupMembers.map(async (member) => {
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .limit(3)
          .eq("id", member);

        membersObjects.push(data[0]);
        setMembers(membersObjects);
      });
    }

    getMembers();
  }, [groupMembers]);

  return (
    <section>
      <h3>Members ({members.length})</h3>
      <ul className="group-page-members">
        {members.map((member) => {
          const avatar =
            member === undefined ? "/only-logo.svg" : member.avatar_url;
          const url =
            member === undefined ? "/groups" : `/profiles/${member.id}`;
          return (
            <li key={member.id} className="group-page-member">
              <img
                src={avatar}
                alt="image"
                className="group-page-members-avatar"
              />
              <p>{member === undefined ? "Deleted user" : member.name}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ListMembers;
