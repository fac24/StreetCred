import { useState } from "react";
import supabase from "../../utils/supabaseClient";

function CurrentLocation(props) {
  const [locError, setLocError] = useState(false);
  const [postcode, setPostcode] = useState("");
  const [distance, setDistance] = useState(0);
  const [lon, setLon] = useState(0);
  const [lat, setLat] = useState(0);

  async function handleSearchFromLocation(pos) {
    //extracts longitude and latitude from geolocation info from locator function
    const coordinates = pos.coords;
    let lat = coordinates.latitude;
    let lon = coordinates.longitude;

    // let { data, error } = await supabase.rpc("searchGroupsByLocation", {
    //   lat_param: 51.525881,
    //   lon_param: -0.357245,
    //   radius_param: 1000000,
    // });

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

  //get's location of user's device

  function locator() {
    setLocError(false);
    navigator.geolocation.getCurrentPosition(
      handleSearchFromLocation,
      geoError
    );
  }
  return (
    <>
      <input
        type="search"
        placeholder="Enter your postcode or area"
        value={postcode}
        onChange={(event) => setPostcode(event.target.value)}
      ></input>
      <button type="button" onClick={locator}>
        Use my current postcode
      </button>
    </>
  );
}
export default CurrentLocation;