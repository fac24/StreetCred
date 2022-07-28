import { useEffect, useState } from "react";
import supabase from "../../utils/supabaseClient";

function SetHeader(props) {
  const [productDetails, setProductDetails] = useState("");
  const [group, setGroup] = useState("");

  useEffect(() => {
    async function getProduct() {
      const { data, error } = await supabase
        .from("products")
        .select("name, image")
        .eq("id", props.product);

      setProductDetails(data[0]);
    }

    getProduct();
  }, []);

  return (
    <div className="chat-product-header">
      <p>{productDetails.name}</p>
      <img src={productDetails.image} className="chat-avatar" />
    </div>
  );

  return <div>SetHeader</div>;
}

export default SetHeader;
