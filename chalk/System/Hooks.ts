import { useColorMode }      from "../ColorMode"
import { SystemStyleObject } from "../StyledSystem"
import {
   Dictionary,
   filterUndefined,
   memoizedGet as get,
   mergeWith,
   runIfFn,
   StringOrNumber,
}                            from "../Utils"
import {
   useMemo,
   useRef,
}                            from "react"
import isEqual               from "react-fast-compare"
import { useTheme }          from "./Providers"
import { ThemingProps }      from "./System.types"
import { omitThemingProps }  from "./System.utils"

export function useChalk<T extends Dictionary = Dictionary>() {
   const colorModeResult = useColorMode()
   const theme = useTheme() as T
   return { ...colorModeResult, theme }
}

export function useToken<T extends StringOrNumber>(
   scale: string,
   token: T | T[],
   fallback?: T | T[],
) {
   const theme = useTheme()
   
   if (Array.isArray(token)) {
      let fallbackArr: T[] = []
      if (fallback) {
         fallbackArr = Array.isArray(fallback) ? fallback : [fallback]
      }
      
      return token.map((token, index) => {
         const path = `${scale}.${token}`
         return get(theme, path, fallbackArr[index] ?? token)
      })
   }
   
   const path = `${scale}.${token}`
   return get(theme, path, fallback ?? token)
}

export function useProps<P extends ThemingProps>(
   themeKey: string,
   props: P,
   isMulti: true,
): {
   styles: Record<string, SystemStyleObject>
   props: Omit<P, keyof ThemingProps>
}

export function useProps<P extends ThemingProps>(
   themeKey: string,
   props?: P,
   isMulti?: boolean,
): {
   styles: SystemStyleObject
   props: Omit<P, keyof ThemingProps>
}

export function useProps(themeKey: string, props: Dictionary) {
   const { theme, colorMode } = useChalk()
   
   const styleConfig = (props.styleConfig || theme.components?.[themeKey]) as
      | Dictionary
      | undefined
   
   const defaultProps = styleConfig?.defaultProps ?? {}
   const propsWithDefault = { ...defaultProps, ...filterUndefined(props) }
   
   const stylesRef = useRef<Dictionary>({})
   
   const mergedProps = mergeWith({}, propsWithDefault, { theme, colorMode })
   
   const memoizedStyles = useMemo(() => {
      if (styleConfig) {
         const baseStyles = runIfFn(styleConfig.baseStyle ?? {}, mergedProps)
         
         const variants = runIfFn(
            styleConfig.variants?.[mergedProps.variant as string] ?? {},
            mergedProps,
         )
         
         const sizes = runIfFn(
            styleConfig.sizes?.[mergedProps.size as string] ?? {},
            mergedProps,
         )
         
         const styles = mergeWith(baseStyles, sizes, variants)
         
         if (styleConfig.parts) {
            styleConfig.parts.forEach((part: string) => {
               styles[part] = styles[part] ?? {}
            })
         }
         
         const isStyleEqual = isEqual(stylesRef.current, styles)
         
         if (!isStyleEqual) {
            stylesRef.current = styles
         }
      }
      
      return stylesRef.current
   }, [styleConfig, mergedProps])
   
   return {
      styles: memoizedStyles,
      props: omitThemingProps(propsWithDefault),
   }
}
