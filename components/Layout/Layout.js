import Head from "next/head";
import { useState } from "react";

function Layout({ children }) {
  const [authenticatedState, setAuthenticatedState] =
    useState("not-authenticated");

  return (
    <>
      <Head>
        <title>Street Cred</title>
        <meta
          name="description"
          content="A website that helps people give away, borrow and lend things."
        />
      </Head>

      <main className="margin-top">{children}</main>
    </>
  );
}

export default Layout;
