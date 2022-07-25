import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import illust1 from "../../public/illustrations/users-phone.svg";
import illust2 from "../../public/illustrations/woman-box.svg";
import illust3 from "../../public/illustrations/house-hopping.svg";

function LandingMobile() {
  const [is1Shown, setIs1Shown] = useState(true);
  const [is2Shown, setIs2Shown] = useState(false);
  const [is3Shown, setIs3Shown] = useState(false);

  function handleClick(event) {
    if (is1Shown) {
      setIs1Shown(false);
      setIs2Shown(true);
    } else if (setIs2Shown) {
      setIs2Shown(false);
      setIs3Shown(true);
    }
  }

  return (
    <div className="landing-mobile">
      <section className="carousel-section">
        {is1Shown && (
          <div className="mob-about-div mob-about-div1">
            <Image
              src={illust1}
              alt="people connected on the web"
              width={340}
              height={340}
              /* layout="intrinsic" */
              className="mob-illust mob-illust1"
            />
            <div className="mob-about-text">
              <h2>
                Set up a group for your local area, and invite others to join.
              </h2>
              <p>
                Groups are initially based on location but anyone can join
                groups. Groups can be public and private. Invite friends to join
                to share more.
              </p>
            </div>

            <div className="status-bar">
              <span>&#9679;</span>
              <span className="grey-dot">&#9679;</span>
              <span className="grey-dot">&#9679;</span>
            </div>
          </div>
        )}

        {is2Shown && (
          <div className="mob-about-div mob-about-div2">
            <Image
              src={illust2}
              alt="people connected on the web"
              width={300}
              height={300}
              /* layout="intrinsic" */
              className="mob-illust mob-illust2"
            />
            <div className="mob-about-text">
              <h2>Post items in your group that others can share.</h2>
              <p>
                Add items that you want to lend to others. Request items from
                others and build up the collective of your group.
              </p>
            </div>
            <div className="status-bar">
              <span className="grey-dot">&#9679;</span>
              <span>&#9679;</span>
              <span className="grey-dot">&#9679;</span>
            </div>
          </div>
        )}

        {is3Shown && (
          <div className="mob-about-div mob-about-div3">
            <Image
              src={illust3}
              alt="people connected on the web"
              width={320}
              height={320}
              /* layout="intrinsic" */
              className="mob-illust mob-illust3"
            />
            <div className="mob-about-text">
              <h2>Exchange items and build-up your Street Cred</h2>
              <p>
                Extend the life of items and waste less! Share from house to
                house and build up points for sharing.
              </p>
            </div>
            <div className="status-bar">
              <span className="grey-dot">&#9679;</span>
              <span className="grey-dot">&#9679;</span>
              <span>&#9679;</span>
            </div>
          </div>
        )}
      </section>

      <section className="control-section">
        {!is3Shown && (
          <button className="landing-next-button" onClick={handleClick}>
            Next
          </button>
        )}
        <Link href="/login">
          <a>Continue to login</a>
        </Link>
      </section>
    </div>
  );
}

export default LandingMobile;
