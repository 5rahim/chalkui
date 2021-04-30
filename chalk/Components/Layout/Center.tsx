import { chalk, forwardRef, HTMLChalkProps, useTheme } from '../../System'
import { cx }                                          from '../../Utils'
import React                                           from 'react'

export interface CenterProps extends HTMLChalkProps<"div"> {
}

/**
 * React component used to horizontally and vertically center its child.
 * It uses the popular `display: flex` centering technique.
 */
export const Center = forwardRef<CenterProps, "div">((props, ref) => {
   const theme = useTheme()
   const { className, ...rest } = props
   return (
      <chalk.div
         ref={ref}
         className={cx("chalk-center", className)}
         theme={theme}
         __css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
         }}
         {...rest}
      />
   )
})
