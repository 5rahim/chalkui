import {
   chalk,
   forwardRef,
   omitThemingProps,
   ThemingProps,
   useStyleConfig,
   HTMLChalkProps,
   useTheme,
}                           from "../../System"
import { cx }               from "../../Utils"
import { getValidChildren } from "../ReactUtils"
import * as React           from "react"
import {
   PinInputDescendantsProvider,
   PinInputProvider,
   usePinInput,
   usePinInputField,
   UsePinInputProps,
}                           from "./UsePinInput"
import { useEffect }        from 'react'

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
}

export interface PinInputProps
   extends UsePinInputProps,
      ThemingProps<"PinInput">,
      InputOptions {
   /**
    * The children of the pin input component
    */
   children: React.ReactNode
}

export const PinInput: React.FC<PinInputProps> = (props) => {
   const styles = useStyleConfig("PinInput", props)
   const theme = useTheme()
   const { children, ...rest } = omitThemingProps(props)
   const { descendants, ...context } = usePinInput(rest)
   
   const clones = getValidChildren(children).map((child) =>
      React.cloneElement(child, { __css: styles, theme: theme }),
   )
   
   return (
      <PinInputDescendantsProvider value={descendants}>
         <PinInputProvider value={context}>{clones}</PinInputProvider>
      </PinInputDescendantsProvider>
   )
}


export interface PinInputFieldProps extends HTMLChalkProps<"input"> {
}

export const PinInputField = forwardRef<PinInputFieldProps, "input">(
   (props, ref) => {
      const inputProps = usePinInputField(props, ref)
      const theme = useTheme()
      useEffect(() => {
         console.log(inputProps.id)
      }, [])
      return (
         <chalk.input
            theme={theme}
            {...inputProps}
            className={cx("chalk-pin-input", props.className)}
         />
      )
   },
)

