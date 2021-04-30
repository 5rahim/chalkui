import {
   FormControlOptions,
   useFormControl,
} from "../FormControl"
import {
   chalk,
   forwardRef,
   layoutPropNames,
   omitThemingProps,
   PropsOf,
   SystemStyleObject,
   ThemingProps,
   useMultiStyleConfig,
   HTMLChalkProps,
   useTheme,
} from "../../System"
import {
   cx,
   mergeWith,
   split,
} from "../../Utils"
import * as React from "react"

type Omitted = "disabled" | "required" | "readOnly" | "size"

export interface SelectFieldProps
   extends Omit<HTMLChalkProps<"select">, Omitted> {
   isDisabled?: boolean
}

export const SelectField = forwardRef<SelectFieldProps, "select">(
   (props, ref) => {
      const { children, placeholder, className, ...rest }: any = props
      const ownProps = useFormControl<HTMLSelectElement>(rest)
      const theme = useTheme()
      
      return (
         <chalk.select
            theme={theme}
            {...ownProps}
            ref={ref}
            className={cx("chalk-select", className)}
         >
            {placeholder && <option value="">{placeholder}</option>}
            {children}
         </chalk.select>
      )
   },
)


interface RootProps extends Omit<HTMLChalkProps<"div">, "color"> {
}

interface SelectOptions extends FormControlOptions {
   /**
    * The border color when the select is focused. Use color keys in `theme.colors`
    * @example
    * focusBorderColor = "blue.500"
    */
   focusBorderColor?: string
   /**
    * The border color when the select is invalid. Use color keys in `theme.colors`
    * @example
    * errorBorderColor = "red.500"
    */
   errorBorderColor?: string
   /**
    * If `true`, the select element will span the full width of its parent
    *
    * @deprecated
    * This component defaults to 100% width,
    * please use the props `maxWidth` or `width` to configure
    */
   isFullWidth?: boolean
   /**
    * The placeholder for the select. We render an `<option/>` element that has
    * empty value.
    *
    * ```jsx
    * <option value="">{placeholder}</option>
    * ```
    */
   placeholder?: string
   /**
    * The size (width and height) of the icon
    */
   iconSize?: string
   /**
    * The color of the icon
    */
   iconColor?: string
}

export interface SelectProps
   extends SelectFieldProps,
      ThemingProps<"Select">,
      SelectOptions {
   /**
    * Props to forward to the root `div` element
    */
   rootProps?: RootProps
   /**
    * The icon element to use in the select
    * @type React.ReactElement
    */
   icon?: React.ReactElement<any>
}

/**
 * React component used to select one item from a list of options.
 */
export const Select = forwardRef<SelectProps, "select">((props, ref) => {
   const styles = useMultiStyleConfig("Select", props)
   const theme = useTheme()
   
   const {
      rootProps,
      placeholder,
      icon,
      color,
      height,
      h,
      minH,
      minHeight,
      iconColor,
      iconSize,
      isFullWidth,
      ...rest
   }: any = omitThemingProps(props)
   
   const [layoutProps, otherProps] = split(rest, layoutPropNames as any[])
   
   const rootStyles: SystemStyleObject = {
      width: "100%",
      height: "fit-content",
      position: "relative",
      color,
   }
   
   const fieldStyles: SystemStyleObject = mergeWith({}, styles.field, {
      paddingEnd: "2rem",
      _focus: { zIndex: "unset" },
   })
   
   return (
      <chalk.div
         theme={theme}
         className="chalk-select__wrapper"
         __css={rootStyles}
         {...layoutProps}
         {...rootProps}
      >
         <SelectField
            ref={ref}
            height={h ?? height}
            minH={minH ?? minHeight}
            placeholder={placeholder}
            {...otherProps}
            __css={fieldStyles}
         >
            {props.children}
         </SelectField>
         
         <SelectIcon
            data-disabled={props.isDisabled}
            {...((iconColor || color) && { color: iconColor || color })}
            __css={styles.icon}
            {...(iconSize && { fontSize: iconSize })}
         >
            {icon}
         </SelectIcon>
      </chalk.div>
   )
})


export const DefaultIcon: React.FC<PropsOf<"svg">> = (props) => (
   <svg viewBox="0 0 24 24" {...props}>
      <path
         fill="currentColor"
         d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
      />
   </svg>
)

const IconWrapper = chalk("div", {
   baseStyle: {
      position: "absolute",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none",
      top: "50%",
      transform: "translateY(-50%)",
   },
})

interface SelectIconProps extends HTMLChalkProps<"div"> {
}

const SelectIcon: React.FC<SelectIconProps> = (props) => {
   const { children = <DefaultIcon />, ...rest } = props
   const theme = useTheme()
   
   const clone = React.cloneElement(children as any, {
      theme: theme,
      role: "presentation",
      className: "chalk-select__icon",
      focusable: false,
      "aria-hidden": true,
      // force icon to adhere to `IconWrapper` styles
      style: {
         width: "1em",
         height: "1em",
         color: "currentColor",
      },
   })
   
   return (
      <IconWrapper {...rest} className="chalk-select__icon-wrapper">
         {React.isValidElement(children) ? clone : null}
      </IconWrapper>
   )
}


