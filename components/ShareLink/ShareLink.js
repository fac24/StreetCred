import React, { useState } from "react";

export default function ShareLink() {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
  }

  return (
    <div className="share-link">
      <button onClick={copy}>{!copied ? "Copy Link" : "Copied!"}</button>
    </div>
  );
}

