import ShareLink from "../../components/ShareLink/ShareLink";
import supabase from "../../utils/supabaseClient";
import {useState, useEffect} from "react";
import React from "react";

function Product(props) {
  const [productOwner, setProductOwner] = useState("");

  useEffect(() => {
    async function owner() {
      const { data: owner, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", props.product[0].owner);

      setProductOwner(owner[0].name);

    }
    console.log(window.location.href)

    owner();
  }, [props.product]);


  return (
    <>
      <h1>Products Page</h1>
      <div>
        <h3>{props.product[0].name}</h3>
        <img src={props.product[0].image}/>
        <p>{props.product[0].description}</p>
        <p>{props.product[0].location}</p>
        <p>{props.product[0].create_at}</p>
        <p>{props.product[0].availability}</p>
        <button>Contact {productOwner}</button>
      </div>
      <ShareLink/>
    </>
  );
}

export async function getStaticPaths() {
  const { data, error } = await supabase.from("products").select();
  const products = data ? data : [0];

  const paths = products.map((product) => ({
    params: { id: `${product.id}` },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps(context) {
  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("id", context.params.id);

  return { props: { product: data } };
}

export default Product;
