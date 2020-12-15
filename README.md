# codelabs-react

A bring-your-own-styles React library, that turns [Google-style codelabs](https://github.com/googlecodelabs/tools) into React components for easy customization.

**Under active development. Do not use it in production for now.**

## API

```js
import { Codelabs } from "codelabs-react";

/*
    source: the JSON output of the Google Docs API
    overrides: providing your own set of render functions or component overrides
*/
<Codelabs
  content={content}
  overrides={{
    Page,
    Header,
    SideNavigation,
    Content,
    Main,
    H2,
    H3,
    H4,
    H5,
    H6,
    Span,
    ButtonLink,
    Snippet,
    Link,
    InfoBox,
    WarningBox,
    CodeBox,
  }}
/>;
```
