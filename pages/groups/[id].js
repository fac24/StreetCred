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
        .limit(5)
        .order("created_at", { ascending: false })
        .eq("id", props.group[0].admin);

      setGroupAdmin(admin[0]);
    }

    admin();
  }, [props.group]);

  function getTheDate(dateOfMessage) {
    const date = new Date(dateOfMessage).toLocaleString();
    return date.slice(0, 10);
  }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <section className="group-id-section">
      <img src={props.group[0].avatar} className="group-page-avatar" />
      <div className="group-id-title">
        <h2>{props.group[0].name}</h2>

        <p>({props.group[0].location})</p>
      </div>
      <div className="group-id-title">
        <p>Since {getTheDate(props.group[0].created_at)}</p>
        <span>|</span>
        <p>Private</p>
      </div>
      <p id="group-id-desc">{props.group[0].description}</p>

      <JoinGroup groupId={props.group[0].id} members={props.group[0].members} />

      <div>
        <h3>Members</h3>
        <div>
          <h4>Admin: </h4>
          <img
            src={groupAdmin.avatar_url}
            alt="avatar of group admin"
            className="group-page-members-avatar"
          />
          <p>{groupAdmin.name}</p>
        </div>
        <ListMembers groupMembers={props.group[0].members} />
      </div>

      <div>
        <h3>Available Items</h3>
        <ListProducts groupId={props.group[0].id} />
      </div>

      <AddNewProductButton
        groupId={props.group[0].id}
        className="add-new-product"
      />
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
