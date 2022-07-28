import { useState, useEffect } from "react";
import supabase from "../../utils/supabaseClient";
import RandomKey from "../Hooks/RandomKey";

function GroupItems(props) {
  const [productImage, setProductImage] = useState([]);

  useEffect(() => {
    const array = [];

    async function getImage() {
      const { data, error } = await supabase
        .from("products")
        .select("image")
        .eq("group", props.id);

      setProductImage(data.slice(0, 4));
    }

    getImage();
  }, []);

  return (
    <ul className="groups-list-products">
      {productImage.map((image, index) => {
        const url = image === undefined ? "/only-logo.svg" : image.image;
        return (
          <li key={`${url}${index}`} className="groups-list-product">
            <img
              src={url}
              alt="image of product"
              className="groups-list-products-image"
            />
          </li>
        );
      })}
    </ul>
  );
}

export default GroupItems;
