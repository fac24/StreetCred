import ShareLink from "../../components/ShareLink/ShareLink";
import SocialShare from "../../components/ShareLink/SocialShare";
import ProductAvailability from "../../components/Products/ProductAvailability";

import supabase from "../../utils/supabaseClient";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Product(props) {
  const [productOwner, setProductOwner] = useState("");
  const [productOwnerId, setProductOwnerId] = useState("");
  const [conversationId, setConversationId] = useState("");
  const user = supabase.auth.user();
  const conversationPath = `/chat/${conversationId}`;

  const router = useRouter();

  useEffect(() => {
    async function owner() {
      const { data: owner, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", props.product[0].owner);

      setProductOwner(owner[0].name);
      setProductOwnerId(props.product[0].owner);
    }
    //console.log(window.location.href);

    owner();
  }, [props.product]);

  async function createConversation() {
    const { data, error } = await supabase.from("conversations").insert([
      {
        product_id: props.product[0].id,
        owner_id: productOwnerId,
        requester_id: user.id,
      },
    ]);

    if (data) {
      setConversationId(data[0].id);
      console.log(data[0].id);
    } else {
      console.error;
    }

    router.push(`/messages/${data[0].id}`);
  }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Products Page</h1>
      <div>
        <h3>{props.product[0].name}</h3>
        <img src={props.product[0].image} />
        <p>{props.product[0].description}</p>
        <p>{props.product[0].location}</p>
        <p>{props.product[0].created_at}</p>
        <ProductAvailability
          availability={props.product[0].availability}
          producId={props.product[0].id}
          productOwner={props.product[0].owner}
        />
        <button onClick={createConversation}>Contact {productOwner}!</button>
      </div>
      <ShareLink />
      <SocialShare />
    </>
  );
}

export async function getStaticPaths() {
  const { data, error } = await supabase.from("products").select();
  const products = data ? data : ["022a7185-2aea-4d50-83e2-64229cd0f367"];

  const paths = products?.map((product) => ({
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
