import assert from "assert";

import { content } from "../stories/document-1607876232180.json";
import expected from "./__test/expected.json";
import Extract from "./extract";

describe("Extract", () => {
  it("parses the document", () => {
    const tree = Extract.parse(content);
    assert.deepStrictEqual(JSON.parse(JSON.stringify(tree)), expected);
  });
});
