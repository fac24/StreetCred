import Head from "next/head";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Street Cred</title>
        <meta
          name="description"
          content="a website that helps people give away, borrow and lend things"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <header></header>
      <main>{children}</main>
    </>
  );
}
export default { Layout };
