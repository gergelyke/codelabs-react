import React from "react";

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

export function SideNavigation({ items }) {
  return (
    <nav
      style={{
        width: "200px",
      }}
    >
      <ul>
        {items.map((item, index) => (
          <li key={item}>
            <a href={`#${index}`}>{item}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Content({ pages }) {
  return (
    <section
      style={{
        flex: 1,
      }}
    >
      {pages.map((page) => {
        return page;
      })}
    </section>
  );
}

export function Main({ children }) {
  return (
    <main
      style={{
        display: "flex",
      }}
    >
      {children}
    </main>
  );
}

export function H2({ children }) {
  return <h2>{children}</h2>;
}

export function H3({ children }) {
  return <h3>{children}</h3>;
}

export function H4({ children }) {
  return <h4>{children}</h4>;
}

export function H5({ children }) {
  return <h5>{children}</h5>;
}

export function H6({ children }) {
  return <h6>{children}</h6>;
}

export function Span({ children }) {
  return <span>{children}</span>;
}

export function Button({ children, href }) {
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
