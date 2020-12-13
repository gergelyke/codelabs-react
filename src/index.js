import React from "react";

function Codelabs({ source, overrides = {} }) {
  if (!source) throw new Error("Missing property: source");

  const PageComponent = overrides.Page || Page;
  const HeaderComponent = overrides.Header || Header;
  const SideNavigationComponent = overrides.SideNavigation || SideNavigation;
  const ContentComponent = overrides.Content || Content;

  const title = findElements(source.content, "TITLE");
  const headings = findElements(source.content, "HEADING_1");

  return (
    <PageComponent
      overrides={{
        HeaderComponent,
        SideNavigationComponent,
        ContentComponent,
      }}
    />
  );
}

function Page({
  overrides: { HeaderComponent, SideNavigationComponent, ContentComponent },
}) {
  return (
    <div>
      <HeaderComponent />
      <div>
        <SideNavigationComponent />
        <ContentComponent />
      </div>
    </div>
  );
}

function Header({}) {
  return <span>I am the Header</span>;
}

function SideNavigation({}) {
  return <nav>I am the SideNavigation</nav>;
}

function Content({}) {
  return <nav>I am the ContentComponent</nav>;
}

function findElements(content, type) {
  return content.filter(
    (node) =>
      node.paragraph && node.paragraph.paragraphStyle.namedStyleType === type
  );
}

export { Codelabs };
