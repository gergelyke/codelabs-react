export function getParagraphText(node) {
  try {
    return node.paragraph.elements[0].textRun.content;
  } catch (ex) {
    return;
  }
}

export function getParagraphType(node) {
  return node.paragraph.paragraphStyle.namedStyleType;
}

export function getParagraphSpacingMode(node) {
  return node.paragraph.paragraphStyle.spacingMode;
}

export function isCommandLineSnippet(textRun) {
  try {
    return textRun.textStyle.weightedFontFamily.fontFamily === "Consolas";
  } catch (e) {
    return false;
  }
}

export function isButton(textRun) {
  try {
    return (
      textRun.textStyle &&
      textRun.textStyle.backgroundColor &&
      textRun.textStyle.link
    );
  } catch (e) {
    return false;
  }
}
