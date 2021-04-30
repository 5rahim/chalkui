import * as React                                                                                      from "react"
import { chalk, forwardRef, HTMLChalkProps, omitThemingProps, ThemingProps, useStyleConfig, useTheme } from '../../System'
import { cx }                                                                                          from '../../Utils'

export interface LinkProps extends HTMLChalkProps<"a">, ThemingProps<"Link"> {
   /**
    *  If `true`, the link will open in new tab
    */
   isExternal?: boolean
}

/**
 * Links are accessible elements used primarily for navigation.
 *
 * It integrates well with other routing libraries like
 * React Router, Reach Router and Next.js Link.
 *
 * @example
 *
 * ```jsx
 * <Link as={ReactRouterLink} to="/home">Home</Link>
 * ```
 */
export const Link = forwardRef<LinkProps, "a">((props, ref) => {
   const theme = useTheme()
   const styles = useStyleConfig("Link", props)
   const { className, isExternal, ...rest } = omitThemingProps(props)
   
   return (
      <chalk.a
         target={isExternal ? "_blank" : undefined}
         rel={isExternal ? "noopener noreferrer" : undefined}
         ref={ref}
         theme={theme}
         className={cx("chalk-link", className)}
         {...rest}
         __css={styles}
      />
   )
})
