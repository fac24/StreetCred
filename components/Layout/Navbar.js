import NavWeb from "./NavWeb";
import NavMobile from "./NavMobile";
import useViewport from "../Hooks/useViewport";
import { useAuthContext } from "../../context/auth";

function Navbar(props) {
  const { user } = useAuthContext();
  const { width } = useViewport();
  const breakpoint = 620;
  const userId = user?.id;

  console.log(userId);

  return width < breakpoint ? (
    <NavMobile user={userId} />
  ) : (
    <NavWeb user={userId} />
  );
}

export default Navbar;
