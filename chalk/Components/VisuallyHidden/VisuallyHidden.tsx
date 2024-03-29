import { chalk } from "../../System"
import * as React from "react"

/**
 * Styles to visually hide an element
 * but make it accessible to screen-readers
 */
export const visuallyHiddenStyle: React.CSSProperties = {
   border: "0px",
   clip: "rect(0px, 0px, 0px, 0px)",
   height: "1px",
   width: "1px",
   margin: "-1px",
   padding: "0px",
   overflow: "hidden",
   whiteSpace: "nowrap",
   position: "absolute",
}

/**
 * Visually hidden component used to hide
 * elements on screen
 */
export const VisuallyHidden = chalk("span", {
   baseStyle: visuallyHiddenStyle,
})



/**
 * Visually hidden input component for designing
 * custom input components using the html `input`
 * as a proxy
 */
export const VisuallyHiddenInput = chalk("input", {
   baseStyle: visuallyHiddenStyle,
})


export default VisuallyHidden
