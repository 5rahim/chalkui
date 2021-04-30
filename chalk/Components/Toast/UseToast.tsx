import * as React                                                                                        from "react"
import { RenderProps, ToastId, ToastOptions }                                                            from './Toast.types'
import { Alert, AlertDescription, AlertIcon, AlertStatus, AlertTitle }                                   from '../Alert'
import { chalk, ColorMode, ColorModeContext, ThemeProvider, useChalk, useTheme }                         from "../../System"
import { CloseButton }                                                                                   from '../CloseButton'
import { isFunction, noop }                                                                              from '../../Utils'
import { toast }                                                                                         from "./ToastClass"
import defaultTheme                                                                                      from "../../Theme"
import { useEffect }                                                                                     from 'react'
import theme                                                                                                                                           from '../../Theme'
import { Notification, NotificationCloseButton, NotificationContent, NotificationDescription, NotificationIcon, NotificationProps, NotificationTitle } from '../Notification'


export interface UseToastOptions {
   action?: React.ReactNode,
   
   icon?: React.ReactNode,
   
   type?: 'notification' | 'toast',
   /**
    * The placement of the toast
    *
    * @default "bottom"
    */
   position?: ToastOptions["position"]
   /**
    * The delay before the toast hides (in milliseconds)
    * If set to `null`, toast will never dismiss.
    *
    * @default 5000 ( = 5000ms )
    */
   duration?: ToastOptions["duration"]
   
   /**
    * Render a component toast component.
    * Any component passed will receive 2 props: `id` and `onClose`.
    */
   render?(props: RenderProps): React.ReactNode
   
   /**
    * The title of the toast
    */
   title?: React.ReactNode
   /**
    * The description of the toast
    */
   description?: React.ReactNode
   /**
    * If `true`, toast will show a close button
    */
   isClosable?: boolean
   /**
    * The alert component `variant` to use
    */
   variant?: string
   /**
    * The status of the toast.
    */
   status?: AlertStatus
   /**
    * The `id` of the toast.
    *
    * Mostly used when you need to prevent duplicate.
    * By default, we generate a unique `id` for each toast
    */
   id?: ToastId
   /**
    * Callback function to run side effects after the toast has closed.
    */
   onCloseComplete?: () => void
}

export type IToast = UseToastOptions

const Toast: React.FC<any> = (props) => {
   
   const { status, variant, id, title, isClosable, onClose, description } = props
   
   return (
      <Alert
         theme={theme}
         status={status}
         variant={variant}
         id={id}
         alignItems="center"
         boxShadow="sm"
         paddingRight={8}
         textAlign="left"
         width="auto"
      >
         <AlertIcon />
         <chalk.div flex="1" theme={theme}>
            {title && <AlertTitle>{title}</AlertTitle>}
            {description && (
               <AlertDescription display="block">{description}</AlertDescription>
            )}
         </chalk.div>
         {isClosable && (
            <CloseButton
               size="sm"
               onClick={onClose}
               position="absolute"
               right={1}
               top={1}
            />
         )}
      </Alert>
   )
}


const ToastNotification: React.FC<any> = (props) => {
   
   const { variant, id, title, isClosable, onClose, description, icon, action, ...rest }: any = props
   
   return (
      <Notification id={id}>
         {icon && icon}
         {(title || description) && (
            <NotificationContent>
               {title && <NotificationTitle>{title}</NotificationTitle>}
               {description && <NotificationDescription>{description}</NotificationDescription>}
            </NotificationContent>
         )}
         {action && action}
         {isClosable && (
            <NotificationCloseButton
               onClick={onClose}
            />
         )}
      </Notification>
   )
}

const defaults = {
   duration: 5000,
   position: "bottom-right",
   variant: "primary",
} as const

export type CreateStandAloneToastParam = Partial<{
   setColorMode: (value: ColorMode) => void
} & ReturnType<typeof useChalk> & { defaultOptions: UseToastOptions }>

export const defaultStandaloneParam: Required<CreateStandAloneToastParam> = {
   theme: defaultTheme,
   colorMode: "light",
   toggleColorMode: noop,
   setColorMode: noop,
   defaultOptions: defaults,
}

/**
 * Create a toast from outside of React Components
 */
export function createStandaloneToast(
   {
      theme = defaultStandaloneParam.theme,
      colorMode = defaultStandaloneParam.colorMode,
      toggleColorMode = defaultStandaloneParam.toggleColorMode,
      setColorMode = defaultStandaloneParam.setColorMode,
      defaultOptions = defaultStandaloneParam.defaultOptions,
   }: CreateStandAloneToastParam = defaultStandaloneParam) {
   
   const renderWithProviders = (
      props: React.PropsWithChildren<RenderProps>,
      options: UseToastOptions,
   ) => (
      <ThemeProvider theme={theme}>
         <ColorModeContext.Provider
            value={{ colorMode, setColorMode, toggleColorMode }}
         >
            {isFunction(options.render) ? (
               options.render(props)
            ) : (
               options.type === 'notification' ? <ToastNotification {...props} {...options} /> : <Toast {...props} {...options} />
            )}
         </ColorModeContext.Provider>
      </ThemeProvider>
   )
   
   const toastImpl = (options?: UseToastOptions) => {
      const opts = { ...defaultOptions, ...options }
      
      const Message: React.FC<RenderProps> = (props) =>
         renderWithProviders(props, opts)
      
      // @ts-ignore
      return toast.notify(Message, opts)
   }
   
   toastImpl.close = toast.close
   toastImpl.closeAll = toast.closeAll
   
   // toasts can only be updated if they have a valid id
   toastImpl.update = (id: ToastId, options: Omit<UseToastOptions, "id">) => {
      if (!id) return
      
      const opts = { ...defaultOptions, ...options }
      
      // @ts-ignore
      toast.update(id, { ...opts, message: (props: any) => renderWithProviders(props, opts) })
   }
   
   toastImpl.isActive = toast.isActive
   
   return toastImpl
}

/**
 * React hook used to create a function that can be used
 * to show toasts in an application.
 */
export function useToast(options?: UseToastOptions) {
   const { setColorMode, toggleColorMode, colorMode } = useChalk()
   
   return React.useMemo(
      () =>
         createStandaloneToast({
            theme,
            colorMode,
            setColorMode,
            toggleColorMode,
            defaultOptions: options,
         }),
      [theme, setColorMode, toggleColorMode, colorMode, options],
   )
}

export default useToast
