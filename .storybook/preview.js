import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";

const engine = new Styletron();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story) => (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Story />
      </BaseProvider>
    </StyletronProvider>
  ),
];
