import * as React                         from "react"
import { motion, useIsPresent, Variants } from "framer-motion"
import { ToastOptions }                   from './Toast.types'
import { useTimeout, useUpdateEffect }    from '../../Hooks'
import { getToastStyle }                  from './Toast.utils'
import { isFunction }                     from '../../Utils'
import ReachAlert                         from "@reach/alert"
import { useTheme }                       from '../../System'


/**
 * @todo After Gerrit refactors this implementation,
 * allow users to change the toast transition direction from
 * a `ToastProvider` component.
 *
 * Here's an API example:
 *
 * ```jsx
 * <ToastProvider
 *   motion={customVariants}
 *   component={CustomToastComponent}
 *   autoCloseTimeout={3000}
 *   toastSpacing={32} // this will control the `margin` value applied
 * >
 * </ToastProvider>
 * ```
 */
const toastMotionVariants: Variants = {
   initial: (props) => {
      const { position } = props
      
      const dir = ["top", "bottom"].includes(position) ? "y" : "x"
      
      let factor = ["top-right", "bottom-right"].includes(position) ? 1 : -1
      if (position === "bottom") factor = 1
      
      return {
         opacity: 0,
         [dir]: factor * 24,
      }
   },
   animate: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
         duration: 0.4,
         ease: [0.4, 0, 0.2, 1],
      },
   },
   exit: {
      opacity: 0,
      scale: 0.85,
      transition: {
         duration: 0.2,
         ease: [0.4, 0, 1, 1],
      },
   },
}

export interface ToastProps extends ToastOptions {
}

export const Toast: React.FC<ToastProps> = (props) => {
   const theme = useTheme()
   const {
      id,
      message,
      onCloseComplete,
      onRequestRemove,
      requestClose = false,
      position = "bottom",
      duration = 5000,
   } = props
   
   const [delay, setDelay] = React.useState(duration)
   
   const isPresent = useIsPresent()
   
   useUpdateEffect(() => {
      if (!isPresent) {
         onCloseComplete?.()
      }
   }, [isPresent])
   
   useUpdateEffect(() => {
      setDelay(duration)
   }, [duration])
   
   const onMouseEnter = () => setDelay(null)
   const onMouseLeave = () => setDelay(duration)
   
   const close = () => {
      if (isPresent) onRequestRemove()
   }
   
   React.useEffect(() => {
      if (isPresent && requestClose) {
         onRequestRemove()
      }
   }, [isPresent, requestClose, onRequestRemove])
   
   useTimeout(close, delay)
   
   const style = React.useMemo(() => getToastStyle(position), [position])
   
   return (
      <motion.li
         layout
         className="chalk-toast"
         variants={toastMotionVariants}
         initial="initial"
         animate="animate"
         exit="exit"
         onHoverStart={onMouseEnter}
         onHoverEnd={onMouseLeave}
         custom={{ position }}
         style={style}
      >
         <ReachAlert
            className="chalk-toast__inner"
            style={{
               pointerEvents: "auto",
               maxWidth: 560,
               minWidth: 300,
               margin: "0.5rem",
            }}
         >
            {isFunction(message) ? message({ id, onClose: close }) : message}
         </ReachAlert>
      </motion.li>
   )
}

