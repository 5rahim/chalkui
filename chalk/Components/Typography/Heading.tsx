import {
   chalk, forwardRef, omitThemingProps,
   ThemingProps, useStyleConfig,
   HTMLChalkProps, useTheme,
}                 from "../../System"
import { cx }     from "../../Utils"
import * as React from "react"

export interface HeadingOptions {

}

export interface HeadingProps extends HeadingOptions, HTMLChalkProps<"h2">, ThemingProps<"Heading"> {
}

/**
 * Heading Component
 *
 * @description:
 */
export const Heading = forwardRef<HeadingProps, "h2">((props, ref) => {
   
   const styles = useStyleConfig("Heading", props)
   
   const theme = useTheme()
   
   const { className, ...rest } = omitThemingProps(props)
   
   return (
      <chalk.h2
         ref={ref}
         className={cx("chalk-heading", className)}
         {...rest}
         __css={styles}
         theme={theme}
      />
   )
})
