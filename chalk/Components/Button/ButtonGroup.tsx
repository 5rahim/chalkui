import * as React                                                                                    from "react"
import { chalk, forwardRef, HTMLChalkProps, SystemProps, SystemStyleObject, ThemingProps, useTheme } from '../../System'
import { cx }                                                                                        from '../../Utils'
import { createContext }                                                                             from '../ReactUtils'

export interface ButtonGroupProps
   extends HTMLChalkProps<"div">,
      ThemingProps<"Button"> {
   /**
    * If `true`, the borderRadius of button that are direct children will be altered
    * to look flushed together
    */
   isAttached?: boolean
   /**
    * If `true`, all wrapped button will be disabled
    */
   isDisabled?: boolean
   /**
    * The spacing between the buttons
    * @default '0.5rem'
    * @type SystemProps["marginRight"]
    */
   spacing?: SystemProps["marginRight"]
}

interface ButtonGroupContext extends ThemingProps<"ButtonGroup"> {
   isDisabled?: boolean
}

const [ButtonGroupProvider, useButtonGroup] = createContext<ButtonGroupContext>(
   {
      strict: false,
      name: "ButtonGroupContext",
   },
)

export { useButtonGroup }

export const ButtonGroup = forwardRef<ButtonGroupProps, "div">((props, ref) => {
   const theme = useTheme()
   const {
      size,
      colorScheme,
      variant,
      className,
      spacing = "0.5rem",
      isAttached,
      isDisabled,
      ...rest
   } = props
   
   const _className = cx("chalk-button__group", className)
   
   const context = React.useMemo(
      () => ({ size, colorScheme, variant, isDisabled }),
      [size, colorScheme, variant, isDisabled],
   )
   
   let groupStyles: SystemStyleObject = {
      display: "inline-flex",
   }
   
   if (isAttached) {
      groupStyles = {
         ...groupStyles,
         "> *:first-of-type:not(:last-of-type)": { borderRightRadius: 0, borderRightWidth: '0px' },
         "> *:not(:first-of-type):not(:last-of-type)": { borderRadius: 0, borderLeftWidth: '1px', borderRightWidth: '0px' },
         "> *:not(:first-of-type):last-of-type": { borderLeftRadius: 0, borderLeftWidth: '1px' },
      }
   } else {
      groupStyles = {
         ...groupStyles,
         "& > *:not(style) ~ *:not(style)": { marginLeft: spacing },
      }
   }
   
   return (
      <ButtonGroupProvider value={context}>
         <chalk.div
            ref={ref}
            role="group"
            __css={groupStyles}
            className={_className}
            theme={theme}
            {...rest}
         />
      </ButtonGroupProvider>
   )
})
