import { propNames } from "../StyledSystem"

/**
 * List of props for emotion to omit from DOM.
 * It mostly consists of Chalk props
 */
const allPropNames = new Set([
   ...propNames,
   "textStyle",
   "layerStyle",
   "apply",
   "isTruncated",
   "noOfLines",
   "focusBorderColor",
   "errorBorderColor",
   "as",
   "__css",
   "css",
   "sx",
   "theme"
])

/**
 * htmlWidth and htmlHeight is used in the <Image />
 * component to support the native `width` and `height` attributes
 */
const validHTMLProps = new Set(["htmlWidth", "htmlHeight", "htmlSize"])

export const shouldForwardProp = (prop: string): boolean =>
   validHTMLProps.has(prop) || !allPropNames.has(prop)
