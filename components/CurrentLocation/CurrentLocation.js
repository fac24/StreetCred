import { useState } from "react";
import supabase from "../../utils/supabaseClient";

function CurrentLocation(props) {
  const [locError, setLocError] = useState(false);
  const [postcode, setPostcode] = useState("");
  const [distance, setDistance] = useState(0);
  // const [lon, setLon] = useState(0);
  // const [lat, setLat] = useState(0);

  async function handleSearchFromLocation(pos) {
    //extracts longitude and latitude from geolocation info from locator function
    const coordinates = pos.coords;
    let lat = coordinates.latitude;
    let lon = coordinates.longitude;

    //uses postcodes API to convert user's coordinates to a postcode
    const postcode = await fetch(
      `https://api.postcodes.io/postcodes?lon=${lon}&lat=${lat}`
    );

    const postJson = await postcode.json();
    let userPostcode = postJson.result[0].postcode;
    setPostcode(userPostcode);
    if (props.postcode) {
      props.postcode(userPostcode);
    }
  }

  function geoError(err) {
    setLocError(true);
    console.warn(`ERROR(${err.code}): ${err.message}`);
    return;
  }

  //react on user input to send postcode to the parent
  function updatePostcode(postcode) {
    setPostcode(postcode);
    props.postcode(postcode);
  }

  //get's location of user's device

  function locator() {
    setLocError(false);
    navigator.geolocation.getCurrentPosition(
      handleSearchFromLocation,
      geoError
    );
  }
  return (
    <div id="item-name">
      <input
        type="search"
        placeholder="Enter your postcode..."
        value={props.value ? props.value : postcode}
        onChange={(event) => updatePostcode(event.target.value)}
        className="margin-bottom"
      ></input>
      <button type="button" onClick={locator}>
        Use my current location
      </button>
    </div>
  );
}
export default CurrentLocation;
