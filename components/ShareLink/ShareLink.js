import React, { useState } from "react";

function ShareLink() {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
  }

  return (
    <div className="share-link">
      <button className="open-group-button" onClick={copy}>
        {!copied ? "Copy Link" : "Link Copied!"}
      </button>
    </div>
  );
}

export default ShareLink;
