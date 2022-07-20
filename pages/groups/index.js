import ListGroups from "../../components/Groups/ListGroups";
import AddNewGroupButton from "../../components/Groups/AddNewGroupButton";
import FilterGroups from "../../components/Groups/FilterGroups";

import supabase from "../../utils/supabaseClient";

function Groups(props) {
  async function submit() {
    const { user, session, error } = await supabase.auth.signUp(
      {
        email: "404@404.com",
        password: "error404",
      },
      {
        data: {
          avatar_url:
            "https://res.cloudinary.com/streetcred/image/upload/v1658312789/group_avatars/emznhhwfn4pwbe9qvh38.png",
          name: "404",
        },
      }
    );
  }

  return (
    <div>
      <FilterGroups />
      <ListGroups groups={props.groups} />
      <AddNewGroupButton />
      <button onClick={submit}>404</button>
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
