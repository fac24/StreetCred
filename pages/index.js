import "../styles/Home.module.css";
import LandingWeb from "../components/About/LandingWeb";
import LandingMobile from "../components/About/LandingMobile";
import useViewport from "../components/Hooks/useViewport";
import { useEffect } from "react";

function Home() {
  const { width } = useViewport();
  const breakpoint = 620;

  return width < breakpoint ? <LandingMobile /> : <LandingWeb />;
}

export default Home;
