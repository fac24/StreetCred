import Image from "next/image";
import logo from "../../public/full-logo.svg";
import illust1 from "../../public/illustrations/woman-globe.svg";
import illust2 from "../../public/illustrations/people-web.svg";
import illust3 from "../../public/illustrations/house-hopping.svg";
// import { BiLeftArrowCircle } from "react-icons/bi";
import Link from "next/link";

function LandingWeb() {
  return (
    <>
      <header className="header">
        <div className="logo-div">
          <Image
            src={logo}
            alt="StreetCred logo"
            layout="intrinsic"
            className="logo"
          />
        </div>
        <nav>
          <Link href="/login">
            <a className="web-login-button">Log in or sign up</a>
          </Link>
        </nav>
      </header>

      <section className="about-section">
        <div className="about-div about-div1">
          <div className="about-text">
            <h2>Exchange items and build-up your Street Cred</h2>
            <p>
              Extend the life of items and waste less! Share from house to house
              and build up points for sharing.
            </p>
          </div>
          <Image
            src={illust1}
            alt="women holding the globe"
            width={400}
            height={400}
            /* layout="intrinsic" */
            className="illust illust1"
          />
        </div>

        <div className="about-div about-div2">
          <Image
            src={illust2}
            alt="people connected on the web"
            width={400}
            height={400}
            /* layout="intrinsic" */
            className="illust illust2"
          />
          <div className="about-text">
            <h2>
              Set up a group for your local area, and invite others to join.{" "}
            </h2>
            <p>
              Groups are initially based on location but anyone can join groups.
              Groups can be public and private. Invite friends to join to share
              more.
            </p>
          </div>
        </div>

        <div className="about-div about-div3">
          <div className="about-text">
            <h2>Post items in your group that others can share.</h2>
            <p>
              Add items that you want to lend to others. Request items from
              others and build up the collective of your group.
            </p>
          </div>
          <Image
            src={illust3}
            alt="street with houses"
            /* layout="intrinsic" */
            width={500}
            height={250}
            className="illust illust3"
          />
        </div>
        {/*         <button>
          <BiLeftArrowCircle />
        </button> */}
      </section>
    </>
  );
}

export default LandingWeb;
