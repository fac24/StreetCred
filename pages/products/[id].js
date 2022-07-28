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

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  useEffect(() => {
    async function owner() {
      const { data: owner, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", props.product.owner);

      setProductOwner(owner[0].name);
      setProductOwnerId(props.product.owner);
    }

    owner();
  }, [props.product]);

  async function createConversation() {
    const { data, error } = await supabase.from("conversations").insert([
      {
        product_id: props.product.id,
        owner_id: productOwnerId,
        requester_id: user.id,
      },
    ]);

    if (data) {
      setConversationId(data[0].id);
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
      <h2>Products Page</h2>
      <div className="group-id-section">
        <h3>{props.product.name}</h3>
        <img src={props.product.image} className="group-page-avatar" />
        <p>{props.product.description}</p>
        {/* <p>{props.product.location}</p> */}
        <p>Distance: {props.distance} km</p>
        <p>Posted {timeSince(new Date(props.product.created_at))} ago</p>
        <ProductAvailability
          availability={props.product.availability}
          producId={props.product.id}
          productOwner={props.product.owner}
        />
        <button
          onClick={createConversation}
          className="open-group-button margin-bottom-sm"
        >
          Contact {productOwner}
        </button>
        <ShareLink />
        <SocialShare />
      </div>
    </>
  );
}

export async function getServerSideProps({ req, params }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("id", params.id);

  // return { props: { product: data } };

  const userRequest = await supabase
    .from("profiles")
    .select()
    .eq("id", user.id);

  const distance = calcDistance(
    userRequest.data[0].latitude,
    userRequest.data[0].longitude,
    data[0].latitude,
    data[0].longitude,
    "K"
  );

  return { props: { product: data[0], distance: Math.round(distance) } };
}

export default Product;

function calcDistance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
}
