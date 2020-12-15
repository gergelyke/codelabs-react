import Utils from "./utils";

function extractHeadingNodes(content) {
  return findElements(content, "HEADING_1");
}

function extractTitleNode(content) {
  return findElements(content, "TITLE")[0];
}

function extractTitle(content) {
  return Utils.getParagraphText(extractTitleNode(content));
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
  extractHeadingNodes,

  extractTitleNode,
  extractTitle,

  extractPageNodes,
};
