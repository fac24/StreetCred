import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/auth";

import NavWeb from "./NavWeb";
import NavMobile from "./NavMobile";
import useViewport from "../Hooks/useViewport";

function Navbar(props) {
  const [visibility, setVisibility] = useState(true);
  const { user } = useAuthContext();
  const { width } = useViewport();
  const breakpoint = 620;
  const userId = user?.id;

  useEffect(() => {
    if (`${window.location.origin}/login`) {
      setVisibility(false);
    } else {
      setVisibility(false);
    }
  }, []);

  return width < breakpoint ? (
    <NavMobile user={userId} />
  ) : (
    <NavWeb user={userId} />
  );
}

export default Navbar;
