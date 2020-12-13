import React from "react";

export function Header({ title }) {
  return (
    <header
      style={{
        padding: "10px",
        background: "#ddd",
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
  console.log(pages);
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
