import * as React from "react"
import {
   chalk, forwardRef, HTMLChalkProps,
   omitThemingProps, ThemingProps, useStyleConfig, useTheme,
}                 from '../../System'
import { cx }     from '../../Utils'


interface BadgeOptions {
   pill?: boolean
}

export interface BadgeProps
   extends HTMLChalkProps<"span">,
      BadgeOptions,
      ThemingProps<"Badge"> {
}

/**
 * React component used to display notifications, messages, or
 * statuses in different shapes and sizes.
 */
export const Badge = forwardRef<BadgeProps, "span">((props, ref) => {
   const theme = useTheme()
   const styles = useStyleConfig("Badge", props)
   const { className, pill, ...rest } = omitThemingProps(props)
   
   return (
      <chalk.span
         ref={ref}
         className={cx("chalk-badge", props.className)}
         {...rest}
         theme={theme}
         __css={{
            display: "inline-block",
            whiteSpace: "nowrap",
            verticalAlign: "middle",
            ...styles,
         }}
      />
   )
})

