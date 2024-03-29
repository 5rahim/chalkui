import {
   FormControlOptions,
   useFormControl,
}                 from "../FormControl"
import {
   chalk,
   forwardRef,
   omitThemingProps,
   SystemStyleObject,
   ThemingProps,
   useStyleConfig,
   HTMLChalkProps,
   useTheme,
} from "../../System"
import {
   cx,
   omit,
}                 from "../../Utils"
import * as React from "react"

interface TextareaOptions {
   /**
    * The border color when the textarea is focused. Use color keys in `theme.colors`
    * @example
    * focusBorderColor = "blue.500"
    */
   focusBorderColor?: string
   /**
    * The border color when the textarea is invalid. Use color keys in `theme.colors`
    * @example
    * errorBorderColor = "red.500"
    */
   errorBorderColor?: string
   /**
    * If `true`, the textarea element will span the full width of its parent
    *
    * @deprecated
    * This component defaults to 100% width,
    * please use the props `maxWidth` or `width` to configure
    */
   isFullWidth?: boolean
}

type Omitted = "disabled" | "required" | "readOnly"

export interface TextareaProps
   extends Omit<HTMLChalkProps<"textarea">, Omitted>,
      TextareaOptions,
      FormControlOptions,
      ThemingProps<"Textarea"> {
}

/**
 * Textarea is used to enter an amount of text that's longer than a single line
 * @see Docs https://chalk-ui.com/docs/form/textarea
 */
export const Textarea = forwardRef<TextareaProps, "textarea">((props, ref) => {
   const styles = useStyleConfig("Textarea", props)
   const { className, rows, ...rest } = omitThemingProps(props)
   const theme = useTheme()
   const textareaProps = useFormControl<HTMLTextAreaElement>(rest)
   
   const omitted = [
      "h",
      "minH",
      "height",
      "minHeight",
   ] as (keyof SystemStyleObject)[]
   
   const textareaStyles = rows ? omit(styles, omitted) : styles
   
   return (
      <chalk.textarea
         theme={theme}
         ref={ref}
         rows={rows}
         {...textareaProps}
         className={cx("chalk-textarea", className)}
         __css={textareaStyles}
      />
   )
})
