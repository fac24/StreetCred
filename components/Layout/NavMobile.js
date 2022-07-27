import Link from "next/link";
import { MdOutlineGroups } from "react-icons/md";
import { TbMessages } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";

function NavMobile(props) {
  return (
    <nav className="navigation-mobile">
      <Link href="/groups">
        <a className="mobile-menu-item">
          <MdOutlineGroups className="mobile-menu-icon" />
          <span>Groups</span>
        </a>
      </Link>

      <Link href="/messages">
        <a className="mobile-menu-item">
          <TbMessages className="mobile-menu-icon" />
          <span>Messages</span>
        </a>
      </Link>

      <Link href={`/profiles/${props.user}`}>
        <a className="mobile-menu-item">
          <CgProfile className="mobile-menu-icon" />
          <span>Profile</span>
        </a>
      </Link>
    </nav>
  );
}

export default NavMobile;
