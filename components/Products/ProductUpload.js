import { useEffect, useRef, useState } from "react";
import supabase from "../../utils/supabaseClient";
import { useRouter } from "next/router";
import Link from "next/link";
import { BsArrowLeftCircle } from "react-icons/bs";

function ProductUpload(props) {
  const [imageSrc, setImageSrc] = useState("");
  const [group, setGroup] = useState("");

  useEffect(() => {
    const storage = localStorage.getItem("group");
    const initialValue = JSON.parse(storage);
    setGroup(initialValue || "");
    console.log(initialValue);
  }, [group]);

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
    const groupId = group;
    // const altText = `Image of Product ${selectedProduct.name}`;

    const formData = new FormData();
    formData.append("file", selectedProduct);
    formData.append("upload_preset", "product");

    // upload picture to cloudinary
    const API_ENDPOINT =
      "https://api.cloudinary.com/v1_1/streetcred/image/upload";
    const options = {
      method: "POST",
      body: formData,
    };
    const cloudinary = await fetch(API_ENDPOINT, options).then((response) => {
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
        group: groupId,
      },
    ]);

    if (data) {
      console.log("uploaded");
    } else if (error) {
      console.log(error.message);
    }

    localStorage.removeItem("group");

    // if user click submit then it will be redirected to group page
    router.push(`/groups/${groupId}`);
  }

  function previewHandler(display) {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
    };
    reader.readAsDataURL(display.target.files[0]);
  }

  function backToGroups() {
    localStorage.removeItem("group");
  }

  return (
    <main className="upload-section">
      <Link href={`/groups/${group}`}>
        <a onClick={backToGroups} className="back-to-pages-button">
          <BsArrowLeftCircle />
          <span>Back to the group</span>
        </a>
      </Link>
      <h2>Upload a product</h2>
      <div className="forms-div">
        <form
          encType="multipart/form-data"
          onSubmit={handleProductSubmit}
          className="upload-form"
        >
          <p id="select-category-label">Select a category*</p>
          <div className=" bullet-inputs">
            <div>
              <input
                type="radio"
                id="lend"
                name="category"
                value="lend"
                ref={category}
              />
              <label htmlFor="lend">Lend</label>
            </div>
            <div>
              <input
                type="radio"
                id="pass-on"
                name="category"
                value="pass on"
                ref={category}
              />
              <label htmlFor="pass-on">Pass on</label>
            </div>
            <div>
              <input
                type="radio"
                id="give-away"
                name="category"
                value="give away"
                ref={category}
              />
              <label htmlFor="give-away">Give away</label>
            </div>
          </div>

          <div className="form-div">
            <label htmlFor="item-name">Product Name*</label>
            <input
              type="text"
              id="item-name"
              name="item-name"
              required
              ref={productName}
            />
          </div>

          <div className="form-div">
            <label htmlFor="item-description">Description*</label>
            <textarea
              placeholder="Tell us about this item."
              id="item-description"
              name="item-description"
              ref={description}
              required
            />
          </div>

          <div className="form-div">
            <label htmlFor="condition">Item&apos;s condition*</label>
            <select
              name="condition"
              id="condition"
              ref={condition}
              required
              className="select-input-field"
            >
              <option value="poor">Poor</option>
              <option value="good">Good</option>
              <option value="brand new">Brand New</option>
            </select>
          </div>

          <div className="form-div">
            <label htmlFor="item-img">Product image*</label>
            <div className="form-div-avatar">
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                id="group-avatar"
                name="item-img"
                ref={productImg}
                onChange={previewHandler}
                required
              />
              <div className="form-div">
                <img
                  src={imageSrc ? imageSrc : "/only-logo.svg"}
                  alt="preview uploaded image"
                  className="img-preview"
                />
              </div>
            </div>
          </div>
          <button type="submit" value="submit">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}

export default ProductUpload;
