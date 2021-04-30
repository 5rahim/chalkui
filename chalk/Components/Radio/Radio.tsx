import {
   chalk, forwardRef, HTMLChalkProps, layoutPropNames,
   omitThemingProps, SystemProps, SystemStyleObject, ThemingProps, useMultiStyleConfig, useTheme,
} from "../../System"
import * as React                  from "react"
import { callAll, split }          from '../../Utils'
import { useRadio, UseRadioProps } from './UseRadio'
import { useRadioGroupContext }    from './RadioGroup'

type Omitted = "onChange" | "defaultChecked" | "checked"

interface BaseControlProps extends Omit<HTMLChalkProps<"div">, Omitted> {
}

export interface RadioProps
   extends UseRadioProps,
      ThemingProps<"Radio">,
      BaseControlProps {
   /**
    * The spacing between the checkbox and its label text
    * @default 0.5rem
    * @type SystemProps["marginLeft"]
    */
   spacing?: SystemProps["marginLeft"]
   /**
    * If `true`, the radio will occupy the full width of its parent container
    *
    * @deprecated
    * This component defaults to 100% width,
    * please use the props `maxWidth` or `width` to configure
    */
   isFullWidth?: boolean
}

/**
 * Radio component is used in forms when a user needs to select a single value from
 * several options.
 *
 * @see Docs https://chalk-ui.com/docs/form/radio
 */
export const Radio = forwardRef<RadioProps, "input">((props, ref) => {
   const theme = useTheme()
   const { onChange: onChangeProp, value: valueProp } = props
   
   const group = useRadioGroupContext()
   const styles = useMultiStyleConfig("Radio", { ...group, ...props })
   
   const {
      spacing = "0.5rem",
      children,
      isFullWidth,
      ...rest
   }: any = omitThemingProps(props)
   
   let isChecked = props.isChecked
   if (group?.value != null && valueProp != null) {
      isChecked = group.value === valueProp
   }
   
   let onChange = onChangeProp
   if (group?.onChange && valueProp != null) {
      onChange = callAll(group.onChange, onChangeProp)
   }
   
   const name = props?.name ?? group?.name
   
   const {
      getInputProps,
      getCheckboxProps,
      getLabelProps,
      htmlProps,
   } = useRadio({
      ...rest,
      isChecked,
      onChange,
      name,
   })
   
   const [layoutProps, otherProps] = split(htmlProps, layoutPropNames as any)
   
   const checkboxProps = getCheckboxProps(otherProps)
   const inputProps = getInputProps({}, ref)
   const labelProps = getLabelProps()
   
   const rootStyles = {
      width: isFullWidth ? "full" : undefined,
      display: "inline-flex",
      alignItems: "center",
      verticalAlign: "top",
      ...styles.container,
   }
   
   const checkboxStyles = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      ...styles.control,
   }
   
   const labelStyles: SystemStyleObject = {
      userSelect: "none",
      marginLeft: spacing,
      ...styles.label,
   }
   
   return (
      <chalk.label theme={theme} className="chalk-radio" {...layoutProps} __css={rootStyles}>
         <input className="chalk-radio__input" {...inputProps} />
         <chalk.span
            theme={theme}
            className="chalk-radio__control"
            {...checkboxProps}
            __css={checkboxStyles}
         />
         {children && (
            <chalk.span
               theme={theme}
               className="chalk-radio__label"
               {...labelProps}
               __css={labelStyles}
            >
               {children}
            </chalk.span>
         )}
      </chalk.label>
   )
})

