import * as React                                                                                               from "react"
import { keyframes }                                                                                                      from '@emotion/css'
import { chalk, forwardRef, HTMLChalkProps, omitThemingProps, SystemStyleObject, ThemingProps, useStyleConfig, useTheme } from '../../System'
import { cx }                                                                                                             from '../../Utils'
import { VisuallyHidden }                                                                                       from '../VisuallyHidden'

const spin = keyframes({
   "0%": {
      transform: "rotate(0deg)",
   },
   "100%": {
      transform: "rotate(360deg)",
   },
})

interface SpinnerOptions {
   /**
    * The color of the empty area in the spinner
    */
   emptyColor?: string
   /**
    * The color of the spinner
    */
   color?: string
   /**
    * The thickness of the spinner
    * @example
    * ```jsx
    * <Spinner thickness="4px"/>
    * ```
    */
   thickness?: string
   /**
    * The speed of the spinner.
    * @example
    * ```jsx
    * <Spinner speed="0.2s"/>
    * ```
    */
   speed?: string
   /**
    * For accessibility, it is important to add a fallback loading text.
    * This text will be visible to screen readers.
    */
   label?: string
}

export interface SpinnerProps
   extends Omit<HTMLChalkProps<"div">, keyof SpinnerOptions>,
      SpinnerOptions,
      ThemingProps<"Spinner"> {}

/**
 * Spinner is used to indicate the loading state of a page or a component,
 * It renders a `div` by default.
 */
export const Spinner = forwardRef<SpinnerProps, "div">((props, ref) => {
   const theme = useTheme()
   const styles = useStyleConfig("Spinner", props)
   
   const {
      label = "Loading...",
      thickness = "2px",
      speed = "0.45s",
      color,
      emptyColor = "transparent",
      className,
      ...rest
   }: any = omitThemingProps(props)
   
   const _className = cx("chalk-spinner", className)
   
   const spinnerStyles: SystemStyleObject = {
      display: "inline-block",
      borderColor: "currentColor",
      borderStyle: "solid",
      borderRadius: "99999px",
      borderWidth: thickness,
      borderBottomColor: emptyColor,
      borderLeftColor: emptyColor,
      color,
      animation: `${spin} ${speed} linear infinite`,
      ...styles,
   }
   
   return (
      <chalk.div
         ref={ref}
         __css={spinnerStyles}
         className={_className}
         theme={theme}
         {...rest}
      >
         {label && <VisuallyHidden>{label}</VisuallyHidden>}
      </chalk.div>
   )
})

