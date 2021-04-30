import { motion, Variants }                              from "framer-motion"
import * as React                                        from "react"
import { usePopover, UsePopoverProps, UsePopoverReturn } from './UsePopover'
import { createContext, MaybeRenderProp }                from '../ReactUtils'
import {
   chalk, forwardRef, HTMLChalkProps, omitThemingProps,
   StylesProvider, SystemStyleObject, ThemingProps, useMultiStyleConfig, useStyles, useTheme,
} from '../../System'
import { cx, runIfFn }                                   from '../../Utils'
import { CloseButton, CloseButtonProps }                 from '../CloseButton'

const motionVariants: Variants = {
   exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
         duration: 0.1,
         ease: [0.4, 0, 1, 1],
      },
      transitionEnd: {
         visibility: "hidden",
      },
   },
   enter: {
      visibility: "visible",
      scale: 1,
      opacity: 1,
      transition: {
         duration: 0.15,
         ease: [0, 0, 0.2, 1],
      },
   },
}

const [PopoverProvider, usePopoverContext] = createContext<UsePopoverReturn>({
   name: "PopoverContext",
   errorMessage:
      "usePopoverContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Popover />`",
})

export { usePopoverContext }

export interface PopoverProps extends UsePopoverProps, ThemingProps<"Popover"> {
   /**
    * The content of the popover. It is usually the `PopoverTrigger`,
    * and `PopoverContent`
    */
   children?: MaybeRenderProp<{
      isOpen: boolean
      onClose: () => void
      forceUpdate: (() => void) | undefined
   }>
}

/**
 * Popover is used to bring attention to specific user interface elements,
 * typically to suggest an action or to guide users through a new experience.
 */
export const Popover: React.FC<PopoverProps> = (props) => {
   const theme = useTheme()
   const styles = useMultiStyleConfig("Popover", props)
   
   const { children, ...rest } = omitThemingProps(props)
   const context = usePopover(rest)
   
   return (
      <PopoverProvider value={context}>
         <StylesProvider value={styles}>
            {runIfFn(children, {
               isOpen: context.isOpen,
               onClose: context.onClose,
               forceUpdate: context.forceUpdate,
            })}
         </StylesProvider>
      </PopoverProvider>
   )
}


/**
 * PopoverTrigger opens the popover's content. It must be an interactive element
 * such as `button` or `a`.
 */
export const PopoverTrigger: React.FC = (props) => {
   // enforce a single child
   const child: any = React.Children.only(props.children)
   const { getTriggerProps } = usePopoverContext()
   return React.cloneElement(child, getTriggerProps(child.props, child.ref))
}


export interface PopoverContentProps extends HTMLChalkProps<"section"> {
}

const Motion = chalk(motion.section)

export const PopoverContent = forwardRef<PopoverContentProps, "section">(
   (props, ref) => {
      const {
         isOpen,
         getPopoverProps,
         onTransitionEnd,
         getPopoverPositionerProps,
      } = usePopoverContext()
      const theme = useTheme()
   
      const styles = useStyles()
      const contentStyles: SystemStyleObject = {
         position: "relative",
         display: "flex",
         flexDirection: "column",
         ...styles.content,
      }
      
      const popoverProps: any = getPopoverProps(props, ref)
      
      return (
         <chalk.div theme={theme} __css={styles.popper} {...getPopoverPositionerProps()}>
            <Motion
               theme={theme}
               {...popoverProps}
               onUpdate={onTransitionEnd}
               className={cx("chalk-popover__content", props.className)}
               __css={contentStyles}
               variants={motionVariants}
               initial={false}
               animate={isOpen ? "enter" : "exit"}
            />
         </chalk.div>
      )
   },
)


export interface PopoverHeaderProps extends HTMLChalkProps<"header"> {
}

/**
 * PopoverHeader is the accessible header or label
 * for the popover's content and it is first announced by screenreaders.
 */
export const PopoverHeader = forwardRef<PopoverHeaderProps, "header">(
   (props, ref) => {
      const { headerId, setHasHeader } = usePopoverContext()
      const theme = useTheme()
   
      React.useEffect(() => {
         setHasHeader.on()
         return () => setHasHeader.off()
      }, [setHasHeader])
      
      const styles = useStyles()
      
      return (
         <chalk.header
            theme={theme}
            {...props}
            className={cx("chalk-popover__header", props.className)}
            id={headerId}
            ref={ref}
            __css={styles.header}
         />
      )
   },
)


export interface PopoverBodyProps extends HTMLChalkProps<"div"> {
}

/**
 * PopoverBody is the main content area for the popover. Should contain
 * at least one interactive element.
 */
export const PopoverBody = forwardRef<PopoverBodyProps, "div">((props, ref) => {
   const { bodyId, setHasBody } = usePopoverContext()
   const theme = useTheme()
   
   React.useEffect(() => {
      setHasBody.on()
      return () => setHasBody.off()
   }, [setHasBody])
   
   const styles = useStyles()
   
   return (
      <chalk.div
         theme={theme}
         {...props}
         className={cx("chalk-popover__body", props.className)}
         id={bodyId}
         ref={ref}
         __css={styles.body}
      />
   )
})


export interface PopoverFooterProps extends HTMLChalkProps<"footer"> {
}

export const PopoverFooter: React.FC<PopoverFooterProps> = (props) => {
   const styles = useStyles()
   const theme = useTheme()
   
   return (
      <chalk.footer
         theme={theme}
         {...props}
         className={cx("chalk-popover__footer", props.className)}
         __css={styles.footer}
      />
   )
}


export type PopoverCloseButtonProps = CloseButtonProps

export const PopoverCloseButton: React.FC<CloseButtonProps> = (props) => {
   const { onClose } = usePopoverContext()
   return (
      <CloseButton
         // size="sm"
         onClick={onClose}
         position="absolute"
         borderRadius="md"
         top="0.25rem"
         right="0.25rem"
         padding="0.5rem"
         {...props}
      />
   )
}


export interface PopoverArrowProps extends HTMLChalkProps<"div"> {
}

export const PopoverArrow: React.FC<PopoverArrowProps> = (props) => {
   const { bg, bgColor, backgroundColor } = props
   const styles = useStyles()
   const arrowBg = bg ?? bgColor ?? backgroundColor
   const theme = useTheme()
   
   
   return (
      <chalk.div data-popper-arrow className="chalk-popover__arrow-positioner">
         <chalk.div
            theme={theme}
            className={cx("chalk-popover__arrow", props.className)}
            {...props}
            data-popper-arrow-inner
            __css={{
               ...styles.arrow,
               ...(arrowBg && {
                  // "--popper-arrow-bg": `colors.${arrowBg}, ${arrowBg}`,
               }),
            }}
         />
      </chalk.div>
   )
}
