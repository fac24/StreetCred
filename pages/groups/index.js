//import ListGroups from "../../components/Groups/ListGroups";
import AddNewGroupButton from "../../components/Groups/AddNewGroupButton";
import FilterMyGroups from "../../components/Groups/FilterMyGroups";

import supabase from "../../utils/supabaseClient";

function Groups(props) {
  return (
    <main className="groups-main">
      <FilterMyGroups groups={props.groups} />
      {/* <ListGroups groups={props.groups} /> */}
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
