import { useEffect, useState } from "react";
import supabase from "../../utils/supabaseClient";

function ProductAvailability(props) {
  const [availability, setAvailability] = useState(props.availability);
  const [buttonVisibility, setButtonVisibility] = useState(false);
  const owner = props.productOwner;
  const user = supabase.auth.user();

  useEffect(() => {
    setAvailability(props.availability);

    if (owner === user.id) {
      setButtonVisibility(true);
    }
  }, []);

  async function toggleAvaibility() {
    const { data, error } = await supabase
      .from("products")
      .update({ availability: !availability })
      .match({ id: props.producId });

    setAvailability((state) => !state);
  }

  return (
    <div className="flexbox">
      {availability ? (
        <p className="product-available availability-tag width-10rem">
          Available
        </p>
      ) : (
        <p className="product-unavailable unavailable-tag width-10rem">
          Unavailable
        </p>
      )}
      {buttonVisibility && (
        <button
          className="open-group-button margin-bottom-sm"
          onClick={toggleAvaibility}
        >
          {availability ? "Set to unavailable" : "Set to available"}
        </button>
      )}
    </div>
  );
}

export default ProductAvailability;
