
import * as React        from "react"
import {
  useCheckboxGroup,
  UseCheckboxGroupProps,
  UseCheckboxGroupReturn,
}                        from "./UseCheckboxGroup"
import { ThemingProps }  from '../../System'
import { createContext } from '../ReactUtils'

export interface CheckboxGroupProps
  extends UseCheckboxGroupProps,
    Omit<ThemingProps<"Checkbox">, "orientation"> {
  children?: React.ReactNode
}

export interface CheckboxGroupContext
  extends Pick<UseCheckboxGroupReturn, "onChange" | "value" | "isDisabled">,
    Omit<ThemingProps<"Checkbox">, "orientation"> {}

const [
  CheckboxGroupProvider,
  useCheckboxGroupContext,
] = createContext<CheckboxGroupContext>({
  name: "CheckboxGroupContext",
  strict: false,
})

export { useCheckboxGroupContext }

/**
 * Used for multiple checkboxes which are bound in one group,
 * and it indicates whether one or more options are selected.
 *
 * @see Docs https://chalk-ui.com/docs/form/checkbox
 */
export const CheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {
  const { colorScheme, size, variant, children, isDisabled } = props
  const { value, onChange } = useCheckboxGroup(props)

  const group = React.useMemo(
    () => ({
      size,
      onChange,
      colorScheme,
      value,
      variant,
      isDisabled,
    }),
    [size, onChange, colorScheme, value, variant, isDisabled],
  )

  return <CheckboxGroupProvider value={group}>{children}</CheckboxGroupProvider>
}
