//import ListGroups from "../../components/Groups/ListGroups";
import AddNewGroupButton from "../../components/Groups/AddNewGroupButton";
import FilterMyGroups from "../../components/Groups/FilterMyGroups";

import supabase from "../../utils/supabaseClient";
import { useState, useEffect } from "react";

function Groups(props) {
  const [groups, setGroups] = useState([]);
  const [userId, setUserId] = useState(props.user.id);

  return (
    <main className="groups-main">
      <FilterMyGroups groups={props.groups} userId={userId} />
      {/* <ListGroups groups={props.groups} /> */}
      <AddNewGroupButton />
    </main>
  );
}

export async function getServerSideProps(context) {
  const groups = await supabase.from("groups").select().eq("public", "true");

  const { user } = await supabase.auth.api.getUserByCookie(context.req);

  if (user === null) {
    return { props: {}, redirect: { destination: "/login" } };
  }

  return { props: { user, groups: groups.data } };
}

export default Groups;
