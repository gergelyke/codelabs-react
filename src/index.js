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
  Button,
  ButtonLink,
  Snippet,
  Link,
  InfoBox,
  WarningBox,
  CodeBox,
  Parapgraph,
  ListItem,
} from "./components";

import Extract from "./extract";

// TODO: this function is a mess, need to break it apart
export function Codelabs({ content, overrides = {}, onPageChange = () => {} }) {
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
  const ParapgraphComponent = overrides.Parapgraph || Parapgraph;
  const ListItemComponent = overrides.ListItem || ListItem;

  const ButtonLinkComponent = overrides.ButtonLink || ButtonLink;
  const ButtonComponent = overrides.Button || Button;
  const SnippetComponent = overrides.Snippet || Snippet;
  const LinkComponent = overrides.Link || Link;
  const InfoBoxComponent = overrides.InfoBox || InfoBox;
  const WarningBoxComponent = overrides.WarningBox || WarningBox;
  const CodeBoxComponent = overrides.CodeBox || CodeBox;

  const parsedContent = Extract.parse(content);

  const Mapper = {
    p: (props) => <ParapgraphComponent>{props.children}</ParapgraphComponent>,
    h2: (props) => <H2Component>{props.children}</H2Component>,
    h3: (props) => <H3Component>{props.children}</H3Component>,
    h4: (props) => <H4Component>{props.children}</H4Component>,
    h5: (props) => <H5Component>{props.children}</H5Component>,
    h6: (props) => <H6Component>{props.children}</H6Component>,
    li: (props) => <ListItemComponent>{props.children}</ListItemComponent>,
    infobox: (props) => <InfoBoxComponent>{props.children}</InfoBoxComponent>,
    warningbox: (props) => (
      <WarningBoxComponent>{props.children}</WarningBoxComponent>
    ),
    a: (props) => <LinkComponent {...props}>{props.children}</LinkComponent>,
    buttonlink: (props) => (
      <ButtonLinkComponent {...props}>{props.children}</ButtonLinkComponent>
    ),
    commandlinesnippet: (props) => (
      <SnippetComponent {...props}>{props.children}</SnippetComponent>
    ),
    codebox: (props) => (
      <CodeBoxComponent {...props}>{props.children}</CodeBoxComponent>
    ),
  };

  const pages = parsedContent.pages.map((page, pageIndex) => {
    return page.map((node, nodeIndex) => {
      switch (node.type) {
        case "p":
          return MapNode({
            node,
            tag: "p",
            Mapper,
            key: `${pageIndex}-${nodeIndex}`,
          });
        case "h2":
          return MapNode({
            node,
            tag: "h2",
            Mapper,
            key: `${pageIndex}-${nodeIndex}`,
          });
        case "h3":
          return MapNode({
            node,
            tag: "h3",
            Mapper,
            key: `${pageIndex}-${nodeIndex}`,
          });
        case "h4":
          return MapNode({
            node,
            tag: "h4",
            Mapper,
            key: `${pageIndex}-${nodeIndex}`,
          });
        case "h5":
          return MapNode({
            node,
            tag: "h5",
            Mapper,
            key: `${pageIndex}-${nodeIndex}`,
          });
        case "h6":
          return MapNode({
            node,
            tag: "h6",
            Mapper,
            key: `${pageIndex}-${nodeIndex}`,
          });
        case "li":
          return MapNode({
            node,
            tag: "li",
            Mapper,
            key: `${pageIndex}-${nodeIndex}`,
          });
        case "infobox":
          return MapNode({
            node: node.content,
            tag: "infobox",
            Mapper,
            key: `${pageIndex}-${nodeIndex}`,
          });
        case "warningbox":
          return MapNode({
            node: node.content,
            tag: "warningbox",
            Mapper,
            key: `${pageIndex}-${nodeIndex}`,
          });
        case "codebox":
          return MapNode({
            node: node,
            tag: "codebox",
            Mapper,
            key: `${pageIndex}-${nodeIndex}`,
          });

        default:
          return null;
      }
    });
  });

  return (
    <PageComponent
      title={parsedContent.title}
      navigationItems={parsedContent.headings}
      pages={pages}
      currentPage={page}
      setPage={setPage}
      onPageChange={onPageChange}
      overrides={{
        HeaderComponent,
        SideNavigationComponent,
        ContentComponent,
        MainComponent,
        ButtonComponent,
        H1Component,
      }}
    />
  );
}

function MapNode({ tag, node, Mapper, key }) {
  const Tag = Mapper[tag];
  if (!Tag) return null;

  if (tag === "codebox") {
    return <Mapper.codebox key={key}>{node.content}</Mapper.codebox>;
  }

  return (
    <Tag>
      {node.content.map((element, elementIndex) => {
        if (!element) return;

        key = `${key}-${elementIndex}`;

        if (element.type === "link") {
          return (
            <Mapper.a key={key} target="_blank" {...element}>
              {element.content}
            </Mapper.a>
          );
        }

        if (element.type === "button-link") {
          return (
            <Mapper.buttonlink key={key} target="_blank" {...element}>
              {element.content}
            </Mapper.buttonlink>
          );
        }

        if (element.type === "command-line-snippet") {
          return (
            <Mapper.commandlinesnippet key={key}>
              {element.content}
            </Mapper.commandlinesnippet>
          );
        }

        return <span key={key}>{element.content}</span>;
      })}
    </Tag>
  );
}

function Page({
  title,
  navigationItems,
  pages,
  currentPage,
  setPage,
  onPageChange,
  overrides: {
    HeaderComponent,
    SideNavigationComponent,
    ContentComponent,
    MainComponent,
    ButtonComponent,
    H1Component,
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
          onPageChange={onPageChange}
        />
        <ContentComponent currentPage={currentPage}>
          <>
            <H1Component>
              {currentPage + 1}. {navigationItems[currentPage]}
            </H1Component>
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
                  onPageChange({ nextPage: currentPage - 1 });
                }}
              >
                Previous
              </ButtonComponent>
              <ButtonComponent
                disabled={currentPage + 1 === pages.length}
                onClick={() => {
                  setPage(currentPage + 1);
                  onPageChange({ nextPage: currentPage + 1 });
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
