import GetElements from "../Hooks/GetElements";
import RandomKey from "../Hooks/RandomKey";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ListProducts(props) {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const groupId = props.groupId;

  useEffect(() => {
    async function getProducts() {
      const prods = await GetElements("products", "group", groupId);
      setProducts(prods);
    }
    getProducts();
  }, [groupId]);

  return (
    <div>
      <ul className="products-div">
        {products?.map((product) => {
          return (
            <li
              key={product.id}
              onMouseDown={(event) => {
                event.preventDefault();
                router.push(`/products/${product.id}`);
              }}
            >
              <p>{product.name}</p>
              <img src={product.image} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListProducts;
