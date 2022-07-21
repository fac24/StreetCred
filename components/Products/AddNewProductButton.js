import { useRouter } from "next/router";

function AddNewProductButton(props) {
  const router = useRouter();

  function handleRedirect() {
    router.push(
      {
        pathname: "/products/product-upload",
        query: { groupId: props.groupId },
      },
      "/products/product-upload"
    );
  }

  return <button onClick={handleRedirect}>Add new product</button>;
}

export default AddNewProductButton;
