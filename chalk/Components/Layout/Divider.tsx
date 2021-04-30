import * as React from "react"
import {
   chalk, forwardRef, HTMLChalkProps,
   omitThemingProps, ThemingProps, useStyleConfig,
}                 from '../../System'
import { cx }     from '../../Utils'

/**
 * Layout component used to visually separate content in a list or group.
 * It display a thin horizontal or vertical line, and renders a `hr` tag.
 */
export const Divider = forwardRef<DividerProps, "hr">((props, ref) => {
   const {
      borderLeftWidth,
      borderBottomWidth,
      borderTopWidth,
      borderRightWidth,
      borderWidth,
      borderStyle,
      borderColor,
      ...styles
   } = useStyleConfig("Divider", props)
   const {
      className,
      orientation = "horizontal",
      __css,
      ...rest
   }: any = omitThemingProps(props)
   
   const dividerStyles: any = {
      vertical: {
         borderLeftWidth:
            borderLeftWidth || borderRightWidth || borderWidth || "1px",
         height: "100%",
      },
      horizontal: {
         borderBottomWidth:
            borderBottomWidth || borderTopWidth || borderWidth || "1px",
         width: "100%",
      },
   }
   
   return (
      <chalk.hr
         ref={ref}
         role="separator"
         aria-orientation={orientation}
         {...rest}
         __css={{
            ...styles,
            border: "0",
            
            borderColor,
            borderStyle,
            ...dividerStyles[orientation],
            ...__css,
         }}
         className={cx("chalk-divider", className)}
      />
   )
})

export interface DividerProps
   extends HTMLChalkProps<"div">,
      ThemingProps<"Divider"> {
   orientation?: "horizontal" | "vertical"
}
