import React from "react";

import { Header, SideNavigation, Content, Main } from "./components";

function Codelabs({ content, overrides = {} }) {
  if (!content) throw new Error("Missing property: content");

  const PageComponent = overrides.Page || Page;
  const HeaderComponent = overrides.Header || Header;
  const SideNavigationComponent = overrides.SideNavigation || SideNavigation;
  const ContentComponent = overrides.Content || Content;
  const MainComponent = overrides.Main || Main;

  const titleNode = findElements(content, "TITLE")[0];
  const headingNodes = findElements(content, "HEADING_1");

  const title = getParagraphText(titleNode);
  const headings = headingNodes.map(getParagraphText);

  const pages = content.reduce((acc, current) => {
    const { startIndex = 0 } = current;
    for (let i = headingNodes.length - 1; i > 0; i -= 1) {
      if (startIndex > headingNodes[i].startIndex) {
        acc[i] = acc[i] || [];
        acc[i].push(current);
        break;
      }
    }
    return acc;
  }, []);

  return (
    <PageComponent
      title={title}
      navigationItems={headings}
      overrides={{
        HeaderComponent,
        SideNavigationComponent,
        ContentComponent,
        MainComponent,
      }}
    />
  );
}

function Page({
  title,
  navigationItems,
  overrides: {
    HeaderComponent,
    SideNavigationComponent,
    ContentComponent,
    MainComponent,
  },
}) {
  return (
    <div>
      <HeaderComponent title={title} />
      <MainComponent>
        <SideNavigationComponent items={navigationItems} />
        <ContentComponent />
      </MainComponent>
    </div>
  );
}

function getParagraphText(node) {
  return node.paragraph.elements[0].textRun.content;
}

function findElements(content, type) {
  return content.filter(
    (node) =>
      node.paragraph && node.paragraph.paragraphStyle.namedStyleType === type
  );
}

export { Codelabs };
