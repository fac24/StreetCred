import { useRouter } from "next/router";

function AddNewProductButton() {
  const router = useRouter();

  function handleRedirect() {
    router.push("/products/product-upload");
  }
  return <button onClick={handleRedirect}>Add new product</button>;
}

export default AddNewProductButton;
