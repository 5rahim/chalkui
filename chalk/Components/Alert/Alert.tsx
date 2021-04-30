import * as React                        from "react"
import icons                             from './Icons'
import { cx }                            from '../../Utils'
import {
   chalk, forwardRef, HTMLChalkProps, omitThemingProps,
   StylesProvider, SystemStyleObject, ThemingProps,
   useMultiStyleConfig, useStyles, useTheme,
}                                        from '../../System'
import { CloseButton, CloseButtonProps } from '../CloseButton'
import { useEffect }                     from 'react'
import { createContext }                 from '../ReactUtils'

const STATUSES: any = icons

export type AlertStatus = keyof typeof STATUSES

interface AlertContext {
   status: AlertStatus
   isLarge: boolean
}

const [AlertProvider, useAlertContext] = createContext<AlertContext>({
   name: "AlertContext",
   errorMessage:
      "useAlertContext: `context` is undefined. Seems you forgot to wrap alert components in `<Alert />`",
})

interface AlertOptions {
   /**
    * The status of the alert
    */
   status?: AlertStatus
   /**
    * Increase the size of the alert
    */
   isLarge?: boolean
}

export interface AlertProps
   extends HTMLChalkProps<"div">,
      AlertOptions,
      ThemingProps<"Alert"> {
}

/**
 * Alert is used to communicate the state or status of a
 * page, feature or action
 */
export const Alert = forwardRef<AlertProps, "div">((props, ref) => {
   const theme = useTheme()
   const { status = "info", isLarge = false, ...rest }: any = omitThemingProps(props)
   
   const colorScheme = props.colorScheme ?? STATUSES[status].colorScheme
   
   const styles = useMultiStyleConfig("Alert", { ...props, colorScheme })
   
   const largeAlertStyles: SystemStyleObject = isLarge ? {
      flexDirection: 'column',
      textAlign: 'center',
   } : {}
   
   const alertStyles: SystemStyleObject = {
      width: "100%",
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      ...largeAlertStyles,
      ...(!isLarge ? styles.container : styles.largeContainer),
   }
   
   return (
      <AlertProvider value={{ status, isLarge }}>
         <StylesProvider value={styles}>
            <chalk.div
               role="alert"
               ref={ref}
               theme={theme}
               className={cx("chalk-alert", props.className)}
               __css={alertStyles}
               {...rest}
            />
         </StylesProvider>
      </AlertProvider>
   )
})

export interface AlertTitleProps extends HTMLChalkProps<"div"> {
}

export const AlertTitle = forwardRef<AlertTitleProps, "div">((props, ref) => {
   const theme = useTheme()
   const styles = useStyles()
   const { isLarge } = useAlertContext()
   
   return (
      <chalk.div
         ref={ref}
         theme={theme}
         {...props}
         className={cx("chalk-alert__title", props.className)}
         __css={!isLarge ? styles.title : styles.largeTitle}
      />
   )
})

export interface AlertDescriptionProps extends HTMLChalkProps<"div"> {
}

export const AlertDescription = forwardRef<AlertDescriptionProps, "div">(
   (props, ref) => {
      const theme = useTheme()
      const styles = useStyles()
      
      const descriptionStyles: SystemStyleObject = {
         display: "block",
         ...styles.description,
      }
      
      return (
         <chalk.div
            ref={ref}
            theme={theme}
            {...props}
            className={cx("chalk-alert__desc", props.className)}
            __css={descriptionStyles}
         />
      )
   },
)

export interface AlertIconProps extends HTMLChalkProps<"span"> {
   isLarge?: boolean
}

export const AlertIcon: React.FC<AlertIconProps> = (props) => {
   const theme = useTheme()
   const { status, isLarge } = useAlertContext()
   const { icon: BaseIcon } = STATUSES[status]
   const styles = useStyles()
   
   
   return (
      <chalk.span
         display="inherit"
         theme={theme}
         {...props}
         className={cx("chalk-alert__icon", props.className)}
         __css={!isLarge ? styles.icon : styles.largeIcon}
         sx={{ fontSize: !isLarge ? '2rem' : '2.7rem' }}
      >
         <BaseIcon />
      </chalk.span>
   )
}


export const AlertCloseButton: React.FC<CloseButtonProps> = (props) => {
   
   return (
      <CloseButton position="absolute" right="8px" top="8px" {...props} />
   )
}
