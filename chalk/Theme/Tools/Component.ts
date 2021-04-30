import { SystemStyleObject }   from '../../StyledSystem'
import { Dictionary, runIfFn } from '../../Utils'

export interface StyleConfig {
   baseStyle?: SystemStyleObject
   sizes?: { [size: string]: SystemStyleObject }
   variants?: { [variant: string]: SystemStyleObject }
   defaultProps?: {
      size?: string
      variant?: string
      colorScheme?: string
   }
}

export interface MultiStyleConfig {
   baseStyle?: { [part: string]: SystemStyleObject }
   sizes?: { [size: string]: { [part: string]: SystemStyleObject } }
   variants?: { [variants: string]: { [part: string]: SystemStyleObject } }
   defaultProps?: StyleConfig["defaultProps"]
}

export interface GlobalStyleProps {
   colorScheme: string
   colorMode: "light" | "dark"
   theme: Dictionary
}

export type GlobalStyles = {
   global?: SystemStyleObject | ((props: GlobalStyleProps) => SystemStyleObject)
}

export type JSXElementStyles = {
   [K in keyof JSX.IntrinsicElements]?: SystemStyleObject
}

export { runIfFn }

export type Styles = GlobalStyles & JSXElementStyles

/**
 * Mode Helper
 * @param light
 * @param dark
 * @returns {(props: Dictionary) => any}
 */
export function mode(light: any, dark: any) {
   return (props: Dictionary) => (props.colorMode === "dark" ? dark : light)
}

export const either = (first: any, second: any) => (flag: boolean) => (!flag ? first : second)

/**
 * Orientation Helper
 * @param {{orientation?: "vertical" | "horizontal", vertical: any, horizontal: any}} options
 * @returns {any}
 */
export function orient(options: {
   orientation?: "vertical" | "horizontal"
   vertical: any
   horizontal: any
}) {
   const { orientation, vertical, horizontal } = options
   if (!orientation) return {}
   return orientation === "vertical" ? vertical : horizontal
}
