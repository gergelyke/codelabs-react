import React from "react";

import { Codelabs } from "../src/index.js";
import source from "./document-1607876232180.json";

import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
} from "baseui/header-navigation";
import { H2, H3, H4, H5, H6 } from "baseui/typography";
import { Block } from "baseui/block";
import { Button } from "baseui/button";
import { StyledLink } from "baseui/link";
import { Notification } from "baseui/notification";
import Check from "baseui/icon/check";
import { ListItem, ListItemLabel } from "baseui/list";

export default {
  title: "Codelabs/Example",
  component: Codelabs,
};

export const Default = () => {
  return <Codelabs content={source.content} />;
};

export const BaseWeb = () => {
  return (
    <Codelabs
      content={source.content}
      overrides={{
        Header: ({ title }) => {
          return (
            <HeaderNavigation>
              <StyledNavigationList $align={ALIGN.left}>
                {title}
              </StyledNavigationList>
            </HeaderNavigation>
          );
        },
        SideNavigation: ({ items, setPage, currentPage }) => {
          return (
            <ul>
              {items.map((item, index) => {
                return (
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setPage(index);
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
        H2,
        H3,
        H4,
        H5,
        H6,
        Span: ({ children }) => {
          return (
            <Block $as="span" font="font400">
              {children}
            </Block>
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
          return <StyledLink href={href}>{children}</StyledLink>;
        },
        InfoBox: ({ children }) => {
          return (
            <Notification
              overrides={{
                Body: { style: { width: "auto" } },
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
                Body: { style: { width: "auto" } },
              }}
            >
              {children}
            </Notification>
          );
        },
      }}
    />
  );
};
