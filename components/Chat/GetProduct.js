import { useState, useEffect } from "react";

import supabase from "../../utils/supabaseClient";

function GetProduct(props) {
  const [productDetails, setProductDetails] = useState("");

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
    <div>
      <p>{productDetails.name}</p>
      <img src={productDetails.image} className="conversation-avatar" />
    </div>
  );
}

export default GetProduct;
