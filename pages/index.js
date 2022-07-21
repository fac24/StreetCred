import { useState } from "react";
import CurrentLocation from "../components/CurrentLocation/CurrentLocation";
import supabase from "../utils/supabaseClient.js";
import { useRouter } from "next/router";
import { Link } from "next/link";

function Home() {
  return (
    <>
      <label htmlFor="search-location">Where do you live?</label>
      <CurrentLocation />
    </>
  );
}

export default Home;
