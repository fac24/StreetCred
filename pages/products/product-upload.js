import ProductUpload from "../../components/Products/ProductUpload";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import React from "react";

//write an 'upload' function to handle the uploaded item
//set state => productImg, setProductImg
//async function that takes the inputs from the upload
//from 'products' table in supabase, insert the new input
//return data
//router.push to product page

function Upload(props) {
  const [groupId, setGroupId] = useState();

  const router = useRouter();

  useEffect(() => {
    setGroupId(router.query.groupId);
  }, [router.query]);

  return <ProductUpload groupId={groupId} />;
}

export default Upload;
