import * as React from "react"

import {
   useNumberInput,
   UseNumberInputProps,
   UseNumberInputReturn,
}                              from "./UseNumberInput"
import { createContext }       from '../ReactUtils'
import {
   chalk,
   forwardRef,
   HTMLChalkProps,
   omitThemingProps,
   StylesProvider,
   ThemingProps,
   useMultiStyleConfig,
   useStyles,
   useTheme,
} from '../../System'
import {
   TriangleDownIcon,
   TriangleUpIcon,
}                              from './Icons'
import { cx }                  from '../../Utils'
import { useFormControlProps } from '../FormControl'

interface NumberInputContext extends Omit<UseNumberInputReturn, "htmlProps"> {
}

/**
 * React context used to communicate between components
 */
const [
   NumberInputProvider,
   useNumberInputContext,
] = createContext<NumberInputContext>({
   name: "NumberInputContext",
   errorMessage:
      "useNumberInputContext: `context` is undefined. Seems you forgot to wrap number-input's components within <NumberInput />",
})

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
    * please use the props `maxWidth` or `width` to configure
    */
   isFullWidth?: boolean
}

export interface NumberInputProps
   extends UseNumberInputProps,
      ThemingProps<"NumberInput">,
      InputOptions,
      Omit<HTMLChalkProps<"div">, keyof UseNumberInputProps> {
}

/**
 * NumberInput
 *
 * React component that provides context and logic to all
 * number input sub-components.
 *
 * It renders a `div` by default.
 *
 * @see Docs http://chalk-ui.com/numberinput
 */
export const NumberInput = forwardRef<NumberInputProps, "div">((props, ref) => {
   const styles = useMultiStyleConfig("NumberInput", props)
   const theme = useTheme()
   const ownProps = omitThemingProps(props)
   const controlProps = useFormControlProps(ownProps)
   
   const { htmlProps, ...context } = useNumberInput(controlProps)
   const ctx = React.useMemo(() => context, [context])
   
   return (
      <NumberInputProvider value={ctx}>
         <StylesProvider value={styles}>
            <chalk.div
               theme={theme}
               {...htmlProps}
               ref={ref}
               className={cx("chalk-numberinput", props.className)}
               __css={{
                  position: "relative",
                  zIndex: 0,
                  ...styles.root,
               }}
            />
         </StylesProvider>
      </NumberInputProvider>
   )
})


export interface NumberInputStepperProps extends HTMLChalkProps<"div"> {
}

/**
 * NumberInputStepper
 *
 * React component used to group the increment and decrement
 * button spinners.
 *
 * It renders a `div` by default.
 *
 * @see Docs http://chalk-ui.com/components/number-input
 */
export const NumberInputStepper = forwardRef<NumberInputStepperProps, "div">(
   (props, ref) => {
      const styles = useStyles()
      const theme = useTheme()
      return (
         <chalk.div
            aria-hidden
            theme={theme}
            ref={ref}
            {...props}
            __css={{
               display: "flex",
               flexDirection: "column",
               position: "absolute",
               top: "0",
               // @ts-ignore
               right: "0px",
               margin: "1px",
               height: "calc(100% - 2px)",
               zIndex: 1,
               ...styles.stepperGroup,
            }}
         />
      )
   },
)


export interface NumberInputFieldProps extends HTMLChalkProps<"input"> {
}

/**
 * NumberInputField
 *
 * React component that represents the actual `input` field
 * where users can type to edit numeric values.
 *
 * It renders an `input` by default and ensures only numeric
 * values can be typed.
 *
 * @see Docs http://chalk-ui.com/numberinput
 */
export const NumberInputField = forwardRef<NumberInputFieldProps, "input">(
   (props, ref) => {
      const { getInputProps } = useNumberInputContext()
      const theme = useTheme()
      const input = getInputProps(props, ref)
      const styles = useStyles()
      
      return (
         <chalk.input
            theme={theme}
            {...input}
            className={cx("chalk-numberinput__field", props.className)}
            __css={{
               width: "100%",
               ...styles.field,
            }}
         />
      )
   },
)


export const StyledStepper = chalk("div", {
   baseStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      transition: "all 0.3s",
      userSelect: "none",
      cursor: "pointer",
      lineHeight: "normal",
   },
})

export interface NumberDecrementStepperProps extends HTMLChalkProps<"div"> {
}

/**
 * NumberDecrementStepper
 *
 * React component used to decrement the number input's value
 *
 * It renders a `div` with `role=button` by default
 */
export const NumberDecrementStepper = forwardRef<NumberDecrementStepperProps,
   "div">((props, ref) => {
   const styles = useStyles()
   const { getDecrementButtonProps } = useNumberInputContext()
   const decrement = getDecrementButtonProps(props, ref)
   const theme = useTheme()
   return (
      <StyledStepper theme={theme} {...decrement} __css={styles.stepper}>
         {props.children ?? <TriangleDownIcon />}
      </StyledStepper>
   )
})


export interface NumberIncrementStepperProps extends HTMLChalkProps<"div"> {
}

/**
 * NumberIncrementStepper
 *
 * React component used to increment the number input's value
 *
 * It renders a `div` with `role=button` by default
 */
export const NumberIncrementStepper = forwardRef<NumberIncrementStepperProps,
   "div">((props, ref) => {
   const { getIncrementButtonProps } = useNumberInputContext()
   const increment = getIncrementButtonProps(props, ref)
   const styles = useStyles()
   const theme = useTheme()
   
   return (
      <StyledStepper theme={theme} {...increment} __css={styles.stepper}>
         {props.children ?? <TriangleUpIcon />}
      </StyledStepper>
   )
})
