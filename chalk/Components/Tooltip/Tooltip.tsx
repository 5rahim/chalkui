import {
   AnimatePresence,
   motion,
}                         from "framer-motion"
import * as React         from "react"
import { scale }          from "./Tooltip.transition"
import {
   chalk,
   forwardRef,
   HTMLChalkProps,
   omitThemingProps,
   ThemingProps,
   useStyleConfig,
   useTheme,
   useToken,
} from '../../System'
import {
   useTooltip,
   UseTooltipProps,
}                         from './UseTooltip'
import {
   Portal,
   PortalProps,
}                         from '../../Portal'
import { popperCSSVars }  from '../Popper'
import {
   getCSSVar,
   isString,
   omit,
   pick,
}                         from '../../Utils'
import { VisuallyHidden } from '../VisuallyHidden'

export interface TooltipProps
   extends HTMLChalkProps<"div">,
      ThemingProps<"Tooltip">,
      UseTooltipProps {
   /**
    * The react component to use as the
    * trigger for the tooltip
    */
   children: React.ReactNode
   /**
    * The label of the tooltip
    */
   label?: React.ReactNode
   /**
    * The accessible, human friendly label to use for
    * screen readers.
    *
    * If passed, tooltip will show the content `label`
    * but expose only `aria-label` to assistive technologies
    */
   "aria-label"?: string
   /**
    * If `true`, the tooltip will wrap its children
    * in a `<span/>` with `tabIndex=0`
    */
   shouldWrapChildren?: boolean
   /**
    * If `true`, the tooltip will show an arrow tip
    */
   hasArrow?: boolean
   /**
    * Props to be forwarded to the portal component
    */
   portalProps?: Pick<PortalProps, "appendToParentPortal" | "containerRef">
}

const StyledTooltip = chalk(motion.div)

/**
 * Tooltips display informative text when users hover, focus on, or tap an element.
 */
export const Tooltip = forwardRef<TooltipProps, "div">((props, ref) => {
   const styles: any = useStyleConfig("Tooltip", props)
   const ownProps = omitThemingProps(props)
   const theme = useTheme()
   
   const {
      children,
      label,
      shouldWrapChildren,
      "aria-label": ariaLabel,
      hasArrow,
      bg,
      portalProps,
      ...rest
   }: any = ownProps
   
   const c = useToken('colors', bg)
   
   if (bg) {
      styles.bg = bg
      styles[popperCSSVars.arrowBg.var] = c
   }
   
   const tooltip = useTooltip(rest)
   
   const shouldWrap = isString(children) || shouldWrapChildren
   
   let trigger: React.ReactElement
   
   if (shouldWrap) {
      trigger = (
         <chalk.span theme={theme} tabIndex={0} {...tooltip.getTriggerProps()}>
            {children}
         </chalk.span>
      )
   } else {
      /**
       * Ensure tooltip has only one child node
       */
      const child = React.Children.only(children) as React.ReactElement & {
         ref?: React.Ref<any>
      }
      trigger = React.cloneElement(
         child,
         tooltip.getTriggerProps(child.props, child.ref),
      )
   }
   
   const hasAriaLabel = !!ariaLabel
   
   const _tooltipProps = tooltip.getTooltipProps({}, ref)
   
   const tooltipProps = hasAriaLabel
      ? omit(_tooltipProps, ["role", "id"])
      : _tooltipProps
   
   const hiddenProps = pick(_tooltipProps, ["role", "id"])
   
   /**
    * If the `label` is empty, there's no
    * point showing the tooltip. Let's simply return back the children
    */
   if (!label) {
      return <>{children}</>
   }
   
   return (
      <>
         {trigger}
         <AnimatePresence>
            {tooltip.isOpen && (
               <Portal {...portalProps}>
                  <chalk.div
                     theme={theme}
                     {...tooltip.getTooltipPositionerProps()}
                     __css={{
                        zIndex: styles.zIndex,
                        pointerEvents: "none",
                     }}
                  >
                     <StyledTooltip
                        variants={scale}
                        {...(tooltipProps as any)}
                        initial="exit"
                        animate="enter"
                        exit="exit"
                        theme={theme}
                        __css={styles}
                     >
                        {label}
                        {hasAriaLabel && (
                           <VisuallyHidden {...hiddenProps}>{ariaLabel}</VisuallyHidden>
                        )}
                        {hasArrow && (
                           <chalk.div
                              data-popper-arrow
                              className="chalk-tooltip__arrow-wrapper"
                              theme={theme}
                           >
                              <chalk.div
                                 data-popper-arrow-inner
                                 className="chalk-tooltip__arrow"
                                 theme={theme}
                                 __css={{ bg: styles.bg }}
                              />
                           </chalk.div>
                        )}
                     </StyledTooltip>
                  </chalk.div>
               </Portal>
            )}
         </AnimatePresence>
      </>
   )
})
