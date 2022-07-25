import { useState, useEffect } from "react";
import CurrentLocation from "../components/CurrentLocation/CurrentLocation";
import { useRouter } from "next/router";
import { Link } from "next/link";
import supabase from "../utils/supabaseClient";
import "../styles/Home.module.css";
import LandingWeb from "../components/About/LandingWeb";
import LandingMobile from "../components/About/LandingMobile";
import useViewport from "../components/Hooks/useViewport";

function Home({ props }) {
  const { width } = useViewport();
  const breakpoint = 620;
  const [userId, setUserId] = useState();
  const [userData, setUserData] = useState();
  const user = supabase.auth.user();

  // useEffect(() => {
  //   for (const key in user) {
  //     if (key == "id") {
  //       setUserId(user[key]);
  //     }
  //     // console.log(`${key}: ${user[key]}`);
  //   }

  //   async function getLoc() {
  //     const { data, error } = await supabase
  //       .from("profiles")
  //       .select()
  //       .eq("id", userId);

  //     setUserData(data[0].location);
  //   }

  //   getLoc();
  // }, []);

  // check supabase currentuser location
  //1 if they have location
  // render the group they have joined

  //2 if they dont' have location
  // redirect them to profile setting page

  return width < breakpoint ? <LandingMobile /> : <LandingWeb />;
}

export default Home;
