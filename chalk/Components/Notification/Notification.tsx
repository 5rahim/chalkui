import {
   chalk, forwardRef, HTMLChalkProps, omitThemingProps,
   StylesProvider, SystemStyleObject, ThemingProps, useMultiStyleConfig, useStyles, useTheme,
}                                        from '../../System'
import { cx }                            from '../../Utils'
import * as React                        from 'react'
import { CloseButton, CloseButtonProps } from '../CloseButton'
import { Icon }                          from '../Icon'
import { mode }                          from '../../Theme/Tools'

interface NotificationOptions {
}

export interface NotificationProps
   extends HTMLChalkProps<"div">,
      NotificationOptions,
      ThemingProps<"Notification"> {
}

// interface NotificationContext extends ThemingProps<"Notification"> {
//    icon?: boolean
// }
//
// const [NotificationProvider, useNotification] = createContext<NotificationContext>(
//    {
//       strict: false,
//       name: "NotificationContext",
//    },
// )

/**
 * Notification is used to communicate a message, feature or action
 */
export const Notification = forwardRef<NotificationProps, "div">((props, ref) => {
   const theme = useTheme()
   const { icon, ...rest } = omitThemingProps(props)
   
   const styles = useMultiStyleConfig("Notification", { ...props })
   
   
   const notificationStyles = {
      display: "inline-flex",
      position: "relative",
      overflow: "hidden",
      ...styles.container,
   }
   
   return (
      <StylesProvider value={styles}>
         <chalk.div
            role="notification"
            ref={ref}
            theme={theme}
            className={cx("chalk-notification", props.className)}
            __css={notificationStyles}
            {...rest}
         >
         
         </chalk.div>
      </StylesProvider>
   )
})


export interface NotificationContentProps extends HTMLChalkProps<"div"> {
}

export const NotificationContent = forwardRef<NotificationContentProps, "div">((props, ref) => {
   const theme = useTheme()
   const styles = useStyles()
   
   return (
      <chalk.div
         ref={ref}
         {...props}
         className={cx("chalk-alert__content", props.className)}
         __css={styles.content}
         theme={theme}
      />
   )
})


export interface NotificationTitleProps extends HTMLChalkProps<"div"> {
}

export const NotificationTitle = forwardRef<NotificationTitleProps, "div">((props, ref) => {
   const theme = useTheme()
   const styles = useStyles()
   
   return (
      <chalk.div
         ref={ref}
         {...props}
         className={cx("chalk-alert__title", props.className)}
         __css={styles.title}
         theme={theme}
      />
   )
})

export interface NotificationDescriptionProps extends HTMLChalkProps<"div"> {
}

export const NotificationDescription = forwardRef<NotificationDescriptionProps, "div">(
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
            {...props}
            className={cx("chalk-alert__desc", props.className)}
            __css={descriptionStyles}
            theme={theme}
         />
      )
   },
)


export interface NotificationIconProps extends HTMLChalkProps<"span"> {
}

export const NotificationIcon: React.FC<NotificationIconProps> = (props) => {
   const theme = useTheme()
   const styles = useStyles()
   const { colorScheme, ...rest }: any = props
   
   return (
      <chalk.span
         display="inherit"
         className={cx("chalk-notification__icon", props.className)}
         __css={styles.icon}
         sx={{
            color: colorScheme && colorScheme,
         }}
         theme={theme}
      >
         <Icon {...rest} />
      </chalk.span>
   )
}

export const NotificationCloseButton: React.FC<CloseButtonProps> = (props) => {
   const theme = useTheme()
   const styles = useStyles()
   
   return (
      <chalk.div sx={styles.closeButton} theme={theme}>
         
         <CloseButton size="xs" {...props} />
      </chalk.div>
   )
}
