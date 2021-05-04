import { isObject }   from "../Utils"
import { ChalkTheme } from "./Theme.types"

export const requiredChalkThemeKeys: (keyof ChalkTheme)[] = [
   "borders",
   "breakpoints",
   "colors",
   "components",
   "config",
   "direction",
   "fonts",
   "fontSizes",
   "fontWeights",
   "letterSpacings",
   "lineHeights",
   "radii",
   "shadows",
   "sizes",
   "space",
   "styles",
   "transition",
   "zIndices",
]

export function isChalkTheme(unit: unknown): unit is ChalkTheme {
   if (!isObject(unit)) {
      return false
   }
   
   return requiredChalkThemeKeys.every((propertyName) =>
      Object.prototype.hasOwnProperty.call(unit, propertyName),
   )
}
