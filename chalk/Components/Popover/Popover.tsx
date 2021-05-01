import {
   CloseButton,
   CloseButtonProps,
}                          from "../CloseButton"
import { MaybeRenderProp } from "../ReactUtils"
import {
   chalk,
   forwardRef,
   HTMLChalkProps,
   omitThemingProps,
   StylesProvider,
   SystemStyleObject,
   ThemingProps,
   useMultiStyleConfig,
   useStyles,
   useTheme,
}                          from "../../System"
import {
   cx,
   runIfFn,
   __DEV__,
}                          from "../../Utils"
import * as React          from "react"
import {
   PopoverProvider,
   usePopoverContext,
}                          from "./PopoverContext"
import {
   PopoverTransition,
   PopoverTransitionProps,
}                          from "./PopoverTransition"
import {
   usePopover,
   UsePopoverProps,
}                          from "./UsePopover"

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
   const theme = useTheme()
   const { getTriggerProps } = usePopoverContext()
   return React.cloneElement(child, { ...getTriggerProps(child.props, child.ref), theme: theme })
}


export interface PopoverContentProps extends PopoverTransitionProps {
   rootProps?: HTMLChalkProps<"div">
}

export const PopoverContent = forwardRef<PopoverContentProps, "section">(
   (props, ref) => {
      const { rootProps, ...contentProps } = props
      const theme = useTheme()
      const { getPopoverProps, getPopoverPositionerProps } = usePopoverContext()
      
      const styles = useStyles()
      const contentStyles: SystemStyleObject = {
         position: "relative",
         display: "flex",
         flexDirection: "column",
         ...styles.content,
      }
      
      return (
         <chalk.div
            theme={theme}
            {...getPopoverPositionerProps(rootProps)}
            __css={styles.popper}
            className="chalk-popover__popper"
         >
            <PopoverTransition
               theme={theme}
               {...getPopoverProps(contentProps, ref)}
               className={cx("chalk-popover__content", props.className)}
               __css={contentStyles}
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
      const { getHeaderProps } = usePopoverContext()
      const theme = useTheme()
      const styles = useStyles()
      
      return (
         <chalk.header
            theme={theme}
            {...getHeaderProps(props, ref)}
            className={cx("chalk-popover__header", props.className)}
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
   const { getBodyProps } = usePopoverContext()
   const theme = useTheme()
   const styles = useStyles()
   
   return (
      <chalk.div
         theme={theme}
         {...getBodyProps(props, ref)}
         className={cx("chalk-popover__body", props.className)}
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
         onClick={onClose}
         position="absolute"
         borderRadius="md"
         top="0.25rem"
         right="0.5rem"
         padding="0.5rem"
         {...props}
      />
   )
}


export interface PopoverArrowProps extends HTMLChalkProps<"div"> {
}

export const PopoverArrow: React.FC<PopoverArrowProps> = (props) => {
   const { bg, bgColor, backgroundColor } = props
   const theme = useTheme()
   const { getArrowProps, getArrowInnerProps } = usePopoverContext()
   const styles = useStyles()
   const arrowBg = bg ?? bgColor ?? backgroundColor
   return (
      <chalk.div
         theme={theme}
         {...getArrowProps()}
         className="chalk-popover__arrow-positioner"
      >
         <chalk.div
            theme={theme}
            className={cx("chalk-popover__arrow", props.className)}
            {...getArrowInnerProps(props)}
            __css={{
               ...styles.arrow,
               // @ts-ignore
               "--popper-arrow-bg": arrowBg
                  ? `colors.${arrowBg}, ${arrowBg}`
                  : undefined,
            }}
         />
      </chalk.div>
   )
}


