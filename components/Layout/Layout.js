import Head from "next/head";
import { useState } from "react";
import useViewport from "../Hooks/useViewport";

function Layout({ children }) {
  const { width } = useViewport();
  const breakpoint = 620;

  return (
    <>
      <Head>
        <title>Street Cred</title>
        <meta
          name="description"
          content="A website that helps people give away, borrow and lend things."
        />
      </Head>

      {width < breakpoint ? (
        <main className="mobile-margin">{children}</main>
      ) : (
        <main className="web-margin">{children}</main>
      )}
    </>
  );
}

export default Layout;
