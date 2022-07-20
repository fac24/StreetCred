import { useRouter } from "next/router";

function AddNewProductButton(props) {
  const router = useRouter();

  function handleRedirect() {
    router.push({
      pathname: "/products/product-upload",
      state: { groupId: props.groupId },
    });
  }
  return <button onClick={handleRedirect}>Add new product</button>;
}

export default AddNewProductButton;
