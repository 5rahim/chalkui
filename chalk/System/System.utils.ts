import {
   isString,
   omit,
   UnionStringArray,
}                       from "../Utils"
import * as React       from "react"
import { ThemingProps } from "./System.types"


/**
 * Carefully selected html elements for chalk components.
 * This is mostly for `chalk.<element>` syntax.
 */
export const domElements = [
   "a",
   "b",
   "article",
   "aside",
   "blockquote",
   "button",
   "caption",
   "cite",
   "circle",
   "code",
   "dd",
   "div",
   "dl",
   "dt",
   "fieldset",
   "figcaption",
   "figure",
   "footer",
   "form",
   "h1",
   "h2",
   "h3",
   "h4",
   "h5",
   "h6",
   "header",
   "hr",
   "img",
   "input",
   "kbd",
   "label",
   "li",
   "main",
   "mark",
   "nav",
   "ol",
   "p",
   "path",
   "pre",
   "q",
   "rect",
   "s",
   "svg",
   "section",
   "select",
   "strong",
   "small",
   "span",
   "sub",
   "sup",
   "table",
   "tbody",
   "td",
   "textarea",
   "tfoot",
   "th",
   "thead",
   "tr",
   "ul",
] as const

export type DOMElements = UnionStringArray<typeof domElements>

export function omitThemingProps<T extends ThemingProps>(props: T) {
   return omit(props, ["styleConfig", "size", "variant", "colorScheme"])
}

const __DEV__ = false

export default function isTag(target: any) {
   return (
      isString(target) &&
      (__DEV__ ? target.charAt(0) === target.charAt(0).toLowerCase() : true)
   )
}

export function getDisplayName(primitive: any) {
   return isTag(primitive) ? `chalk.${primitive}` : getComponentName(primitive)
}

function getComponentName(primitive: React.ComponentType | string) {
   return (
      (__DEV__ ? isString(primitive) && primitive : false) ||
      (!isString(primitive) && primitive.displayName) ||
      (!isString(primitive) && primitive.name) ||
      "ChalkComponent"
   )
}
