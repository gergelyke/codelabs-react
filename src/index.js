import React, { useState } from "react";

import {
  Header,
  SideNavigation,
  Content,
  Main,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Span,
  Button,
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

  const H1Component = overrides.H1 || H1;
  const H2Component = overrides.H2 || H2;
  const H3Component = overrides.H3 || H3;
  const H4Component = overrides.H4 || H4;
  const H5Component = overrides.H5 || H5;
  const H6Component = overrides.H6 || H6;

  const SpanComponent = overrides.Span || Span;
  const ButtonLinkComponent = overrides.ButtonLink || ButtonLink;
  const ButtonComponent = overrides.Button || Button;
  const SnippetComponent = overrides.Snippet || Snippet;
  const LinkComponent = overrides.Link || Link;
  const InfoBoxComponent = overrides.InfoBox || InfoBox;
  const WarningBoxComponent = overrides.WarningBox || WarningBox;
  const CodeBoxComponent = overrides.CodeBox || CodeBox;

  const Text = Utils.TextFactory({
    H2Component,
    H3Component,
    H4Component,
    H5Component,
    H6Component,
    SpanComponent,
    ButtonLinkComponent,
  });

  console.log(Extract.parse(content));

  return <span>test</span>;

  const title = Extract.extractTitle(content);
  const headings = Extract.extractHeadings(content);

  const pageNodes = Extract.extractPageNodes(content);

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

  const pages = pageNodes.map((page, index) => {
    const reactPage = page.map((node) => {
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

    // +1, so it's a human readable page index
    reactPage.unshift(
      <H1Component>
        {index + 1}. {headings[index]}
      </H1Component>
    );

    return reactPage;
  });

  return (
    <PageComponent
      title={title}
      navigationItems={headings}
      pages={pages}
      currentPage={page}
      setPage={setPage}
      overrides={{
        HeaderComponent,
        SideNavigationComponent,
        ContentComponent,
        MainComponent,
        ButtonComponent,
      }}
    />
  );
}

function Page({
  title,
  navigationItems,
  pages,
  currentPage,
  setPage,
  overrides: {
    HeaderComponent,
    SideNavigationComponent,
    ContentComponent,
    MainComponent,
    ButtonComponent,
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
        <ContentComponent currentPage={currentPage}>
          <>
            {pages[currentPage]}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "32px",
              }}
            >
              <ButtonComponent
                disabled={currentPage - 1 < 0}
                onClick={() => {
                  setPage(currentPage - 1);
                }}
              >
                Previous
              </ButtonComponent>
              <ButtonComponent
                disabled={currentPage + 1 === pages.length}
                onClick={() => {
                  setPage(currentPage + 1);
                }}
              >
                Next
              </ButtonComponent>
            </div>
          </>
        </ContentComponent>
      </MainComponent>
    </div>
  );
}
