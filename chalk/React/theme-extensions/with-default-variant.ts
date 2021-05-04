import { ThemingProps } from "../../System"
import {
   Dict,
   isObject,
}                       from "../../Utils"
import {
   mergeThemeOverride,
   ThemeExtension,
}                       from "../ExtendedTheme"

export function withDefaultVariant({
                                      variant,
                                      components,
                                   }: {
   variant: ThemingProps["variant"]
   components?: string[] | Dict
}): ThemeExtension {
   return (theme) => {
      let names = Object.keys(theme.components || {})
      
      if (Array.isArray(components)) {
         names = components
      } else if (isObject(components)) {
         names = Object.keys(components)
      }
      
      return mergeThemeOverride(theme, {
         components: Object.fromEntries(
            names.map((componentName) => {
               const withVariant = {
                  defaultProps: {
                     variant,
                  },
               }
               return [componentName, withVariant]
            }),
         ),
      })
   }
}
