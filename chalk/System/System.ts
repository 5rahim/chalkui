import {
   css,
   propNames,
   ResponsiveValue,
   SystemProps,
   SystemStyleObject,
   ChalkStyleProps,
} from "../StyledSystem"
import {
   memoizedGet as get,
   objectFilter,
   Dictionary,
   isFunction,
} from "../Utils"
// import emotionStyled, {
//    CSSObject,
//    FunctionInterpolation,
//    Interpolation,
// }
// from "@emotion/styled"
import _styled, {
   CSSObject,
   FunctionInterpolation,
   Interpolation,
} from "@emotion/styled"
import { shouldForwardProp } from "./ShouldForwardProp"
import {
   As,
   ChalkComponent,
   ChalkProps,
   PropsOf,
} from "./System.types"
import {
   domElements,
   DOMElements,
} from "./System.utils"
import React from 'react'
import { useChalk } from './Hooks'
import { StyleProps } from "../StyledSystem/Types"

/**
 * Convert propNames array to object to faster lookup perf
 */
const stylePropNames = propNames.reduce((acc: any, key) => {
   if (typeof key !== "object" && typeof key !== "function") acc[key] = key
   return acc
}, {})

type StyleResolverProps = SystemStyleObject & {
   __css?: SystemStyleObject
   sx?: SystemStyleObject
   theme: Dictionary
   css?: CSSObject
   noOfLines?: ResponsiveValue<number>
   isTruncated?: boolean
}

interface GetStyleObject {
   (options: {
      baseStyle?: SystemStyleObject
   }): FunctionInterpolation<StyleResolverProps>
}

/**
 * Style resolver function that manages how style props are merged
 * in combination with other possible ways of defining styles.
 *
 * For example, take a component defined this way:
 * ```jsx
 * <Box fontSize="24px" sx={{ fontSize: "40px" }}></Box>
 * ```
 *
 * We want to manage the priority of the styles properly to prevent unwanted
 * behaviors. Right now, the `sx` prop has the highest priority so the resolved
 * fontSize will be `40px`
 */
export const getStyleObject: GetStyleObject = ({ baseStyle }) => (props) => {
   const {
      theme,
      noOfLines,
      isTruncated,
      css: cssProp,
      __css,
      sx,
      ...rest
   } = props
   
   // filter out props that aren't style props
   const styleProps = objectFilter(rest, (_, prop) => prop in stylePropNames)
   
   let truncateStyle: any = {}
   
   if (noOfLines != null) {
      truncateStyle = {
         overflow: "hidden",
         textOverflow: "ellipsis",
         display: "-webkit-box",
         WebkitBoxOrient: "vertical",
         WebkitLineClamp: noOfLines,
      }
   } else if (isTruncated) {
      truncateStyle = {
         overflow: "hidden",
         textOverflow: "ellipsis",
         whiteSpace: "nowrap",
      }
   }
   
   /**
    * The computed, theme-aware style object. The other of the properties
    * within `objectAssign` determines how styles are overriden.
    */
   const finalStyles = Object.assign(
      {},
      __css,
      baseStyle,
      truncateStyle,
      styleProps,
      sx,
   )
   
   // Converts theme-aware style object to real css object
   const computedCSS = css(finalStyles)(props.theme)
   
   // Merge the computed css object with styles in css prop
   const cssObject: Interpolation<StyleResolverProps> = Object.assign(
      computedCSS,
      isFunction(cssProp) ? cssProp(theme) : cssProp,
   )
   
   return cssObject
}

interface StyledOptions {
   shouldForwardProp?(prop: string): boolean
   
   themeKey?: string
   label?: string
   baseStyle?: SystemStyleObject
}

export function styled<T extends As, P = {}>(
   component: T,
   options?: StyledOptions,
) {
   const { baseStyle, ...styledOptions } = options ?? {}
   
   if (!styledOptions.shouldForwardProp) {
      styledOptions.shouldForwardProp = shouldForwardProp
   }
   
   const styleObject = getStyleObject({ baseStyle })
   return _styled(
      component as React.ComponentType<any>,
      styledOptions,
   )(styleObject) as ChalkComponent<T, P>
}

export type HTMLChalkComponents = {
   [Tag in DOMElements]: ChalkComponent<Tag, {}>
}

export type HTMLChalkProps<T extends As> = Omit<PropsOf<T>,
   T extends "svg"
      ? "ref" | "children" | keyof StyleProps
      : "ref" | keyof StyleProps> &
   ChalkProps & { as?: As }

type ChalkFactory = {
   <T extends As, P = {}>(
      component: T,
      options?: StyledOptions,
   ): ChalkComponent<T, P>
}

export const chalk = (styled as unknown) as ChalkFactory &
   HTMLChalkComponents

domElements.forEach((tag) => {
   // @ts-ignore
   chalk[tag] = chalk(tag)
})


// /**
//  * Convert propNames array to object to faster lookup perf
//  */
// const stylePropNames = propNames.reduce((keymirror, key) => {
//    if (typeof key !== "object" && typeof key !== "function") {
//       // @ts-ignore
//       keymirror[key] = key
//    }
//    return keymirror
// }, {})
//
// interface StyleResolverProps extends SystemProps {
//
//    __css?: SystemStyleObject
//
//    sx?: SystemStyleObject
//
//    theme: Dictionary
//
//    css?: CSSObject
//
//    noOfLines?: ResponsiveValue<number>
//
//    isTruncated?: boolean
//
//    layerStyle?: string
//
//    textStyle?: string
//
//    apply?: ResponsiveValue<string>
// }
//
// type StyleResolver = (params: {
//    baseStyle?: SystemStyleObject
// }) => FunctionInterpolation<StyleResolverProps>
//
// /**
//  * Style resolver function that manages how style props are merged
//  * in combination with other possible ways of defining styles.
//  *
//  * For example, take a component defined this way:
//  * ```jsx
//  * <Box fontSize="24px" sx={{ fontSize: "40px" }}></Box>
//  * ```
//  *
//  * We want to manage the priority of the styles properly to prevent unwanted
//  * behaviors. Right now, the `sx` prop has the highest priority so the resolved
//  * fontSize will be `40px`
//  */
// export const styleResolver: StyleResolver & Dictionary = ({ baseStyle }) => (props) => {
//    const {
//       theme,
//       layerStyle,
//       textStyle,
//       apply,
//       noOfLines,
//       isTruncated,
//       css: cssProp,
//       __css,
//       sx,
//       ...rest
//    } = props
//
//    const _layerStyle = get(theme, `layerStyles.${layerStyle}`, {})
//    const _textStyle = get(theme, `textStyles.${textStyle}`, {})
//
//    // filter out props that aren't style props
//    const styleProps = objectFilter(rest, (_, prop) => prop in stylePropNames)
//
//    let truncateStyle: any = {}
//
//    if (noOfLines != null) {
//       truncateStyle = {
//          overflow: "hidden",
//          textOverflow: "ellipsis",
//          display: "-webkit-box",
//          WebkitBoxOrient: "vertical",
//          WebkitLineClamp: noOfLines,
//       }
//    } else if (isTruncated) {
//       truncateStyle = {
//          overflow: "hidden",
//          textOverflow: "ellipsis",
//          whiteSpace: "nowrap",
//       }
//    }
//
//    /**
//     * The computed, theme-aware style object. The other of the properties
//     * within `objectAssign` determines how styles are overridden.
//     */
//    const finalStyles = objectAssign(
//       {},
//       __css,
//       baseStyle,
//       { apply },
//       _layerStyle,
//       _textStyle,
//       truncateStyle,
//       styleProps,
//       sx,
//    )
//
//    // Converts theme-aware style object to real css object
//    const computedCSS = css(finalStyles)(props.theme)
//
//    // Merge the computed css object with styles in css prop
//    const cssObject: Interpolation<StyleResolverProps> = objectAssign(
//       computedCSS,
//       isFunction(cssProp) ? cssProp(theme) : cssProp,
//    )
//
//    return cssObject
// }
//
// interface StyledOptions {
//    shouldForwardProp?(prop: string): boolean
//
//    label?: string
//    baseStyle?: SystemStyleObject
// }
//
// export function styled<T extends As, P = {}>(component: T, options?: StyledOptions) {
//
//    const { baseStyle, ...styledOptions } = options ?? {}
//    const opts = { ...styledOptions, shouldForwardProp }
//
//    const styledFn = emotionStyled(component as React.ComponentType<any>, opts)
//    const args = styleResolver({ baseStyle })
//    const StyledComponent: any = styledFn(args)
//
//    return StyledComponent as ChalkComponent<T, P>
// }
//
// export type HTMLChalkComponents = {
//    [Tag in DOMElements]: ChalkComponent<Tag, {}>
// }
//
// export type HTMLChalkProps<T extends As> = Omit<PropsOf<T>,
//    T extends "svg"
//       ? "ref" | "children" | keyof ChalkStyleProps
//       : "ref" | keyof ChalkStyleProps> &
//    ChalkProps & { as?: As }
//
// type ChalkFactory = {
//    <T extends As, P = {}>(
//       component: T,
//       options?: StyledOptions,
//    ): ChalkComponent<T, P>
// }
//
// /**
//  * Chalk component
//  * @type {ChalkFactory & HTMLChalkComponents}
//  */
// export const chalk = (styled as unknown) as ChalkFactory & HTMLChalkComponents
//
// /**
//  * Inject each tag into chalk component
//  */
// domElements.forEach((tag) => {
//    // @ts-expect-error
//    chalk[tag] = chalk(tag)
// })
