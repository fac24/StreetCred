import ProductUpload from "../components/Products/ProductUpload";
import { useState, useRouter } from "next/router";

//write an 'upload' function to handle the uploaded item
//set state => productImg, setProductImg
//async function that takes the inputs from the upload
//from 'products' table in supabase, insert the new input
//return data
//router.push to page

function upload() {


  
  return <ProductUpload />;
}

export default upload;




// export async function getServerSideProps(context) {
//   const user = (await supabase.auth.api.getUserByCookie(context.req)) || [];

//   const { data, error } = await supabase
//     .from("arts")
//     .select()
//     .eq("email", user.user.email);

//   if (!user.user) {
//     return { props: {}, redirect: { destination: "/login" } };
//   }

//   return {
//     props: {
//       arts: data,
//       user: user.user,
//     },
//   };
// }