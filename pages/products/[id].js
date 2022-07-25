import ShareLink from "../../components/ShareLink/ShareLink";
import supabase from "../../utils/supabaseClient";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SocialShare from "../../components/ShareLink/SocialShare";
import Link from "next/link";

function Product(props) {
  const [productOwner, setProductOwner] = useState("");
  const [conversationId, setConversationId] = useState("");
  const conversationPath = `/chat/${conversationId}`;

  const router = useRouter();

  useEffect(() => {
    async function owner() {
      const { data: owner, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", props.product[0].owner);

      setProductOwner(owner[0].name);
    }
    console.log(window.location.href);

    owner();
  }, [props.product]);

  async function createConversation() {
    const { data, error } = await supabase
      .from("conversations")
      .insert([{ product_id: props.product[0].id }]);

    if (data) {
      setConversationId(data[0].id);
      console.log(data[0].id);
    } else {
      console.error;
    }

    router.push(`/chat/${data[0].id}`);
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
        <p>{props.product[0].create_at}</p>
        <p>{props.product[0].availability}</p>
      </div>
      <ShareLink />
      <SocialShare />
    </>
  );
}

export async function getStaticPaths() {
  const { data, error } = await supabase.from("products").select();
  const products = data ? data : ["022a7185-2aea-4d50-83e2-64229cd0f367"];

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
