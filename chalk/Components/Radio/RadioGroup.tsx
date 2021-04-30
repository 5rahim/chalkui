import * as React                                                    from "react"
import { useRadioGroup, UseRadioGroupProps, UseRadioGroupReturn }    from './UseRadioGroup'
import { chalk, forwardRef, HTMLChalkProps, ThemingProps, useTheme } from '../../System'
import { cx }                                                        from '../../Utils'
import { createContext }                                             from '../ReactUtils'

export interface RadioGroupContext
   extends Pick<UseRadioGroupReturn, "onChange" | "value" | "name">,
      Omit<ThemingProps<"Radio">, "orientation"> {
}

const [
   RadioGroupProvider,
   useRadioGroupContext,
] = createContext<RadioGroupContext>({
   name: "RadioGroupContext",
   strict: false,
})

export { useRadioGroupContext }

type Omitted =
   | "onChange"
   | "value"
   | "defaultValue"
   | "defaultChecked"
   | "children"

export interface RadioGroupProps
   extends UseRadioGroupProps,
      Omit<HTMLChalkProps<"div">, Omitted>,
      Omit<ThemingProps<"Radio">, "orientation"> {
   children: React.ReactNode
}

/**
 * Used for multiple radios which are bound in one group,
 * and it indicates which option is selected.
 *
 * @see Docs https://chalk-ui.com/docs/form/radio
 */
export const RadioGroup = forwardRef<RadioGroupProps, "div">((props, ref) => {
   const theme = useTheme()
   const { colorScheme, size, variant, children, className, ...rest } = props
   
   const { value, onChange, getRootProps, name, htmlProps } = useRadioGroup(rest)
   
   const group = React.useMemo(
      () => ({
         name,
         size,
         onChange,
         colorScheme,
         value,
         variant,
      }),
      [size, name, onChange, colorScheme, value, variant],
   )
   
   const groupProps = getRootProps(htmlProps, ref)
   const _className = cx("chalk-radio-group", className)
   
   return (
      <RadioGroupProvider value={group}>
         <chalk.div theme={theme} {...groupProps} className={_className}>
            {children}
         </chalk.div>
      </RadioGroupProvider>
   )
})
