import AddNewProductButton from "../../components/Products/AddNewProductButton";
import JoinGroup from "../../components/Groups/JoinGroup";

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
        <p>Admin: {groupAdmin.name}</p>
        <ul>
          <li>Bill</li>
          <li>Nick</li>
        </ul>
      </div>

      <div>
        <h3>Available Items</h3>
        <ul>
          <li>Product 1</li>
          <li>Product 2</li>
        </ul>
      </div>

      <AddNewProductButton groupId={props.group[0].id} />
    </section>
  );
}

export async function getStaticPaths() {
  const { data, error } = await supabase.from("groups").select();
  const groups = data ? data : ["db774228-29f3-432c-a618-bba7807c942f"];

  const paths = groups.map((group) => ({
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
