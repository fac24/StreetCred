import ProductUpload from "../components/Products/ProductUpload";
import { useState, useRouter } from "next/router";

//write an 'upload' function to handle the uploaded item
//set state => productImg, setProductImg
//async function that takes the inputs from the upload
//from 'products' table in supabase, insert the new input
//return data
//router.push to page

function upload() {
    const [productName, setProductName] = useState("");
    const [productInput, setProductInput] = useState("");
    

    async function addProduct(inputs) {
        setProductInput(inputs);
        const {data, error } = await supabase
        .from("products")
        .insert([
            {
                selectedProduct:
                enteredCategory:
                enteredProductName:
                enteredDescription:
                enteredCondition:
            }
        ])
    }
    return (
        <ProductUpload />
    )
}

export default upload;