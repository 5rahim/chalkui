import {
   chalk,
   forwardRef,
   HTMLChalkProps,
   omitThemingProps,
   ThemingProps,
   useStyleConfig,
   useStyles,
   useTheme,
} from "../../System"
import {
   cx,
   __DEV__,
}                                from "../../Utils"
import * as React                from "react"
import { useFormControlContext } from "./FormControl"

export interface FormLabelProps
   extends HTMLChalkProps<"label">,
      ThemingProps<"FormLabel"> {
   /**
    * @type React.ReactElement
    */
   requiredIndicator?: React.ReactElement
}

/**
 * Used to enhance the usability of form controls.
 *
 * It is used to inform users as to what information
 * is requested for a form field.
 *
 * ♿️ Accessibility: Every form field should have a form label.
 */
export const FormLabel = forwardRef<FormLabelProps, "label">(
   (passedProps, ref) => {
      const styles = useStyleConfig("FormLabel", passedProps)
      const props = omitThemingProps(passedProps)
      const theme = useTheme()
      const {
         className,
         children,
         requiredIndicator = <RequiredIndicator />,
         ...rest
      } = props
      
      const field = useFormControlContext()
      
      return (
         <chalk.label
            theme={theme}
            {...field?.getLabelProps(rest, ref)}
            className={cx("chalk-form__label", props.className)}
            __css={{
               display: "block",
               textAlign: "left",
               ...styles,
            }}
         >
            {children}
            {field?.isRequired ? requiredIndicator : null}
         </chalk.label>
      )
   },
)




export interface RequiredIndicatorProps extends HTMLChalkProps<"span"> {
}

/**
 * Used to show a "required" text or an asterisks (*) to indicate that
 * a field is required.
 */
export const RequiredIndicator = forwardRef<RequiredIndicatorProps, "span">(
   (props, ref) => {
      const field = useFormControlContext()
      const styles = useStyles()
      const theme = useTheme()
      if (!field?.isRequired) return null
      
      const className = cx("chalk-form__required-indicator", props.className)
      
      return (
         <chalk.span
            theme={theme}
            {...field?.getRequiredIndicatorProps(props, ref)}
            __css={styles.requiredIndicator}
            className={className}
         />
      )
   },
)

