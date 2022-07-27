import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import supabase from "../../utils/supabaseClient";

import logo from "../../public/full-logo.svg";
import illust1 from "../../public/illustrations/woman-globe.svg";
import illust2 from "../../public/illustrations/people-web.svg";
import illust3 from "../../public/illustrations/house-hopping.svg";
import mobileView from "../../public/street-cred-mobile-view.png";
import LandingNav from "../Layout/LandingNav";
import { useAuthContext } from "../../context/auth";

function LandingWeb() {
  const { user } = useAuthContext();

  return (
    <>
      {!user && <LandingNav />}
      <section className="about-section">
        <div className="about-div about-div1">
          <div className="about-text">
            <h2 id="section-title-1">
              Exchange items and build-up your Street Cred
            </h2>
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
              Set up a group for your local area, and invite others to join.
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

        <div className="about-div about-div4">
          <Image
            src={mobileView}
            alt="mobile preview of the app"
            /* layout="intrinsic" */
            width={400}
            height={400}
            className="illust illust3"
          />
          <div className="about-text">
            <h2 className="about-text-title">
              <span>Start sharing.</span>
              <span>Start caring.</span>
            </h2>
            <p>
              Access Street Cred through the app. Manage items and exchange with
              your neighbours.
            </p>
            <Link href="/login">
              <button className="web-login-button about-text-button">
                Sign up now
              </button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="logo-div">
          <Link href="/">
            <Image
              src={logo}
              alt="StreetCred logo"
              layout="intrinsic"
              className="logo"
            />
          </Link>
        </div>
      </footer>
    </>
  );
}

export default LandingWeb;
