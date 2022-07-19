import Head from "next/head";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Street Cred</title>
        <meta
          name="description"
          content="A website that helps people give away, borrow and lend things."
        />
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default Layout;
