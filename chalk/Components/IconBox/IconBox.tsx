import {
   chalk, forwardRef, HTMLChalkProps, omitThemingProps,
   ThemingProps, useStyleConfig, useTheme,
}                 from '../../System'
import { cx }     from '../../Utils'
import * as React from 'react'


interface IconBoxOptions {
   icon?: React.ReactElement
   
   isCircular?: boolean
   
   isFullWidth?: boolean
}

export interface IconBoxProps
   extends HTMLChalkProps<"span">,
      IconBoxOptions,
      ThemingProps<"IconBox"> {
}

/**
 * React component used to display notifications, messages, or
 * statuses in different shapes and sizes.
 */
export const IconBox = forwardRef<IconBoxProps, "span">((props, ref) => {
   const theme = useTheme()
   const styles = useStyleConfig("IconBox", props)
   const { className, icon, isCircular = false, isFullWidth, ...rest }: any = omitThemingProps(props)

   return (
      <chalk.span
         ref={ref}
         className={cx("chalk-icon__box", props.className)}
         theme={theme}
         {...rest}
         __css={{
            display: "inline-flex",
            ...styles,
         }}
      >
         {icon}
      </chalk.span>
   )
})

