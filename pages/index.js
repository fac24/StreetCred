import CurrentLocation from "../components/CurrentLocation/CurrentLocation";

function Home() {
  return (
    <>
      <label htmlFor="search-location">Where do you live?</label>
      <CurrentLocation />
    </>
  );
}

export default Home;
