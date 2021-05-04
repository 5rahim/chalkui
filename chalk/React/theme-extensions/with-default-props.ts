import {
   ChalkTheme,
   ComponentDefaultProps,
}                                 from "../../Theme"
import {
   Dict,
   pipe,
}                                 from "../../Utils"
import {
   mergeThemeOverride,
   ThemeOverride,
}                                 from "../ExtendedTheme"
import { withDefaultColorScheme } from "./with-default-color-scheme"
import { withDefaultVariant }     from "./with-default-variant"
import { withDefaultSize }        from "./with-default-size"

export function withDefaultProps<BaseTheme extends ChalkTheme,
   Override extends ThemeOverride<BaseTheme>>({
                                                 defaultProps: { colorScheme, variant, size },
                                                 components,
                                              }: {
   defaultProps: ComponentDefaultProps
   components?: string[] | Dict
}) {
   const identity = <T>(t: T) => t
   const fns = [
      colorScheme
         ? withDefaultColorScheme({ colorScheme, components })
         : identity,
      size ? withDefaultSize({ size, components }) : identity,
      variant ? withDefaultVariant({ variant, components }) : identity,
   ]
   
   return (theme: Override) => mergeThemeOverride<BaseTheme>(pipe(...fns)(theme))
}
