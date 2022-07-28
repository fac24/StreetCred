//import ListGroups from "../../components/Groups/ListGroups";
import AddNewGroupButton from "../../components/Groups/AddNewGroupButton";
import FilterMyGroups from "../../components/Groups/FilterMyGroups";

import supabase from "../../utils/supabaseClient";
import { useState } from "react";
import makeGetServerSidePropsWithUser from "../../utils/makeGetServerSidePropsWithUser";

function Groups(props) {
  const [userId, setUserId] = useState(props.user.id);

  return (
    <main className="groups-main">
      <FilterMyGroups groups={props.groups} userId={userId} />
      {/* <ListGroups groups={props.groups} /> */}
      <AddNewGroupButton />
    </main>
  );
}

export const getServerSideProps = makeGetServerSidePropsWithUser(async () => {
  const groups = await supabase.from("groups").select().eq("public", "true");

  return {
    props: {
      groups: groups.data,
    },
  };
});

export default Groups;
