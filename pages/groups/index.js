import ListGroups from "../../components/Groups/ListGroups";
import AddNewGroupButton from "../../components/Groups/AddNewGroupButton";
import FilterGroups from "../../components/Groups/FilterGroups";
import Link from "next/link";
import supabase from "../../utils/supabaseClient";
import { useEffect, useState } from "react";

function Groups(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const user = supabase.auth.user();
      //find in the db the matching profile
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user.id);
      setUser(data[0]);
    }
    getUser();
  }, []);
  if (user) {
    return (
      <div>
        <Link href={`/profiles/${user.id}`}>profile</Link>
        <FilterGroups />
        <ListGroups groups={props.groups} />
        <AddNewGroupButton />
      </div>
    );
  }
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
