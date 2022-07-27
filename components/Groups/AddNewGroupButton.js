import { useRouter } from "next/router";
import { BsPlusCircle } from "react-icons/bs";

function AddNewGroupButton() {
  const router = useRouter();

  function handleRedirect() {
    router.push("/groups/add-group");
  }
  return (
    <div className="add-button-container">
      <button onClick={handleRedirect} className="add-new-group-button">
        <BsPlusCircle className="add-new-icon" />

        <span>Add new group</span>
      </button>
    </div>
  );
}

export default AddNewGroupButton;
