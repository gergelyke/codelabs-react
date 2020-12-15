const assert = require("assert");

const { content } = require("../stories/document-1607876232180.json");
import Extract from "./extract";

describe("Extract", () => {
  it("finds the title", () => {
    const title = Extract.extractTitle(content);
    assert.deepStrictEqual(title, "Your First Progressive Web App");
  });

  it("finds h1 headers", () => {
    const headings = Extract.extractHeadings(content);
    assert.deepStrictEqual(headings, [
      "Introduction",
      "Getting set up",
      "Establish a baseline",
      "Add a web app manifest",
      "Provide a basic offline experience",
      "Provide a full offline experience",
      "Add install experience",
      "Congratulations",
    ]);
  });
});
