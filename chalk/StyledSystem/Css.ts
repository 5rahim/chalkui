import {
   Dictionary,
   isArray,
   isCustomBreakpoint,
   isObject,
   isResponsiveObjectLike,
   memoizedGet as get,
   mergeWith,
   objectToArrayNotation,
   runIfFn,
}                                     from "../Utils"
import { CSSObject, StyleObjectOrFn } from "./Css.types"
import { parser }                     from "./Parser"
import { pseudoSelectors }            from "./Pseudo"
import { useChalk }                   from '../System'
import Theme                          from '../Theme/Foundations'

interface Cache {
   themeBreakpoints: string[]
   breakpoints: string[]
   breakpointValues: string[]
   mediaQueries: (string | null)[]
}

const cache: Cache = {
   themeBreakpoints: [],
   breakpoints: [],
   breakpointValues: [],
   mediaQueries: [],
}

interface BreakpointValueObj {
   /**
    * left side of a breakpoint object, the name, e.g. sm
    */
   breakpoints: string[]
   /**
    * right side of a breakpoint object, the size, e.g. 4
    */
   breakpointValues: string[]
}

/**
 *
 */
const calculateBreakpointAndMediaQueries = (
   themeBreakpoints: string[] = [],
) => {
   // caching here reduces execution time by factor 4-6x
   const isCached = cache.themeBreakpoints === themeBreakpoints
   
   if (isCached) {
      return cache
   }
   
   const { breakpoints, breakpointValues } =
      Object.entries(themeBreakpoints)
            .filter(([key]) => isCustomBreakpoint(key))
            .reduce<BreakpointValueObj>(
               (carry, [breakpoint, value]) => {
                  carry.breakpoints.push(breakpoint)
                  carry.breakpointValues.push(value)
            
                  return carry
               },
               {
                  breakpoints: [],
                  breakpointValues: [],
               },
            )
   
   const mediaQueries = [
      null,
      ...breakpointValues
         .map((bp) => `@media screen and (min-width: ${bp})`)
         .slice(1),
   ]
   
   cache.themeBreakpoints = themeBreakpoints
   cache.mediaQueries = mediaQueries
   cache.breakpointValues = breakpointValues
   cache.breakpoints = breakpoints
   
   return {
      breakpoints,
      mediaQueries,
   }
}

const responsive = (styles: any) => (theme: Dictionary) => {
   const computedStyles: any = {}
   
   const { breakpoints, mediaQueries } = calculateBreakpointAndMediaQueries(
      theme.breakpoints,
   )
   
   for (const key in styles) {
      let value = runIfFn(styles[key], theme)
      
      if (value == null) {
         continue
      }
      
      value = isResponsiveObjectLike(value, breakpoints)
         ? objectToArrayNotation(value, breakpoints)
         : value
      
      if (!isArray(value)) {
         computedStyles[key] = value
         continue
      }
      
      const queries = value.slice(0, mediaQueries.length).length
      
      for (let index = 0; index < queries; index += 1) {
         const media = mediaQueries[index]
         
         if (!media) {
            computedStyles[key] = value[index]
            continue
         }
         
         computedStyles[media] = computedStyles[media] || {}
         
         if (value[index] == null) {
            continue
         }
         
         computedStyles[media][key] = value[index]
      }
   }
   
   return computedStyles
}

type PropsOrTheme = Dictionary | { theme: Dictionary }

/**
 * Converts theme-aware style object to real css object
 * @param {StyleObjectOrFn} args
 * @returns {(props?: PropsOrTheme) => CSSObject}
 */
export const css = (args: StyleObjectOrFn = {}) => {
   
   return function (props: PropsOrTheme = {}) {
      
      const theme = "theme" in props ? props.theme : props
      
      let computedStyles: CSSObject = {}
      
      const styleObject = runIfFn(args, theme)
      const styles = responsive(styleObject)(theme) // Get the styles
      
      for (const k in styles) { // Compute the styles and apply the theme-specific value
         const x = styles[k]
         const val = runIfFn(x, theme)
         
         const key = k in pseudoSelectors ? pseudoSelectors[k] : k
         const config = (parser.config as Dictionary)[key]
         
         if (key === "apply") {
            const apply = css(get(theme, val))(theme)
            computedStyles = mergeWith({}, computedStyles, apply)
            continue
         }
         
         if (isObject(val)) {
            computedStyles[key] = css(val)(theme)
            continue
         }
         
         const scale = get(theme, config?.scale, {})
         const value = config?.transform?.(val, scale) ?? get(scale, val, val)
         
         if (config?.properties) {
            for (const property of config.properties) {
               computedStyles[property] = value
            }
            continue
         }
         
         if (config?.property) {
            computedStyles[config.property] = value
            continue
         }
         
         computedStyles[key] = value
      }
      
      return computedStyles
   }
   
}
