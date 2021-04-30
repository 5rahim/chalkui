import { ResponsiveValue }            from '../../StyledSystem'
import { chalk, forwardRef, HTMLChalkProps } from '../../System'
import React                 from 'react'
import { cx, mapResponsive } from '../../Utils'

interface AspectRatioOptions {
   /**
    * The aspect ratio of the Box. Common values are:
    *
    * `21/9`, `16/9`, `9/16`, `4/3`, `1.85/1`
    */
   ratio?: ResponsiveValue<number>
}

export interface AspectRatioProps
   extends HTMLChalkProps<"div">,
      AspectRatioOptions {}

/**
 * React component used to cropping media (videos, images and maps)
 * to a desired aspect ratio.
 */
export const AspectRatio = forwardRef<AspectRatioProps, "div">((props, ref) => {
   const { ratio = 4 / 3, children, className, ...rest } = props
   
   // enforce single child
   const child = React.Children.only(children)
   
   return (
      <chalk.div
         ref={ref}
         position="relative"
         className={cx("chalk-aspect-ratio", className)}
         _before={{
            height: 0,
            content: `""`,
            display: "block",
            paddingBottom: mapResponsive(ratio, (r) => `${(1 / r) * 100}%`),
         }}
         __css={{
            "& > *": {
               overflow: "hidden",
               position: "absolute",
               top: "0",
               right: "0",
               bottom: "0",
               left: "0",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               width: "100%",
               height: "100%",
            },
            "& > img, & > video": {
               objectFit: "cover",
            },
         }}
         {...rest}
      >
         {child}
      </chalk.div>
   )
})
