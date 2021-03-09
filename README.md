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
  // required, full API response from https://docs.googleapis.com/v1/documents/{documentId}
  // has a shape like: {title, body : {content}, inlineObjects}
  content={content}
  // optional, if your app needs to know about a page change
  onPageChange={({ nextPage }) => {}}
  // optional, if you want to set the initial page to show
  initialPage={Number}
  // optional, if you want to use iframes, you have to define the allowed base URLs, like 'google.com'
  iframeSourceUrls={[String]}
  // optional, used for styling
  overrides={{
    // Layout overrides
    Header: ({ title }) => React.Component,
    Content: ({ children }) => React.Component,
    SideNavigation: ({ items, setPage, currentPage, onPageChange }) =>
      React.Component,
    Button: ({ children }) => React.Component,

    // Text overrides
    Paragraph: ({ children }) => React.Component,
    H1: ({ children }) => React.Component,
    H2: ({ children }) => React.Component,
    H3: ({ children }) => React.Component,
    H4: ({ children }) => React.Component,
    H5: ({ children }) => React.Component,
    H6: ({ children }) => React.Component,
    Paragraph: ({ children }) => React.Component,
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

    // image / video components
    Img: ({ src }) => React.Component,
    IFrame: ({ src }) => React.Component,
  }}
/>;
```

## Roadmap

Currently, the following features are missing, and will be added in the future:

- [x] Image support
- [x] YouTube support
- [ ] Per-step time estimation
- [ ] Feedback links
