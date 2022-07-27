import React from "react";
import GroupsForm from "../../components/Groups/GroupsForm";

function AddGroup() {
  return (
    <section className="add-new-group-container">
      <h2>Create your group</h2>
      <GroupsForm />
    </section>
  );
}

export default AddGroup;
