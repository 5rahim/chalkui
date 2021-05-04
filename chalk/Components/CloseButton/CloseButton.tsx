import * as React                                                                                                         from "react"
import { chalk, forwardRef, HTMLChalkProps, omitThemingProps, SystemStyleObject, ThemingProps, useStyleConfig, useTheme } from '../../System'
import { BiX }                                                                                                            from 'react-icons/bi'

export interface CloseButtonProps
   extends HTMLChalkProps<"button">,
      ThemingProps<"CloseButton"> {
   /**
    * If `true`, the close button will be disabled.
    */
   isDisabled?: boolean
}

/**
 * A button with a close icon.
 *
 * It is used to handle the close functionality in feedback and overlay components
 * like Alerts, Toasts, Drawers and Modals.
 */
export const CloseButton = forwardRef<CloseButtonProps, "button">(
   (props, ref) => {
      const theme = useTheme()
      const styles = useStyleConfig("CloseButton", props)
      const { children, isDisabled, __css, ...rest }: any = omitThemingProps(props)
      
      const baseStyle: SystemStyleObject = {
         outline: 0,
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
         flexShrink: 0,
      }
      
      return (
         <chalk.button
            type="button"
            aria-label="Close"
            ref={ref}
            disabled={isDisabled}
            __css={{
               ...baseStyle,
               ...styles,
               ...__css,
            }}
            theme={theme}
            sx={{ fontSize: '1.5em' }}
            {...rest}
         >
            {children || <BiX />}
         </chalk.button>
      )
   },
)
