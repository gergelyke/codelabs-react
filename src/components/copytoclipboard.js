import React, { useState } from "react";

export function CopyToClipboard({
  children,
  copyContent,
  isHover = true,
  style = {},
}) {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div
      role="button"
      style={{
        ...{
          cursor: "pointer",
          padding: "3px",
          position: "absolute",
          right: "5px",
          top: "5px",
          opacity: isHover ? 1 : 0,
          transition: "all .3s",
        },
        ...style,
      }}
      onClick={(evt) => {
        setIsCopied(true);
        // Dereference the string differently depending on if it's a multi-line
        // codebox vs a snippet.
        const text =
          typeof copyContent === "string" ? copyContent : copyContent[0];
        navigator.clipboard?.writeText(text);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      }}
    >
      {isCopied ? "Copied" : "Copy"}
    </div>
  );
}
