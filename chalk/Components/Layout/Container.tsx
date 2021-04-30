import { chalk, forwardRef, HTMLChalkProps, omitThemingProps, ThemingProps, useStyleConfig, useTheme } from '../../System'
import { cx }                                                                                          from '../../Utils'
import React                                                                                 from 'react'

export interface ContainerProps
   extends HTMLChalkProps<"div">, ThemingProps<"Container"> {
   /**
    * If `true`, container will center its children
    * regardless of their width.
    */
   centerContent?: boolean
}

/**
 * Layout component used to wrap app or website content
 *
 * It sets `margin-left` and `margin-right` to `auto`,
 * to keep its content centered.
 *
 * It also sets a default max-width of `60ch` (60 characters).
 */
export const Container = forwardRef<ContainerProps, "div">((props, ref) => {
   const theme = useTheme()
   const { className, centerContent, ...rest } = omitThemingProps(props)
   
   const styles = useStyleConfig("Container", props)
   
   return (
      <chalk.div
         ref={ref}
         className={cx("chalk-container", className)}
         theme={theme}
         {...rest}
         __css={{
            ...styles,
            ...(centerContent as any && {
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
            }),
         }}
      />
   )
})
