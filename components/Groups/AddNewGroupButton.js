import { useRouter } from "next/router";

function AddNewGroupButton() {
  const router = useRouter();

  function handleRedirect() {
    router.push("/groups/add-group");
  }
  return <button onClick={handleRedirect}>Add new group</button>;
}

export default AddNewGroupButton;
