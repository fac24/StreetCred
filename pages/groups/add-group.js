import React from "react";
import GroupsForm from "../../components/Groups/GroupsForm";
import makeGetServerSidePropsWithUser from "../../utils/makeGetServerSidePropsWithUser";

function AddGroup() {
  return (
    <section className="add-new-group-container">
      <GroupsForm>
        <h2>Create your group</h2>
      </GroupsForm>
    </section>
  );
}

export const getServerSideProps = makeGetServerSidePropsWithUser();

export default AddGroup;
