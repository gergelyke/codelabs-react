import React, { useState } from "react";

import { Codelabs } from "../src/index.js";
import { CopyToClipboard } from "../src/components/copytoclipboard";
import response from "./document-1607876232180.json";

import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
} from "baseui/header-navigation";
import { H1, H2, H3, H4, H5, H6 } from "baseui/typography";
import { Block } from "baseui/block";
import { Button } from "baseui/button";
import { StyledLink } from "baseui/link";
import { Notification } from "baseui/notification";
import Check from "baseui/icon/check";
import { ListItem, ListItemLabel } from "baseui/list";
import { ArrowUp } from "baseui/icon";
import { Navigation } from "baseui/side-navigation";

export default {
  title: "Codelabs/Example",
  component: Codelabs,
};

export const Default = () => {
  return <Codelabs content={response} iframeSourceUrls={"nemethgergely.com"} />;
};

export const BaseWeb = () => {
  return (
    <Codelabs
      content={response}
      onPageChange={({ nextPage }) => {
        console.log(`Changed to page ${nextPage}`);
      }}
      initialPage={1}
      iframeSourceUrls={"nemethgergely.com"}
      overrides={{
        Content: ({ children }) => {
          return (
            <Block
              flex="1"
              maxWidth="600px"
              padding="16px"
              overrides={{
                Block: {
                  style: { boxShadow: "0 1px 4px hsla(0, 0%, 0%, 0.16)" },
                },
              }}
            >
              {children}
            </Block>
          );
        },
        Header: ({ title }) => {
          return (
            <HeaderNavigation>
              <StyledNavigationList $align={ALIGN.left}>
                {title}
              </StyledNavigationList>
            </HeaderNavigation>
          );
        },
        SideNavigation: ({ items, setPage, currentPage, onPageChange }) => {
          return (
            <ul>
              {items.map((item, index) => {
                return (
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setPage(index);
                      onPageChange({ nextPage: index });
                    }}
                  >
                    <ListItem
                      artwork={(props) => <Check {...props} />}
                      overrides={{
                        ArtworkContainer: {
                          style: () => ({
                            opacity: index > currentPage ? 0 : 1,
                          }),
                        },
                      }}
                    >
                      <ListItemLabel>{item}</ListItemLabel>
                    </ListItem>
                  </a>
                );
              })}
            </ul>
          );
        },
        H1,
        H2,
        H3,
        H4,
        H5,
        H6,
        ListItem: ({ children }) => {
          return (
            <Block $as="li" font="font300">
              {children}
            </Block>
          );
        },
        Paragraph: ({ children }) => {
          return (
            <Block $as="p" font="font300">
              {children}
            </Block>
          );
        },
        Button: (props) => {
          return (
            <Button size="large" {...props}>
              {props.children}
            </Button>
          );
        },
        ButtonLink: ({ children, href }) => {
          return (
            <Button
              href={href}
              overrides={{ BaseButton: { props: { $as: "a" } } }}
            >
              {children}
            </Button>
          );
        },
        Link: ({ children, href }) => {
          return (
            <StyledLink target="_blank" href={href}>
              {children}
            </StyledLink>
          );
        },
        Snippet: ({ children }) => {
          const [isHover, setIsHover] = useState(false);
          return (
            <Block
              overrides={{
                Block: {
                  style: {
                    overflowX: "scroll",
                    position: "relative",
                  },
                },
              }}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <CopyToClipboard
                style={{ backgroundColor: "#000", color: "#fff" }}
                isHover={isHover}
                copyContent={children}
              />
              <Block $as="pre" padding="10px" margin="0">
                {children}
              </Block>
            </Block>
          );
        },
        CodeBox: ({ children }) => {
          const [isHover, setIsHover] = useState(false);
          return (
            <Block
              overrides={{
                Block: {
                  style: {
                    overflowX: "scroll",
                    position: "relative",
                  },
                },
              }}
              font="font300"
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <CopyToClipboard
                style={{ backgroundColor: "#000", color: "#fff" }}
                isHover={isHover}
                copyContent={children}
              />
              <Block $as="pre" padding="10px" margin="0">
                {children}
              </Block>
            </Block>
          );
        },
        InfoBox: ({ children }) => {
          return (
            <Notification
              overrides={{
                Body: { style: { width: "auto", lineHeight: "2em" } },
              }}
            >
              {children}
            </Notification>
          );
        },
        WarningBox: ({ children }) => {
          return (
            <Notification
              kind="warning"
              overrides={{
                Body: { style: { width: "auto", lineHeight: "2em" } },
              }}
            >
              {children}
            </Notification>
          );
        },
        OnPageNavigation: ({ items, currentPage }) => {
          return (
            <Navigation
              items={items[currentPage]}
              overrides={{
                Root: {
                  style: {
                    marginTop: "25px",
                  },
                },
              }}
            />
          );
        },
      }}
    />
  );
};
