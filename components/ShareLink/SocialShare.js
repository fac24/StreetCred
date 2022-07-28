import React, { useEffect, useState } from "react";

import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
} from "next-share";

function SocialShare() {
  const [url, setURL] = useState("");

  useEffect(() => {
    setURL(window.location.href);
  }, []);

  return (
    <div className="flexbox">
      <p>Share the item with your friends!</p>

      <div>
        <FacebookShareButton url={url}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>

      <div>
        <WhatsappShareButton url={url}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>

      <div>
        <TwitterShareButton url={url}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>

      <div>
        <EmailShareButton url={url}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
    </div>
  );
}

export default SocialShare;
