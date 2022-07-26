import AddNewProductButton from "../../components/Products/AddNewProductButton";
import JoinGroup from "../../components/Groups/JoinGroup";
import ListMembers from "../../components/Groups/ListMembers";
import ListProducts from "../../components/Products/ListProducts";

import { useState, useEffect } from "react";
import supabase from "../../utils/supabaseClient";
import { useRouter } from "next/router";

function Group(props) {
  const [groupAdmin, setGroupAdmin] = useState("");

  const router = useRouter();

  useEffect(() => {
    async function admin() {
      const { data: admin, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", props.group[0].admin);

      setGroupAdmin(admin[0]);
    }

    admin();
  }, [props.group]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h1>Group Profile</h1>
      <img src={props.group[0].avatar} />

      <h2>{props.group[0].name}</h2>

      <p>Location: {props.group[0].location}</p>

      <h3>Description:</h3>
      <p>{props.group[0].description}</p>

      <JoinGroup groupId={props.group[0].id} members={props.group[0].members} />

      <div>
        <h3>Members</h3>
        <div>
          <h4>Admin: </h4>
          <img src={groupAdmin.avatar_url} alt="avatar of group admin" />
          <p>{groupAdmin.name}</p>
        </div>
        <ListMembers groupMembers={props.group[0].members} />
      </div>

      <div>
        <h3>Available Items</h3>
        <ListProducts groupId={props.group[0].id} />
      </div>

      <AddNewProductButton groupId={props.group[0].id} />
    </section>
  );
}

export async function getStaticPaths() {
  const { data, error } = await supabase.from("groups").select();
  const groups = data ? data : ["db774228-29f3-432c-a618-bba7807c942f"];

  const paths = groups?.map((group) => ({
    params: { id: `${group.id}` },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps(context) {
  const { data, error } = await supabase
    .from("groups")
    .select()
    .eq("id", context.params.id);

  return { props: { group: data } };
}

export default Group;
