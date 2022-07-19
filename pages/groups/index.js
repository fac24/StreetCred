import ListGroups from "../../components/Groups/ListGroups";

import supabase from "../../utils/supabaseClient";

function Groups(props) {
  return (
    <div>
      <ListGroups groups={props.groups} />
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
