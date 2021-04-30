import {
   FormControlOptions,
   useFormControl,
} from "../FormControl"
import {
   chalk,
   forwardRef,
   omitThemingProps,
   ThemingProps,
   useMultiStyleConfig,
   HTMLChalkProps,
   useTheme,
} from "../../System"
import {
   cx,
} from "../../Utils"
import * as React from "react"

interface InputOptions {
   /**
    * The border color when the input is focused. Use color keys in `theme.colors`
    * @example
    * focusBorderColor = "blue.500"
    */
   focusBorderColor?: string
   /**
    * The border color when the input is invalid. Use color keys in `theme.colors`
    * @example
    * errorBorderColor = "red.500"
    */
   errorBorderColor?: string
   /**
    * If `true`, the input element will span the full width of its parent
    *
    * @deprecated
    * This component defaults to 100% width,
    *  please use the props `maxWidth` or `width` to configure
    */
   isFullWidth?: boolean
}

type Omitted = "disabled" | "required" | "readOnly" | "size"

export interface InputProps
   extends Omit<HTMLChalkProps<"input">, Omitted>,
      InputOptions,
      ThemingProps<"Input">,
      FormControlOptions {
}

/**
 * Input
 *
 * Element that allows users enter single valued data.
 */
export const Input = forwardRef<InputProps, "input">((props, ref) => {
   const styles = useMultiStyleConfig("Input", props)
   const ownProps = omitThemingProps(props)
   const input = useFormControl<HTMLInputElement>(ownProps)
   const _className = cx("chalk-input", props.className)
   const theme = useTheme()
   return (
      <chalk.input
         theme={theme}
         {...input}
         __css={styles.field}
         ref={ref}
         className={_className}
      />
   )
})



// This is used in `input-group.tsx`
Input.id = "Input"
