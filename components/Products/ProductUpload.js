import { useRef, useState } from "react";
import supabase from "../../utils/supabaseClient";
import { useRouter } from "next/router";

function ProductUpload() {
  const [imageSrc, setImageSrc] = useState("");

  const productImg = useRef();
  const category = useRef();
  const productName = useRef();
  const description = useRef();
  const condition = useRef();
  const router = useRouter();

  async function handleProductSubmit(event) {
    event.preventDefault();

    const selectedProduct = productImg.current.files[0];
    const enteredCategory = category.current.value;
    const enteredProductName = productName.current.value.toLowerCase();
    const enteredDescription = description.current.value;
    const enteredCondition = condition.current.value;
    // const altText = `Image of Product ${selectedProduct.name}`;

    const formData = new FormData();
    formData.append("file", selectedProduct);
    formData.append("upload_preset", "vwz7spwe");

    // upload picture to cloudinary
    const API_ENDPOINT =
      "https://api.cloudinary.com/v1_1/streetcred/image/upload";
    const options = {
      method: "POST",
      body: formData,
    };
    const cloudinary = await fetch(API_ENDPOINT, options).then((response) => {
      console.log("picture is uploaded to cloudinary");
      return response.json();
    });

    // for image preview
    setImageSrc(cloudinary.secure_url);

    // insert products input to supabase
    const { data, error } = await supabase.from("products").insert([
      {
        name: enteredProductName,
        image: cloudinary.secure_url,
        description: enteredDescription,
        borrow_count: 0,
        category: enteredCategory,
        condition: enteredCondition,
      },
    ]);

    if (data) {
      console.log(data);
    } else if (error) {
      console.log(error.message);
    }

    // if user click submit then it will be redirected to product page
    router.push(`/products/${data[0].id}`);
  }

  function previewHandler(display) {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
    };
    reader.readAsDataURL(display.target.files[0]);
  }

  return (
    <div>
      <form encType="multipart/form-data" onSubmit={handleProductSubmit}>
        <div>
          <h2>Select a category</h2>

          <input
            type="radio"
            id="lend"
            name="category"
            value="lend"
            ref={category}
            // onChange={(event) => setCategory(event.target.value)}
          />
          <label htmlFor="lend">Lend</label>

          <input
            type="radio"
            id="pass-on"
            name="category"
            value="pass on"
            ref={category}
            // onChange={(event) => setCategory(event.target.value)}
          />
          <label htmlFor="pass-on">Pass on</label>

          <input
            type="radio"
            id="give-away"
            name="category"
            value="give away"
            ref={category}
            // onChange={(event) => setCategory(event.target.value)}
          />
          <label htmlFor="give-away">Give away</label>
        </div>

        <div>
          <label htmlFor="item-name">Product Name</label>
          <input
            type="text"
            id="item-name"
            name="item-name"
            ref={productName}
            // onChange={(event) => setProductName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="item-description">Description</label>
          <input
            type="text"
            placeholder="Tell us about this item."
            id="item-description"
            name="item-description"
            ref={description}
            // onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="condition">Item&apos;s condition:</label>
          <select
            name="condition"
            id="condition"
            ref={condition}
            // onChange={(event) => setCondition(event.target.value)}
          >
            <option value="poor">Poor</option>
            <option value="good">Good</option>
            <option value="brand new">Brand New</option>
          </select>
        </div>

        <div>
          <label htmlFor="item-img">Item Image</label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            id="item-img"
            name="item-img"
            ref={productImg}
            onChange={previewHandler}
          />
          <p>Preview:</p>
          <img
            src={imageSrc}
            alt="preview uploaded image"
            width={200}
            height={200}
          />
        </div>

        <div>
          <button type="submit" value="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductUpload;
