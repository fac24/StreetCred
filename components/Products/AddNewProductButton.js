import { useRouter } from "next/router";
import { useEffect } from "react";
import { BsPlusCircle } from "react-icons/bs";

function AddNewProductButton(props) {
  const router = useRouter();
  const groupId = props.groupId;

  function handleRedirect() {
    localStorage.setItem("group", JSON.stringify(groupId));

    const holdToSetLocal = setTimeout(() => {
      router.push(
        {
          pathname: "/products/product-upload",
          query: { groupId: groupId },
        },
        "/products/product-upload"
      );
    }, 200);
  }

  return (
    <div className="add-button-container">
      <button onClick={handleRedirect} className="add-new-product-button">
        <BsPlusCircle className="add-new-icon" />

        <span>Add new product</span>
      </button>
    </div>
  );
}

export default AddNewProductButton;
