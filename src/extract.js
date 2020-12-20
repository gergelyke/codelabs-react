import Utils from "./utils";

function parse(content) {
  const title = extractTitle(content);
  const headings = extractHeadings(content);

  const rawPages = extractPageNodes(content);

  const page = rawPages[0].map((node) => {
    if (node.paragraph) {
      return {
        type: getParagraphType(node.paragraph),
        content: node.paragraph.elements.map((element) => {
          // TODO(): add image support
          if (element.inlineObjectElement) {
            return null;
          }

          // TODO(): add horizontal rule support
          if (element.horizontalRule) {
            return null;
          }

          return {
            content: element.textRun.content,
            ...getElementProperties(element),
          };
        }),
      };
    } else {
      return null;
    }
  });

  return {
    title,
    headings,
    content: [page],
  };
}

function getElementProperties(element) {
  return {
    ...getLinkProperties(element.textRun),
    ...getButtonLinkProperties(element.textRun),
    ...getCommandLineSnippet(element.textRun),
  };
}

function getParagraphType(paragraph) {
  const mapping = {
    NORMAL_TEXT: "p",
    HEADING_2: "h2",
    HEADING_3: "h3",
    HEADING_4: "h4",
    HEADING_5: "h5",
    HEADING_6: "h6",
  };
  try {
    return mapping[paragraph.paragraphStyle.namedStyleType];
  } catch (e) {
    // defaults to p
    return "p";
  }
}

function getLinkProperties(textRun) {
  try {
    if (
      textRun.textStyle &&
      textRun.textStyle.foregroundColor &&
      textRun.textStyle.link
    ) {
      return {
        type: "link",
        href: textRun.textStyle.link.url,
      };
    }
  } catch (e) {
    return undefined;
  }
}

function getButtonLinkProperties(textRun) {
  try {
    if (
      textRun.textStyle &&
      textRun.textStyle.backgroundColor &&
      textRun.textStyle.link
    ) {
      return {
        type: "button-link",
        href: textRun.textStyle.link.url,
      };
    }
  } catch (e) {
    return undefined;
  }
}

function getCommandLineSnippet(textRun) {
  try {
    if (textRun.textStyle.weightedFontFamily.fontFamily === "Consolas") {
      return {
        type: "command-line-snippet",
      };
    }
  } catch (e) {
    return undefined;
  }
}

function extractHeadingNodes(content) {
  return findElements(content, "HEADING_1");
}

function extractTitleNode(content) {
  return findElements(content, "TITLE")[0];
}

function extractTitle(content) {
  return Utils.getParagraphText(extractTitleNode(content));
}

function extractHeadings(content) {
  const headingNodes = extractHeadingNodes(content);
  return headingNodes
    .map(Utils.getParagraphText)
    .map((header) => header.trim());
}

function extractPageNodes(content) {
  const headingNodes = extractHeadingNodes(content);
  return content.reduce((acc, current) => {
    const { startIndex = 0 } = current;
    for (let i = headingNodes.length - 1; i > -1; i -= 1) {
      if (startIndex > headingNodes[i].startIndex) {
        acc[i] = acc[i] || [];
        acc[i].push(current);
        break;
      }
    }
    return acc;
  }, []);
}

function findElements(content, type) {
  return content.filter(
    (node) =>
      node.paragraph && node.paragraph.paragraphStyle.namedStyleType === type
  );
}

export default {
  parse,

  extractHeadingNodes,
  extractHeadings,

  extractTitleNode,
  extractTitle,

  extractPageNodes,
};
