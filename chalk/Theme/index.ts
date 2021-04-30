import { ColorModeOptions } from "../System"
import components           from "./Components"
import foundations          from "./Foundations"
import styles               from "./Styles"

/**
 * Color mode config
 */
const config: ColorModeOptions = {
   useSystemColorMode: false,
   initialColorMode: "dark",
}

// @ts-ignore
export const theme = {
   ...foundations,
   components,
   styles,
   config,
}

export type Theme = typeof theme

export default theme
