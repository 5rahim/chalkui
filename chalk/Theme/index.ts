import components  from "./Components"
import foundations from "./Foundations"
import styles      from "./Styles"
import {
   ThemeConfig,
   ThemeDirection,
}                  from "./Theme.types"

const direction = "ltr" as ThemeDirection

const config: ThemeConfig = {
   useSystemColorMode: false,
   initialColorMode: "light",
   cssVarPrefix: "chalk",
}

export const theme = {
   direction,
   ...foundations,
   components,
   styles,
   config,
}

// export type Theme = typeof theme
export type Theme = any

/**
 * @deprecated
 * Duplicate theme type. Please use `Theme`
 */
export type DefaultChalkTheme = Theme

export * from "./Theme.types"
export * from "./Utils"

export default theme
