import React from "react";

import { CopyToClipboard } from "./components/copytoclipboard";
import { OnPageNavigation } from "./components/onpagenavigation";

export function Header({ title }) {
  return (
    <header
      style={{
        padding: "10px",
        fontWeight: 800,
        fontSize: "32px",
      }}
    >
      {title}
    </header>
  );
}

export function SideNavigation({ items, setPage }) {
  return (
    <nav
      style={{
        width: "200px",
      }}
    >
      <ul>
        {items.map((item, index) => (
          <li key={item}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage(index);
              }}
              onKeyDown={(e) => {
                e.key === "Enter" && setPage(index);
              }}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Content({ children }) {
  return (
    <section
      style={{
        flex: 1,
        maxWidth: "600px",
      }}
    >
      {children}
    </section>
  );
}

export function Main({ children }) {
  return (
    <>
      <main
        style={{
          display: "flex",
        }}
      >
        {children}
      </main>
    </>
  );
}

export function H1({ children }) {
  return <h1>{children}</h1>;
}

export function H2({ id, children }) {
  return <h2 id={id}>{children}</h2>;
}

export function H3({ id, children }) {
  return <h3 id={id}>{children}</h3>;
}

export function H4({ id, children }) {
  return <h4 id={id}>{children}</h4>;
}

export function H5({ id, children }) {
  return <h5 id={id}>{children}</h5>;
}

export function H6({ id, children }) {
  return <h6 id={id}>{children}</h6>;
}

export function Paragraph({ children }) {
  return <p>{children}</p>;
}

export function ListItem({ children, magnitude }) {
  return (
    <ul style={{ marginLeft: `${magnitude - 36}px` }}>
      <li>{children}</li>
    </ul>
  );
}

export function ButtonLink({ children, href }) {
  return (
    <a
      target="_blank"
      href={href}
      style={{
        border: "1px solid #777",
        background: "#ddd",
        padding: "10px",
      }}
    >
      {children}
    </a>
  );
}

export function Button({ disabled, children, onClick }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export function Link({ children, href }) {
  return (
    <a target="_blank" href={href}>
      {children}
    </a>
  );
}

export function Snippet({ children }) {
  return (
    <div style={{ position: "relative" }}>
      <CopyToClipboard copyContent={children} />
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}

export function CodeBox({ children }) {
  return (
    <div style={{ position: "relative" }}>
      <CopyToClipboard copyContent={children} />
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}

export function InfoBox({ children }) {
  return (
    <div
      style={{
        backgroundColor: "#90EE90",
        padding: "20px",
      }}
    >
      {children}
    </div>
  );
}

export function WarningBox({ children }) {
  return (
    <div
      style={{
        backgroundColor: "#fed8b1",
        padding: "20px",
      }}
    >
      {children}
    </div>
  );
}

export function Img({ src }) {
  return <img width="100%" src={src} />;
}

export function IFrame({ src }) {
  return (
    <div>
      <div style={{ position: "relative", paddingTop: "56.25%" }}>
        {/* https://jameshfisher.com/2017/08/30/how-do-i-make-a-full-width-iframe/ */}
        <iframe
          src={src}
          frameborder="0"
          allowfullscreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
}

export { CopyToClipboard, OnPageNavigation };
