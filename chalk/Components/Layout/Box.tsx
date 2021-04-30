import { chalk, forwardRef, HTMLChalkProps, SystemStyleObject, useTheme } from '../../System'
import { cx }                                                             from '../../Utils'
import React                                           from 'react'

export interface BoxProps extends HTMLChalkProps<"div"> {
}

/**
 * Box is the most abstract component on top of which other chalk
 * components are built. It renders a `div` element by default.
 */
export const Box = forwardRef<BoxProps, "div">(function (props, ref) {
   const theme = useTheme()
   
   return <chalk.div ref={ref} className={cx("chalk-div", props.className)} theme={theme} {...props} />
   
})


/**
 * As a constraint, you can't pass size related props
 * Only `size` would be allowed
 */
type Omitted = "size" | "boxSize" | "width" | "height" | "w" | "h"

export interface SquareProps extends Omit<BoxProps, Omitted> {
   /**
    * The size (width and height) of the square
    */
   size?: BoxProps["width"]
   /**
    * If `true`, the content will be centered in the square
    */
   centerContent?: boolean
}

export const Square = forwardRef<SquareProps, "div">((props, ref) => {
   const theme = useTheme()
   const { size, centerContent = true, ...rest } = props
   
   const styles: SystemStyleObject = centerContent
      ? { display: "flex", alignItems: "center", justifyContent: "center" }
      : {}
   
   return (
      <Box
         ref={ref}
         boxSize={size}
         __css={{
            ...styles,
            flexShrink: 0,
            flexGrow: 0,
         }}
         theme={theme}
         {...rest}
      />
   )
})


export const Circle = forwardRef<SquareProps, "div">((props, ref) => {
   const { size, ...rest } = props
   return <Square size={size} ref={ref} borderRadius="9999px" {...rest} />
})
