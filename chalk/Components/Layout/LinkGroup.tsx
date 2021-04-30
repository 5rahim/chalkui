import * as React                            from "react"
import { chalk, forwardRef, HTMLChalkProps } from '../../System'
import { cx }                                from '../../Utils'

export interface LinkOverlayProps extends HTMLChalkProps<"a"> {
   /**
    *  If `true`, the link will open in new tab
    */
   isExternal?: boolean
}

export const LinkOverlay = forwardRef<LinkOverlayProps, "a">((props, ref) => {
   const { isExternal, target, rel, className, ...rest } = props
   return (
      <chalk.a
         {...rest}
         ref={ref}
         className={cx("chalk-linkbox__overlay", className)}
         rel={isExternal ? "noopener noreferrer" : rel}
         target={isExternal ? "_blank" : target}
         __css={{
            position: "static",
            "&::before": {
               content: "''",
               cursor: "inherit",
               display: "block",
               position: "absolute",
               top: 0,
               left: 0,
               zIndex: 0,
               width: "100%",
               height: "100%",
            },
         }}
      />
   )
})

export interface LinkBoxProps extends HTMLChalkProps<"div"> {}

/**
 * `LinkBox` is used to wrap content areas within a link while ensuring semantic html
 *
 * @see Docs https://www.chalk-ui.com/docs/link-overlay
 * @see Resources https://www.sarasoueidan.com/blog/nested-links
 */
export const LinkBox = forwardRef<LinkBoxProps, "div">((props, ref) => {
   const { className, ...rest } = props
   
   return (
      <chalk.div
         ref={ref}
         position="relative"
         {...rest}
         className={cx("chalk-linkbox", className)}
         __css={{
            /* Elevate the links and abbreviations up */
            "a[href]:not(.chalk-linkbox__overlay), abbr[title]": {
               position: "relative",
               zIndex: 1,
            },
         }}
      />
   )
})
