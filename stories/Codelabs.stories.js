import React from "react";

import { Codelabs } from "../src/index.js";
import source from "./document-1607876232180.json";

import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
} from "baseui/header-navigation";
import { Navigation } from "baseui/side-navigation";
import { H2, H3, H4, H5, H6 } from "baseui/typography";
import { Block } from "baseui/block";
import { Button } from "baseui/button";
import { StyledLink } from "baseui/link";

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
        SideNavigation: ({ items }) => {
          return (
            <Navigation
              items={items.map((item) => {
                return {
                  title: item,
                  id: `#${item}`,
                };
              })}
            />
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
        Button: ({ children, href }) => {
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
      }}
    />
  );
};
