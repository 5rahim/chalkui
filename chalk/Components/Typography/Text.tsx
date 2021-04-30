import {
   chalk, forwardRef, omitThemingProps,
   SystemProps, ThemingProps, useStyleConfig,
   HTMLChalkProps, useTheme,
}                                       from "../../System"
import { cx, filterUndefined } from "../../Utils"
import * as React                       from "react"

export interface TextOptions {
   /**
    * The CSS `text-align` property
    * @type SystemProps["textAlign"]
    */
   align?: SystemProps["textAlign"]
   /**
    * The CSS `text-decoration` property
    * @type SystemProps["textDecoration"]
    */
   decoration?: SystemProps["textDecoration"]
   /**
    * The CSS `text-transform` property
    * @type SystemProps["textTransform"]
    */
   casing?: SystemProps["textTransform"]
}

export interface TextProps extends TextOptions, HTMLChalkProps<"p">, ThemingProps {}

/**
 * Text Component
 *
 * @description: Used to render texts or paragraphs
 */
export const Text = forwardRef<TextProps, "p">(function (props, ref) {
   
   const styles = useStyleConfig("Text", props)
   
   const theme = useTheme()
   
   const { className, align, decoration, casing, ...rest } = omitThemingProps(props)
   
   const aliasedProps = filterUndefined({
      textAlign: props.align,
      textDecoration: props.decoration,
      textTransform: props.casing,
   })
   
   return (
      <chalk.p
         ref={ref}
         className={cx("chalk-text", props.className)}
         {...aliasedProps}
         {...rest}
         __css={styles}
         theme={theme}
      />
   )
})
