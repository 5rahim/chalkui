import { ThemeTypings } from '../Theming.types'

export type ResponsiveArray<T> = Array<T | null>

export type ResponsiveObject<T> = { [breakpoint: string]: T }

/**
 * Responsive CSS Value
 *
 * @example 10px | [1, 2, 3] | {sm: 1, md: 2}
 */
export type ResponsiveValue<T> = T | ResponsiveArray<T> | ResponsiveObject<T>

export type Length = string | 0 | number

export type Union<T> = T | (string & {})

export type Token<
   CSSType,
   ThemeKey = unknown
   > = ThemeKey extends keyof ThemeTypings
   ? ResponsiveValue<Union<CSSType | ThemeTypings[ThemeKey]>>
   : ResponsiveValue<CSSType>
