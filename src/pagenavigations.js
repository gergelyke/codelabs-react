/**
 * Parses a page into a list of headers and their sub sections to be used to
 * render by the OnPageNavigation component. This algorithm works best if
 * the document is well formed and headers follow each other without skipping.
 * However, it will do a best effort parsing on malformed headers such as
 * h2 -> h4 -> h3 -> h2, and will rewrite this as:
 *
 * h2 -> h4
 *    -> h3
 * h2
 *
 * Where the first header has two subnav items on the same level.
 *
 * This is an example structure of a parsed navigation result,
 * which can be plugged directly into baseweb UIs <Navigation> component
 *
 * [
 *   {
 *     title: "Colors",
 *     itemId: "#colors",
 *     subNav: [
 *       { title: "Primary", itemId: "#primary" },
 *       {
 *         title: "Shades",
 *         itemId: "#shades",
 *         subNav: [
 *           { title: "Dark", itemId: "#dark" },
 *         ]
 *       }
 *     ]
 *   }
 * ]
 *
 * @param pages The full list of pages as extracted
 * @param headings The full list of headings as extracted
 */
const parsePageNavigations = (pages, headings) => {
  return pages.map((page, pageIndex) => {
    // Extract into a queue of headers ordered as they appear in the page
    const headers = page
      .filter((node) => ["h2", "h3", "h4", "h5", "h6"].includes(node.type))
      .map((node, index) => {
        return {
          itemId: `#${node.id}`,
          level: parseInt(node.type.replace("h", "")),
          title: node.content.map((item) => item.content).join(" "),
        };
      });

    // Add the h1 tag to the front of the queue
    headers.unshift({
      itemId: `#${headings[pageIndex].id}`,
      // Although it's an h1, it's convention to have it appear at the same level
      // as h2
      level: 2,
      title: headings[pageIndex].content,
    });

    // This function works by dequeueing (shifting) header objects and stitching
    // parent/child relations in a depth first manner.
    const recurse = (headers) => {
      // There's no headers
      if (!headers.length) {
        return [];
      }

      let parent = headers.shift();
      let parentLevel = [parent];
      let temp = [];

      let next = headers.shift();
      // There's only one header or one subheader
      if (!next) {
        return parentLevel;
      }

      while (next) {
        if (next.level === parent.level) {
          // Same level as parent.
          parentLevel.push(next);
          parent = next;
          next = headers.shift();
        } else if (next.level > parent.level) {
          let tempParent = parent;
          // This is a child of the parent. We aggregate all sub sections
          // into an array and recurse and append the result into the
          // parent's subnav array.
          while (next && next.level > tempParent.level) {
            temp.push(next);
            tempParent = next;
            next = headers.shift();
          }
          // Here one of two things happen. For well-formed docs, the parent's sub nav array is set to
          // the result of recursing all of the deeper levels we just put into the temp array.
          //
          // For not well-formed documents, there's a chance that a sub nav was already created for this
          // parent, which occurs in the example here (h2 -> h4 -> h3 -> h4). The h4 was placed into the
          // h2 subnav, and then on the next iteration the h3 and h4 are still higher than the h2, so they
          // go through the recursion and are concatenated to the h2 subnav.
          //
          // It's pretty hard to follow without stepping through the code.
          parent.subNav = parent.subNav
            ? parent.subNav.concat(recurse(temp))
            : recurse(temp);

          // Clear the temp array so that these objects aren't added multiple times
          temp = [];
        } else {
          // next is a lower level than the parent. This should not be possible! If this line of code is hit
          // that means there's some document structure that we haven't addressed yet.
          throw new Error(
            "Document parsed inproperly, cannot have subnav of higher order than parent"
          );
        }
      }

      return parentLevel;
    };

    return recurse(headers);
  });
};

export default parsePageNavigations;
