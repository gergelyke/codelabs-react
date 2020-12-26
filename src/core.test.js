import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import assert from "assert";

import { content } from "../stories/document-1607876232180.json";
import expected from "./__test/expected.json";
import Extract from "./extract";

import { Default, BaseWeb } from "../stories/Codelabs.stories";

afterEach(cleanup);

test("Extract parses the document", () => {
  const tree = Extract.parse(content);
  assert.deepStrictEqual(JSON.parse(JSON.stringify(tree)), expected);
});

test("Page can be navigated using the side navigation", async () => {
  render(<Default />);
  fireEvent.click(screen.getByText("Getting set up"));
  expect(screen.getByText("2. Getting set up")).toBeInTheDocument();
});

test("Initial page is set to Page 2", async () => {
  render(<BaseWeb />);
  expect(screen.getByText("2. Getting set up")).toBeInTheDocument();
});

test("Page can be navigated using the buttons at the bottom of the page", async () => {
  render(<Default />);

  // navigate to the next page
  fireEvent.click(
    screen.getByRole("button", {
      name: "Next",
    })
  );
  expect(screen.getByText("2. Getting set up")).toBeInTheDocument();

  // navigate to the previous page
  fireEvent.click(
    screen.getByRole("button", {
      name: "Previous",
    })
  );
  expect(screen.getByText("1. Introduction")).toBeInTheDocument();

  // now the previous button should be disabled
  const button = screen.getByRole("button", { name: "Previous" });
  expect(button).toBeDisabled();
});
