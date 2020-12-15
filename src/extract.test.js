const assert = require("assert");

const { content } = require("../stories/document-1607876232180.json");
import Extract from "./extract";

describe("Extract", () => {
  it("finds title node", () => {
    const title = Extract.extractTitle(content);
    assert.equal(title, "Your First Progressive Web App");
  });
});
