//import ListGroups from "../../components/Groups/ListGroups";
import AddNewGroupButton from "../../components/Groups/AddNewGroupButton";
<<<<<<< HEAD
import FilterMyGroups from "../../components/Groups/FilterMyGroups";

=======
import FilterGroups from "../../components/Groups/FilterGroups";
import Link from "next/link";
>>>>>>> 109dad571efc721eda90edded4c5b1eaf2078f3f
import supabase from "../../utils/supabaseClient";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/auth";
import router, { Router } from "next/router";

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

  return (
<<<<<<< HEAD
    <main className="groups-main">
      <FilterMyGroups groups={props.groups} />
      {/* <ListGroups groups={props.groups} /> */}
=======
    <div>
      {/* <Link href={`/profiles/${user.id}`}>profile</Link> */}
      <FilterGroups />
      <ListGroups groups={groups} />
>>>>>>> 109dad571efc721eda90edded4c5b1eaf2078f3f
      <AddNewGroupButton />
    </main>
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
