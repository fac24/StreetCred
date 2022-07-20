import ListGroups from "../../components/Groups/ListGroups";
import AddNewGroupButton from "../../components/Groups/AddNewGroupButton";
import FilterGroups from "../../components/Groups/FilterGroups";

import supabase from "../../utils/supabaseClient";

function Groups(props) {
  return (
    <div>
      <FilterGroups />
      <ListGroups groups={props.groups} />
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
