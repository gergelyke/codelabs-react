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
  const pageNodes = content.reduce((acc, current) => {
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

  console.log(content);

  const title = getParagraphText(titleNode);
  const headings = headingNodes.map(getParagraphText);
  const pages = pageNodes.map((page) => {
    return page.map((node) => {
      // we have text node, with possibly multiple elements
      if (node.paragraph) {
        const type = getParagraphType(node);
        const isListItem = getParagraphSpacingMode(node) === "COLLAPSE_LISTS";

        const pContent = node.paragraph.elements.map((element) => {
          if (!element.textRun) return null;
          return (
            <Text
              type={type}
              text={element.textRun.content}
              bold={element.textRun.textStyle && element.textRun.textStyle.bold}
            />
          );
        });

        return isListItem ? (
          <ul>
            <li>{pContent}</li>
          </ul>
        ) : (
          pContent
        );
      }
      return;
    });
  });

  return (
    <PageComponent
      title={title}
      navigationItems={headings}
      pages={pages}
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
  pages,
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
        <ContentComponent pages={pages} />
      </MainComponent>
    </div>
  );
}

function getParagraphText(node) {
  return (
    node.paragraph &&
    node.paragraph.elements[0].textRun &&
    node.paragraph.elements[0].textRun.content
  );
}

function getParagraphType(node) {
  return node.paragraph.paragraphStyle.namedStyleType;
}

function getParagraphSpacingMode(node) {
  return node.paragraph.paragraphStyle.spacingMode;
}

function Text({ bold, type, text, overrides = {} }) {
  if (type === "HEADING_2") {
    return <h2>{text}</h2>;
  }

  if (type === "HEADING_3") {
    return <h3>{text}</h3>;
  }

  if (type === "HEADING_4") {
    return <h4>{text}</h4>;
  }

  if (type === "HEADING_5") {
    return <h5>{text}</h5>;
  }

  if (type === "HEADING_6") {
    return <h6>{text}</h6>;
  }

  if (type === "NORMAL_TEXT") {
    return (
      <span
        style={{
          fontWeight: bold ? "800" : "400",
        }}
      >
        {text}
      </span>
    );
  }

  return null;
}

function findElements(content, type) {
  return content.filter(
    (node) =>
      node.paragraph && node.paragraph.paragraphStyle.namedStyleType === type
  );
}

export { Codelabs };
