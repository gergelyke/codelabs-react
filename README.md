# codelabs-react

A bring-your-own-styles React library, that turns [Google-style codelabs](https://github.com/googlecodelabs/tools/blob/master/FORMAT-GUIDE.md) into React components for easy customization.

You'll need to get the API response from the Google APIs yourself. This project does not handle authentication to the Google APIs. Check out [this guide](https://developers.google.com/docs/api/quickstart/js) if you need help with it.

**Live demo:**

- [With the default components](https://codelabs-react.netlify.app/?path=/story/codelabs-example--default)
- [With overrides using Base Web](https://codelabs-react.netlify.app/?path=/story/codelabs-example--base-web)

## API

```js
import { Codelabs } from "codelabs-react";

/*
    source: the JSON output of the Google Docs API
    overrides: providing your own set of render functions or component overrides
*/
<Codelabs
  // required, response from the google docs api
  content={content}
  // optional, if your app needs to know about a page change
  onPageChange={({ page }) => {}}
  // optional, used for styling
  overrides={{
    // Layout overrides
    Header: ({ title }) => React.Component,
    Content: ({ children }) => React.Component,
    SideNavigation: ({ items, setPage, currentPage }) => React.Component,
    Button: ({ children }) => React.Component,

    // Text overrides
    Parapgraph: ({ children }) => React.Component,
    H1: ({ children }) => React.Component,
    H2: ({ children }) => React.Component,
    H3: ({ children }) => React.Component,
    H4: ({ children }) => React.Component,
    H5: ({ children }) => React.Component,
    H6: ({ children }) => React.Component,
    Parapgraph: ({ children }) => React.Component,
    ListItem: ({ children }) => React.Component,

    // Info and warning boxes
    InfoBox: ({ children }) => React.Component,
    WarningBox: ({ children }) => React.Component,

    // Link overrides
    ButtonLink: ({ children, href }) => React.Component,
    Link: ({ children, href }) => React.Component,

    // Code containers
    // Snippet: single-line
    // Box: multi-line
    Snippet: ({ children }) => React.Component,
    CodeBox: ({ children }) => React.Component,
  }}
/>;
```

## Roadmap

Currently, the following features are missing, and will be added in the future:

- [ ] Image support
- [ ] YouTube support
- [ ] Per-step time estimation
- [ ] Feedback links
