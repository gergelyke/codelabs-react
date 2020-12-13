import React from "react";

import { Codelabs } from "../src/index.js";
import source from "./document-1607876232180.json";

export default {
  title: "Codelabs/Example",
  component: Codelabs,
};

export const Example = () => {
  return <Codelabs content={source.content} />;
};
