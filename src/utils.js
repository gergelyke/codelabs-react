import React from "react";

const infoColor = { red: 0.8509804, green: 0.91764706, blue: 0.827451 };
const warningColor = { red: 0.9882353, green: 0.8980392, blue: 0.8039216 };

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

// PARAGRAPHS
function getParagraphText(node) {
  try {
    return node.paragraph.elements[0].textRun.content;
  } catch (ex) {
    return;
  }
}

function getParagraphType(node) {
  return node.paragraph.paragraphStyle.namedStyleType;
}

function getParagraphSpacingMode(node) {
  return node.paragraph.paragraphStyle.spacingMode;
}

function isCommandLineSnippet(textRun) {
  try {
    return textRun.textStyle.weightedFontFamily.fontFamily === "Consolas";
  } catch (e) {
    return false;
  }
}

function isBold(textRun) {
  try {
    return textRun.textStyle.bold;
  } catch (e) {
    return false;
  }
}

function isButton(textRun) {
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

function isLink(textRun) {
  try {
    return (
      textRun.textStyle &&
      textRun.textStyle.foregroundColor &&
      textRun.textStyle.link
    );
  } catch (e) {
    return false;
  }
}

function TextFactory({
  H2Component,
  H3Component,
  H4Component,
  H5Component,
  H6Component,
  SpanComponent,
}) {
  return function ({ bold, type, text }) {
    if (type === "HEADING_2") {
      return <H2Component>{text}</H2Component>;
    }

    if (type === "HEADING_3") {
      return <H3Component>{text}</H3Component>;
    }

    if (type === "HEADING_4") {
      return <H4Component>{text}</H4Component>;
    }

    if (type === "HEADING_5") {
      return <H5Component>{text}</H5Component>;
    }

    if (type === "HEADING_6") {
      return <H6Component>{text}</H6Component>;
    }

    if (type === "NORMAL_TEXT") {
      return (
        <SpanComponent
          style={{
            fontWeight: bold ? "800" : "400",
          }}
        >
          {text}
        </SpanComponent>
      );
    }

    return null;
  };
}

// TABLES

function isInfoBox(table) {
  try {
    return (
      table.rows === 1 &&
      table.columns === 1 &&
      table.tableRows[0].tableCells[0].content[0].paragraph.elements &&
      isEqual(
        table.tableRows[0].tableCells[0].tableCellStyle.backgroundColor.color
          .rgbColor,
        infoColor
      )
    );
  } catch (e) {
    return false;
  }
}

function isWarningBox(table) {
  try {
    return (
      table.rows === 1 &&
      table.columns === 1 &&
      table.tableRows[0].tableCells[0].content[0].paragraph.elements &&
      isEqual(
        table.tableRows[0].tableCells[0].tableCellStyle.backgroundColor.color
          .rgbColor,
        warningColor
      )
    );
  } catch (e) {
    return false;
  }
}

function isCodeBox(table) {
  try {
    return (
      table.rows === 1 &&
      table.columns === 1 &&
      table.tableRows[0].tableCells[0].content[0].paragraph.elements[0].textRun
        .textStyle.weightedFontFamily.fontFamily === "Courier New"
    );
  } catch (e) {
    return false;
  }
}

function getCode(tableCell) {
  return tableCell.content.reduce((acc, current) => {
    return (acc += current.paragraph.elements[0].textRun.content);
  }, "");
}

export default {
  getParagraphText,
  getParagraphType,
  getParagraphSpacingMode,
  TextFactory,

  isCommandLineSnippet,
  isBold,
  isButton,
  isLink,
  isInfoBox,
  isWarningBox,
  isCodeBox,

  getCode,
};
