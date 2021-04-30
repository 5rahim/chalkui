import * as React                                                                    from "react"
import { Modal, ModalFocusScope, ModalProps, useModalContext }                       from "./Modal"
import { cx }                                                                        from '../../Utils'
import { Slide, SlideOptions }                                                       from '../Transition'
import { chalk, forwardRef, HTMLChalkProps, SystemStyleObject, useStyles, useTheme } from '../../System'
import { createContext }                                                             from '../ReactUtils'

const [DrawerContextProvider, useDrawerContext] = createContext<DrawerOptions>()

interface DrawerOptions {
   /**
    * The placement of the drawer
    */
   placement?: SlideOptions["direction"]
   /**
    * If `true` and drawer's placement is `top` or `bottom`,
    * the drawer will occupy the viewport height (100vh)
    */
   isFullHeight?: boolean
}

export interface DrawerProps extends ModalProps {
   /**
    * The placement of the drawer
    */
   placement?: SlideOptions["direction"]
   /**
    * If `true` and drawer's placement is `top` or `bottom`,
    * the drawer will occupy the viewport height (100vh)
    */
   isFullHeight?: boolean
}

export function Drawer(props: DrawerProps) {
   const { isOpen, onClose, placement = "right", children, ...rest } = props
   
   const theme = useTheme()
   const drawerStyleConfig = theme.components?.Drawer
   
   return (
      <DrawerContextProvider value={{ placement }}>
         <Modal
            isOpen={isOpen}
            onClose={onClose}
            styleConfig={drawerStyleConfig}
            {...rest}
         >
            {children}
         </Modal>
      </DrawerContextProvider>
   )
}

const StyleSlide = chalk(Slide)

export interface DrawerContentProps extends HTMLChalkProps<"section"> {
}

/**
 * ModalContent is used to group modal's content. It has all the
 * necessary `aria-*` properties to indicate that it is a modal
 */
export const DrawerContent = forwardRef<DrawerContentProps, "section">(
   (props, ref) => {
      const theme = useTheme()
      const { className, children, ...rest } = props
      
      const {
         getDialogProps,
         getDialogContainerProps,
         isOpen,
      } = useModalContext()
      
      const dialogProps = getDialogProps(rest, ref) as any
      const containerProps = getDialogContainerProps()
      
      const _className = cx("chalk-modal__content", className)
      
      const styles = useStyles()
      
      const dialogStyles: SystemStyleObject = {
         display: "flex",
         flexDirection: "column",
         position: "relative",
         width: "100%",
         outline: 0,
         ...styles.dialog,
      }
      
      const dialogContainerStyles: SystemStyleObject = {
         display: "flex",
         width: "100vw",
         height: "100vh",
         position: "fixed",
         left: 0,
         top: 0,
         ...styles.dialogContainer,
      }
      
      const { placement } = useDrawerContext()
      
      return (
         <chalk.div
            {...containerProps}
            theme={theme}
            className="chalk-modal__content-container"
            __css={dialogContainerStyles}
         >
            <ModalFocusScope>
               <StyleSlide
                  theme={theme}
                  direction={placement}
                  in={isOpen}
                  className={_className}
                  {...dialogProps}
                  __css={dialogStyles}
               >
                  {children}
               </StyleSlide>
            </ModalFocusScope>
         </chalk.div>
      )
   },
)


export {
   ModalBody as DrawerBody,
   ModalCloseButton as DrawerCloseButton,
   ModalFooter as DrawerFooter,
   ModalHeader as DrawerHeader,
   ModalOverlay as DrawerOverlay,
} from "./Modal"
