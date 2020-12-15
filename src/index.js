import React, { useState } from "react";

import {
  Header,
  SideNavigation,
  Content,
  Main,
  H2,
  H3,
  H4,
  H5,
  H6,
  Span,
  ButtonLink,
  Snippet,
  Link,
  InfoBox,
  WarningBox,
  CodeBox,
} from "./components";

import Extract from "./extract";
import Utils from "./utils";

// TODO: this function is a mess, need to break it apart
export function Codelabs({ content, overrides = {} }) {
  if (!content) throw new Error("Missing property: content");

  const [page, setPage] = useState(0);

  const PageComponent = overrides.Page || Page;
  const HeaderComponent = overrides.Header || Header;
  const SideNavigationComponent = overrides.SideNavigation || SideNavigation;
  const ContentComponent = overrides.Content || Content;
  const MainComponent = overrides.Main || Main;
  const H2Component = overrides.H2 || H2;
  const H3Component = overrides.H3 || H3;
  const H4Component = overrides.H4 || H4;
  const H5Component = overrides.H5 || H5;
  const H6Component = overrides.H6 || H6;
  const SpanComponent = overrides.Span || Span;
  const ButtonLinkComponent = overrides.ButtonLink || ButtonLink;
  const SnippetComponent = overrides.Snippet || Snippet;
  const LinkComponent = overrides.Link || Link;
  const InfoBoxComponent = overrides.InfoBox || InfoBox;
  const WarningBoxComponent = overrides.WarningBox || WarningBox;
  const CodeBoxComponent = overrides.CodeBox || CodeBox;

  const Text = TextFactory({
    H2Component,
    H3Component,
    H4Component,
    H5Component,
    H6Component,
    SpanComponent,
    ButtonLinkComponent,
  });

  const titleNode = Extract.extractTitleNode(content);
  const headingNodes = Extract.extractHeadingNodes(content);
  const pageNodes = Extract.extractPageNodes(content);

  const title = Utils.getParagraphText(titleNode);
  const headings = headingNodes
    .map(Utils.getParagraphText)
    .filter((heading) => heading);

  function processParagraphElements({ type }) {
    return function ({ textRun }) {
      if (!textRun) return null;

      if (Utils.isButton(textRun)) {
        return (
          <p>
            <ButtonLinkComponent href={textRun.textStyle.link.url}>
              {textRun.content}
            </ButtonLinkComponent>
          </p>
        );
      }

      if (Utils.isCommandLineSnippet(textRun)) {
        return (
          <p>
            <SnippetComponent>{textRun.content}</SnippetComponent>
          </p>
        );
      }

      if (Utils.isLink(textRun)) {
        return (
          <LinkComponent href={textRun.textStyle.link.url}>
            {textRun.content}
          </LinkComponent>
        );
      }

      return (
        <Text type={type} text={textRun.content} bold={Utils.isBold(textRun)} />
      );
    };
  }

  const pages = pageNodes.map((page) => {
    return page.map((node) => {
      // we have text node, with possibly multiple elements
      if (node.paragraph) {
        // we can run into a few special cases based on type or other properties
        const type = Utils.getParagraphType(node);

        const pContent = node.paragraph.elements.map(
          processParagraphElements({ type })
        );

        if (Utils.getParagraphSpacingMode(node) === "COLLAPSE_LISTS") {
          return (
            <ul>
              <li>{pContent}</li>
            </ul>
          );
        }

        return pContent;
      }

      // we might have a codeblock, info or warning boxes
      // they are all tables with the dimension 1x1
      if (node.table) {
        if (Utils.isInfoBox(node.table)) {
          const pContent = node.table.tableRows[0].tableCells[0].content[0].paragraph.elements.map(
            processParagraphElements({ type: "NORMAL_TEXT" })
          );
          return <InfoBoxComponent>{pContent}</InfoBoxComponent>;
        }

        if (Utils.isWarningBox(node.table)) {
          const pContent = node.table.tableRows[0].tableCells[0].content[0].paragraph.elements.map(
            processParagraphElements({ type: "NORMAL_TEXT" })
          );
          return <WarningBoxComponent>{pContent}</WarningBoxComponent>;
        }

        if (Utils.isCodeBox(node.table)) {
          return (
            <CodeBoxComponent>
              {Utils.getCode(node.table.tableRows[0].tableCells[0])}
            </CodeBoxComponent>
          );
        }
      }
      return;
    });
  });

  return (
    <PageComponent
      title={title}
      navigationItems={headings}
      page={pages[page]}
      currentPage={page}
      setPage={setPage}
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
  page,
  currentPage,
  setPage,
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
        <SideNavigationComponent
          items={navigationItems}
          setPage={setPage}
          currentPage={currentPage}
        />
        <ContentComponent currentPage={currentPage}>{page}</ContentComponent>
      </MainComponent>
    </div>
  );
}

function TextFactory({
  H2Component,
  H3Component,
  H4Component,
  H5Component,
  H6Component,
  SpanComponent,
}) {
  return function ({ bold, type, text }) {
    if (type === "HEADING_2") {
      return <H2Component>{text}</H2Component>;
    }

    if (type === "HEADING_3") {
      return <H3Component>{text}</H3Component>;
    }

    if (type === "HEADING_4") {
      return <H4Component>{text}</H4Component>;
    }

    if (type === "HEADING_5") {
      return <H5Component>{text}</H5Component>;
    }

    if (type === "HEADING_6") {
      return <H6Component>{text}</H6Component>;
    }

    if (type === "NORMAL_TEXT") {
      return (
        <SpanComponent
          style={{
            fontWeight: bold ? "800" : "400",
          }}
        >
          {text}
        </SpanComponent>
      );
    }

    return null;
  };
}
