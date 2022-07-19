import { useState } from "react";

function UsersLocation() {
  const [locError, setLocError] = useState(false);
  const [postcode, setPostcode] = useState("");
  async function handleSearchFromLocation(pos) {
    //extracts longitude and latitude from geolocation info from locator function
    const crd = pos.coords;
    let lat = crd.latitude;
    let lon = crd.longitude;

    //uses postcodes API to convert user's coordinates to a postcode
    const postcode = await fetch(
      `https://api.postcodes.io/postcodes?lon=${lon}&lat=${lat}`
    );

    const postJson = await postcode.json();
    let userPostcode = postJson.result[0].postcode;
    console.log(userPostcode.slice(0, 3));
    setPostcode(userPostcode);
  }

  function geoError(err) {
    setLocError(true);
    console.warn(`ERROR(${err.code}): ${err.message}`);
    return;
  }

  //get's location of user's device and takes success and error callback functions as parameters

  function locator() {
    setLocError(false);
    navigator.geolocation.getCurrentPosition(
      handleSearchFromLocation,
      geoError
    );
  }
  return (
    <>
      <label htmlFor="search-location">Where do you live?</label>
      <input
        type="search"
        placeholder="Enter your postcode or area"
        value={postcode}
        onChange={(event) => setPostcode(event.target.value)}
      ></input>
      <button type="button" onClick={locator}>
        Use my current location
      </button>
    </>
  );
}

export default UsersLocation;
