# codelabs-react

A React library, that turns [Google-style codelabs](https://github.com/googlecodelabs/tools) into React components for easy customization.

## API

```js
import { Codelabs } from "codelabs-react";

/*
    source: the JSON output of the Google Docs API
    overrides: providing your own set of render functions or component overrides
*/
<Codelabs
  source={source}
  overrides={{
    Button,
    Paragraph1,
    Heading1,
  }}
/>;
```
