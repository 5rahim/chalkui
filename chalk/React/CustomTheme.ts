import defaultTheme, { Theme } from "../Theme"
import { isFunction, mergeWith } from "../Utils"

/**
 * Function to override or customize the Chalk theme conveniently
 * @param overrides - Your custom theme object overrides
 */
export function customTheme<T extends Theme | Record<string, any>>(
   overrides: T,
) {
   function customizer(source: unknown, override: unknown) {
      if (isFunction(source)) {
         return (...args: unknown[]) => {
            const sourceValue = source(...args)
            
            const overrideValue = isFunction(override)
               ? override(...args)
               : override
            
            return mergeWith({}, sourceValue, overrideValue, customizer)
         }
      }
      
      // fallback to default behaviour
      return undefined
   }
   
   return mergeWith({}, defaultTheme, overrides, customizer)
}
