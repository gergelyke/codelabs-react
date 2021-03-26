import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import response from "../stories/document-1607876232180.json";
import Extract from "./extract";
import parsePageNavigations from "./pagenavigations";

import { Default, BaseWeb } from "../stories/Codelabs.stories";

afterEach(cleanup);

test("The extracted sample doc parses properly", () => {
  const tree = Extract.parse(response, ["nemethgergely.com"]);
  const pageNavigations = parsePageNavigations(tree.pages, tree.headings);
  expect(pageNavigations).toMatchSnapshot();
});

test("H2 -> H4 nestings", () => {
  const pages = [
    [
      {
        type: "h2",
        id: "h2-1",
        content: [{ content: "h2" }],
      },
      {
        type: "h4",
        id: "h4-2",
        content: [{ content: "sub h4!" }],
      },
    ],
  ];
  const headings = [
    {
      id: "h1-3",
      content: "h1 title",
    },
  ];

  const pageNavigations = parsePageNavigations(pages, headings);
  expect(pageNavigations).toMatchSnapshot();
  // This asserts that wasn't an extra level of subnavs (h3), that they collapsed
  // to the h3 level even though they were h4s
  expect(pageNavigations[0][1].subNav[0].itemId).toBe("#h4-2");
});

test("H2 -> H3 -> h4 -> h5 -> H6 deep", () => {
  const pages = [
    [
      {
        type: "h2",
        id: "h2-1",
        content: [{ content: "h2" }],
      },
      {
        type: "h3",
        id: "h3-2",
        content: [{ content: "h3" }],
      },
      {
        type: "h4",
        id: "h4-3",
        content: [{ content: "h4" }],
      },
      {
        type: "h5",
        id: "h5-4",
        content: [{ content: "h5" }],
      },
      {
        type: "h6",
        id: "h6-6",
        content: [{ content: "h6" }],
      },
    ],
  ];
  const headings = [
    {
      id: "h1-7",
      content: "h1 title",
    },
  ];

  const pageNavigations = parsePageNavigations(pages, headings);
  expect(pageNavigations).toMatchSnapshot();
});

test("H2 -> H4 -> H3 -> H2 Skips h3 and reverses back", () => {
  const pages = [
    [
      {
        type: "h2",
        id: "h2-1",
        content: [{ content: "h2" }],
      },
      {
        type: "h4",
        id: "h4-2",
        content: [{ content: "h4" }],
      },
      {
        type: "h3",
        id: "h3-3",
        content: [{ content: "h3" }],
      },
      {
        type: "h2",
        id: "h2-4",
        content: [{ content: "h2" }],
      },
    ],
  ];
  const headings = [
    {
      id: "h1-5",
      content: "h1 title",
    },
  ];

  const pageNavigations = parsePageNavigations(pages, headings);
  expect(pageNavigations).toMatchSnapshot();
});

test("H2 -> H4 -> H3 -> H5 Skips, reverses, and skips again", () => {
  const pages = [
    [
      {
        type: "h2",
        id: "h2-1",
        content: [{ content: "h2" }],
      },
      {
        type: "h4",
        id: "h4-2",
        content: [{ content: "h4" }],
      },
      {
        type: "h3",
        id: "h3-3",
        content: [{ content: "h3" }],
      },
      {
        type: "h5",
        id: "h5-4",
        content: [{ content: "h5" }],
      },
    ],
  ];
  const headings = [
    {
      id: "h1-5",
      content: "h1 title",
    },
  ];

  const pageNavigations = parsePageNavigations(pages, headings);
  expect(pageNavigations).toMatchSnapshot();
});
