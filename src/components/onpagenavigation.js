import React, { useState } from "react";

export function OnPageNavigation({ items, currentPage }) {
  const render = (pageItems) => {
    return (
      <ul>
        {pageItems.map((item, index) => (
          <li key={item}>
            <a href={item.itemId}>{item.title}</a>
            {item.subNav ? render(item.subNav) : ""}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav
      style={{
        width: "200px",
      }}
    >
      {render(items[currentPage])}
    </nav>
  );
}
