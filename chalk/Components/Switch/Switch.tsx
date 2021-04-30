import {
   useCheckbox,
   UseCheckboxProps,
} from "../Checkbox"
import {
   chalk,
   forwardRef,
   omitThemingProps,
   SystemStyleObject,
   ThemingProps,
   useMultiStyleConfig,
   HTMLChalkProps,
   SystemProps,
   useTheme,
} from "../../System"
import {
   cx,
   dataAttr,
} from "../../Utils"
import * as React from "react"

export interface SwitchProps
   extends Omit<UseCheckboxProps, "isIndeterminate">,
      Omit<HTMLChalkProps<"label">, keyof UseCheckboxProps>,
      ThemingProps<"Switch"> {
   /**
    * The spacing between the switch and its label text
    * @default 0.5rem
    * @type SystemProps["marginLeft"]
    */
   spacing?: SystemProps["marginLeft"]
}

export const Switch = forwardRef<SwitchProps, "input">((props, ref) => {
   const styles = useMultiStyleConfig("Switch", props)
   const theme = useTheme()
   const { spacing = "0.5rem", children, ...ownProps } = omitThemingProps(props)
   
   const {
      state,
      getInputProps,
      getCheckboxProps,
      getRootProps,
      getLabelProps,
   } = useCheckbox(ownProps)
   
   const containerStyles: SystemStyleObject = React.useMemo(
      () => ({
         display: "inline-block",
         verticalAlign: "middle",
         lineHeight: "normal",
         ...styles.container,
      }),
      [styles.container],
   )
   
   const trackStyles: SystemStyleObject = React.useMemo(
      () => ({
         display: "inline-flex",
         flexShrink: 0,
         justifyContent: "flex-start",
         boxSizing: "content-box",
         cursor: "pointer",
         ...styles.track,
      }),
      [styles.track],
   )
   
   // @ts-ignore
   const labelStyles: SystemStyleObject = React.useMemo(
      () => ({
         userSelect: "none",
         marginLeft: spacing,
         ...styles.label,
      }),
      [spacing, styles.label],
   )
   
   return (
      <chalk.label
         theme={theme}
         {...getRootProps()}
         className={cx("chalk-switch", props.className)}
         __css={containerStyles}
      >
         <input className="chalk-switch__input" {...getInputProps({}, ref)} />
         <chalk.span
            theme={theme}
            {...getCheckboxProps()}
            className="chalk-switch__track"
            __css={trackStyles}
         >
            <chalk.span
               theme={theme}
               __css={styles.thumb}
               className="chalk-switch__thumb"
               data-checked={dataAttr(state.isChecked)}
               data-hover={dataAttr(state.isHovered)}
            />
         </chalk.span>
         {children && (
            <chalk.span
               theme={theme}
               className="chalk-switch__label"
               {...getLabelProps()}
               __css={labelStyles}
            >
               {children}
            </chalk.span>
         )}
      </chalk.label>
   )
})
