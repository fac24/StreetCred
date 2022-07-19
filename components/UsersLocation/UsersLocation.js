// import React from "react";

function UsersLocation() {
  //   const [locError, setLocError] = useState(false);

  //   function geoError(err) {
  //     setLocError(true);
  //     console.warn(`ERROR(${err.code}): ${err.message}`);
  //     return;
  //   }

  //   //get's location of user's device and takes success and error callback functions as parameters
  //   function locator() {
  //     setLocError(false);
  //     navigator.geolocation.getCurrentPosition(
  //       handleSearchFromLocation,
  //       geoError
  //     );
  // onClick={locator}
  return (
    <>
      <button type="button">use current location</button>
    </>
  );
}

export default UsersLocation;
