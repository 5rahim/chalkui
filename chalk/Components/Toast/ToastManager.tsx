import * as React                                                                    from "react"
import { CloseAllToastsOptions, ToastId, ToastMessage, ToastOptions, ToastPosition } from './Toast.types'
import { findToast, getToastPosition }                                               from './Toast.utils'
import { Dictionary, objectKeys }                                                    from '../../Utils'
import { AnimatePresence }                                                           from 'framer-motion'
import { Toast }                                                                     from './Toast'
import { useTheme }                                                                  from '../../System'

export interface ToastMethods {
   notify: (message: ToastMessage, options: CreateToastOptions) => ToastId
   closeAll: (options?: CloseAllToastsOptions) => void
   close: (id: ToastId) => void
   update: (id: ToastId, options: CreateToastOptions) => void
   isActive: (id: ToastId) => boolean
}

interface Props {
   notify: (methods: ToastMethods) => void
}

type State = { [K in ToastPosition]: ToastOptions[] }

type CreateToastOptions = Partial<Pick<ToastOptions,
   "status" | "duration" | "position" | "id" | "onCloseComplete">>

/**
 * Manages the creation, and removal of toasts
 * across all corners ("top", "bottom", etc.)
 */
export class ToastManager extends React.Component<Props, State> {
   /**
    * Static id counter to create unique ids
    * for each toast
    */
   static counter = 0
   
   /**
    * State to track all the toast across all positions
    */
   state: State = {
      top: [],
      "top-left": [],
      "top-right": [],
      "bottom-left": [],
      bottom: [],
      "bottom-right": [],
   }
   
   constructor(props: Props) {
      super(props)
      
      const methods = {
         notify: this.notify,
         closeAll: this.closeAll,
         close: this.closeToast,
         update: this.updateToast,
         isActive: this.isVisible,
      }
      
      props.notify(methods)
   }
   
   /**
    * Function to actually create a toast and add it
    * to state at the specified position
    */
   notify = (message: ToastMessage, options: CreateToastOptions) => {
      const toast = this.createToast(message, options)
      const { position, id } = toast
      
      this.setState((prevToasts) => {
         const isTop = position.includes("top")
         
         /**
          * - If the toast is positioned at the top edges, the
          * recent toast stacks on top of the other toasts.
          *
          * - If the toast is positioned at the bottom edges, the recent
          * toast stacks below the other toasts.
          */
         const toasts = isTop
            ? [toast, ...prevToasts[position]]
            : [...prevToasts[position], toast]
         
         return {
            ...prevToasts,
            [position]: toasts,
         }
      })
      
      return id
   }
   
   /**
    * Update a specific toast with new options based on the
    * passed `id`
    */
   updateToast = (id: ToastId, options: CreateToastOptions) => {
      this.setState((prevState) => {
         const nextState = { ...prevState }
         const { position, index } = findToast(nextState, id)
         
         if (position && index !== -1) {
            nextState[position][index] = {
               ...nextState[position][index],
               ...options,
            }
         }
         
         return nextState
      })
   }
   
   /**
    * Close all toasts at once.
    * If given positions, will only close those.
    */
   closeAll = ({ positions }: CloseAllToastsOptions = {}) => {
      // only one setState here for perf reasons
      // instead of spamming this.closeToast
      // @ts-ignore
      this.setState((prev: any) => {
         const allPositions: ToastPosition[] = [
            "bottom",
            "bottom-right",
            "bottom-left",
            "top",
            "top-left",
            "top-right",
         ]
         
         const positionsToClose = positions ?? allPositions
         
         return positionsToClose.reduce((acc: Dictionary, position) => {
            acc[position] = prev[position].map((toast: any) => ({
               ...toast,
               requestClose: true,
            }))
            
            return acc
         }, {})
      })
   }
   
   /**
    * Create properties for a new toast
    */
   createToast = (message: ToastMessage, options: CreateToastOptions) => {
      ToastManager.counter += 1
      const id = options.id ?? ToastManager.counter
      
      const position = options.position ?? "top"
      
      return {
         id,
         message,
         position,
         duration: options.duration,
         onCloseComplete: options.onCloseComplete,
         onRequestRemove: () => this.removeToast(String(id), position),
         status: options.status,
         requestClose: false,
      }
   }
   
   /**
    * Requests to close a toast based on its id and position
    */
   closeToast = (id: ToastId) => {
      this.setState((prevState) => {
         const position = getToastPosition(prevState, id)
         
         if (!position) return prevState
         
         return {
            ...prevState,
            [position]: prevState[position].map((toast) => {
               // id may be string or number
               // eslint-disable-next-line eqeqeq
               if (toast.id == id) {
                  return {
                     ...toast,
                     requestClose: true,
                  }
               }
               
               return toast
            }),
         }
      })
   }
   
   /**
    * Delete a toast record at its position
    */
   removeToast = (id: ToastId, position: ToastPosition) => {
      this.setState((prevState) => ({
         ...prevState,
         // id may be string or number
         // eslint-disable-next-line eqeqeq
         [position]: prevState[position].filter((toast) => toast.id != id),
      }))
   }
   
   isVisible = (id: ToastId) => {
      const { position } = findToast(this.state, id)
      return Boolean(position)
   }
   
   /**
    * Compute the style of a toast based on its position
    */
   getStyle = (position: ToastPosition): React.CSSProperties => {
      const isTopOrBottom = position === "top" || position === "bottom"
      const margin = isTopOrBottom ? "0 auto" : undefined
      
      const top = position.includes("top") ? 0 : undefined
      const bottom = position.includes("bottom") ? 0 : undefined
      const right = !position.includes("left") ? 0 : undefined
      const left = !position.includes("right") ? 0 : undefined
      
      return {
         position: "fixed",
         zIndex: 5500,
         pointerEvents: "none",
         display: "flex",
         flexDirection: "column",
         margin,
         top,
         bottom,
         right,
         left,
      }
   }
   
   render() {
      return objectKeys(this.state).map((position) => {
         const toasts = this.state[position]
         return (
            <ul
               key={position}
               id={`chalk-toast-manager-${position}`}
               style={this.getStyle(position)}
            >
               <AnimatePresence initial={false}>
                  {toasts.map((toast) => (
                     <Toast key={toast.id} {...toast} />
                  ))}
               </AnimatePresence>
            </ul>
         )
      })
   }
}
