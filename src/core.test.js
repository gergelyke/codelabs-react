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

import { Default, BaseWeb } from "../stories/Codelabs.stories";

afterEach(cleanup);

test("Extract parses the document", () => {
  const tree = Extract.parse(response, ["nemethgergely.com"]);
  expect(tree).toMatchSnapshot();
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

test("Copy component displays on hover and is clickable", async () => {
  render(<BaseWeb />);

  const button = screen.getByRole("button", { name: "Copy" });
  expect(button).not.toBeVisible();

  // test hovering the snippet container
  fireEvent(
    screen.getByText(
      "https://api.darksky.net/forecast/DARKSKY_API_KEY/40.7720232,-73.9732319"
    ),
    new MouseEvent("mouseover", {
      bubbles: true,
      cancelable: true,
    })
  );
  expect(button).toBeVisible();

  // test copying
  fireEvent.click(button);
  expect(button.textContent).toBe("Copied");
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

test("In page navigation is present", async () => {
  render(<Default />);
  fireEvent.click(screen.getByText("Getting set up"));
  expect(
    screen.getByRole("link", {
      name: "Get a key for the Dark Sky API",
    })
  ).toBeInTheDocument();
});
