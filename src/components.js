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
    <nav style={{
      width: '200px'
    }}>
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

export function Content({}) {
  return <section style={{
    flex: 1
  }}>I am the ContentComponent</section>;
}

export function Main({ children }) {
  return <main style={{
    display: 'flex'
  }}>{children}</main>;
}
