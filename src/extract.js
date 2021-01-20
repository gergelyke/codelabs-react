const infoColor = { red: 0.8509804, green: 0.91764706, blue: 0.827451 };
const warningColor = { red: 0.9882353, green: 0.8980392, blue: 0.8039216 };

function parse(content) {
  const title = extractTitle(content);
  const headings = extractHeadings(content);

  const rawPages = extractPageNodes(content);

  const pages = rawPages.map((page) => {
    return page.map((node) => {
      if (node.paragraph) {
        return parseParagraph(node.paragraph);
      } else if (node.table) {
        return parseTable(node.table);
      } else {
        return null;
      }
    });
  });

  return {
    title,
    headings,
    pages,
  };
}

function parseParagraph(paragraph) {
  return {
    type: getParagraphType(paragraph),
    content: paragraph.elements.map((element) => {
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
        ...getBold(element),
        ...getItalic(element),
      };
    }),
  };
}

function parseTable(table) {
  const tableType = getTableType(table);

  return {
    type: tableType,
    content:
      tableType === "codebox"
        ? // return an array here as well, so the API is consistent
          [parseCode(table.tableRows[0].tableCells[0])]
        : parseParagraph(table.tableRows[0].tableCells[0].content[0].paragraph),
  };
}

function parseCode(tableCell) {
  return tableCell.content.reduce((acc, current) => {
    return (acc += current.paragraph.elements[0].textRun.content);
  }, "");
}

function getTableType(table) {
  try {
    if (
      table.rows === 1 &&
      table.columns === 1 &&
      table.tableRows[0].tableCells[0].content[0].paragraph.elements &&
      isEqual(
        table.tableRows[0].tableCells[0].tableCellStyle.backgroundColor.color
          .rgbColor,
        infoColor
      )
    ) {
      return "infobox";
    }
  } catch (ex) {
    // do nothing
  }

  try {
    if (
      table.rows === 1 &&
      table.columns === 1 &&
      table.tableRows[0].tableCells[0].content[0].paragraph.elements &&
      isEqual(
        table.tableRows[0].tableCells[0].tableCellStyle.backgroundColor.color
          .rgbColor,
        warningColor
      )
    ) {
      return "warningbox";
    }
  } catch (ex) {
    // do nothing
  }

  try {
    if (
      table.rows === 1 &&
      table.columns === 1 &&
      table.tableRows[0].tableCells[0].content[0].paragraph.elements[0].textRun
        .textStyle.weightedFontFamily.fontFamily === "Courier New"
    ) {
      return "codebox";
    }
  } catch (ex) {
    // do nothing
  }

  return null;
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
    if (paragraph.paragraphStyle.spacingMode === "COLLAPSE_LISTS") {
      return "li";
    }
  } catch (ex) {
    // do nothing
  }

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
  return getParagraphText(extractTitleNode(content));
}

function extractHeadings(content) {
  const headingNodes = extractHeadingNodes(content);
  return headingNodes.map(getParagraphText).map((header) => header.trim());
}

function isEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
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

function getBold(element) {
  return {
    bold: !!element.textRun.textStyle.bold,
  };
}

function getItalic(element) {
  return {
    italic: !!element.textRun.textStyle.italic,
  };
}

function getParagraphText(node) {
  return node.paragraph.elements[0].textRun.content;
}

export default {
  parse,
};
