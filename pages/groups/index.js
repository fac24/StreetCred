import ListGroups from "../../components/Groups/ListGroups";
import AddNewGroupButton from "../../components/Groups/AddNewGroupButton";
import FilterGroups from "../../components/Groups/FilterGroups";

import supabase from "../../utils/supabaseClient";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/auth";

function Groups(props) {
  const { user } = useAuthContext();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (user) {
      setGroups(
        props.groups.filter((group) => group.members.includes(user.id))
      );
    }
  }, [user]);

  console.log(props.groups, groups, user?.id);

  return (
    <div>
      <FilterGroups />
      <ListGroups groups={groups} />
      <AddNewGroupButton />
    </div>
  );
}

export async function getServerSideProps() {
  const groups = await supabase.from("groups").select().eq("public", "true");

  return {
    props: {
      groups: groups.data,
    },
  };
}

export default Groups;
