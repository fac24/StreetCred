import "../styles/globals.css";
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps}></Component>
    </>
  );
}

export default MyApp;
