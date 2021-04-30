import * as React from "react"
import {
   chalk, forwardRef, HTMLChalkProps,
   omitThemingProps, ThemingProps, useStyleConfig, useTheme,
} from '../../System'
import { cx }     from '../../Utils'

export interface KbdProps extends HTMLChalkProps<"kbd">, ThemingProps<"Kbd"> {
}

/**
 * Semantic component to render a keyboard shortcut
 * within an application.
 *
 * @example
 *
 * ```jsx
 * <Kbd>⌘ + T</Kbd>
 * ```
 */
export const Kbd = forwardRef<KbdProps, "kbd">((props, ref) => {
   const theme = useTheme()
   const styles = useStyleConfig("Kbd", props)
   const { className, ...rest } = omitThemingProps(props)
   
   return (
      <chalk.kbd
         ref={ref}
         className={cx("chalk-kbd", className)}
         theme={theme}
         {...rest}
         __css={{
            fontFamily: "mono",
            ...styles,
         }}
      />
   )
})
