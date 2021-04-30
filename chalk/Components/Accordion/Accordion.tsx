import {
   AccordionDescendantsProvider,
   AccordionProvider,
   useAccordion,
   useAccordionContext,
   useAccordionItem,
   UseAccordionItemProps,
   UseAccordionItemReturn,
   UseAccordionProps,
}                   from './UseAccordion'
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
} from '../../System'
import React        from 'react'
import {
   createContext,
   MaybeRenderProp,
}                   from '../ReactUtils'
import {
   cx,
   runIfFn,
}                   from '../../Utils'
import { Collapse } from '../Transition'
import {
   Icon,
   IconProps,
}                   from '../Icon'

/* -------------------------------------------------------------------------------------------------
 * Accordion - The wrapper that provides context for all accordion items
 * -----------------------------------------------------------------------------------------------*/

export interface AccordionProps
   extends UseAccordionProps,
      Omit<HTMLChalkProps<"div">, keyof UseAccordionProps>,
      ThemingProps<"Accordion"> {
   /**
    * If `true`, height animation and transitions will be disabled.
    */
   reduceMotion?: boolean
}

/**
 * The wrapper that provides context and focus management
 * for all accordion items.
 *
 * It wraps all accordion items in a `div` for better grouping.
 * @see Docs https://chalk-ui.com/docs/components/accordion
 */
export const Accordion = forwardRef<AccordionProps, "div">(
   ({ children, reduceMotion, ...props }, ref) => {
      const styles = useMultiStyleConfig("Accordion", props)
      const ownProps = omitThemingProps(props)
      const theme = useTheme()
      
      const { htmlProps, descendants, ...context } = useAccordion(ownProps)
      
      const ctx = React.useMemo(
         () => ({ ...context, reduceMotion: !!reduceMotion }),
         [context, reduceMotion],
      )
      
      return (
         <AccordionDescendantsProvider value={descendants}>
            <AccordionProvider value={ctx}>
               <StylesProvider value={styles}>
                  <chalk.div
                     ref={ref}
                     theme={theme}
                     {...htmlProps}
                     className={cx("chalk-accordion", props.className)}
                  >
                     {children}
                  </chalk.div>
               </StylesProvider>
            </AccordionProvider>
         </AccordionDescendantsProvider>
      )
   },
)


/* -------------------------------------------------------------------------------------------------
 * Accordion Item
 * -----------------------------------------------------------------------------------------------*/

type AccordionItemContext = Omit<UseAccordionItemReturn, "htmlProps">

const [
   AccordionItemProvider,
   useAccordionItemContext,
] = createContext<AccordionItemContext>({
   name: "AccordionItemContext",
   errorMessage:
      "useAccordionItemContext: `context` is undefined. Seems you forgot to wrap the accordion item parts in `<AccordionItem />` ",
})

export interface AccordionItemProps
   extends Omit<HTMLChalkProps<"div">, keyof UseAccordionItemProps>,
      UseAccordionItemProps {
   children?: MaybeRenderProp<{
      isExpanded: boolean
      isDisabled: boolean
   }>
}

/**
 * AccordionItem is a single accordion that provides the open-close
 * behavior when the accordion button is clicked.
 *
 * It also provides context for the accordion button and panel.
 */
export const AccordionItem = forwardRef<AccordionItemProps, "div">(
   (props, ref) => {
      const { children, className } = props
      const { htmlProps, ...context } = useAccordionItem(props)
      const theme = useTheme()
      
      const styles = useStyles()
      const containerStyles: SystemStyleObject = {
         ...styles.container,
         overflowAnchor: "none",
      }
      
      const ctx = React.useMemo(() => context, [context])
      
      return (
         <AccordionItemProvider value={ctx}>
            <chalk.div
               ref={ref}
               theme={theme}
               {...htmlProps}
               className={cx("chalk-accordion__item", className)}
               __css={containerStyles}
            >
               {runIfFn(children, {
                  isExpanded: !!context.isOpen,
                  isDisabled: !!context.isDisabled,
               })}
            </chalk.div>
         </AccordionItemProvider>
      )
   },
)


/**
 * React hook to get the state and actions of an accordion item
 */
export function useAccordionItemState() {
   const { isOpen, isDisabled, onClose, onOpen } = useAccordionItemContext()
   return { isOpen, onClose, isDisabled, onOpen }
}

/* -------------------------------------------------------------------------------------------------
 * Accordion Item => Button
 * -----------------------------------------------------------------------------------------------*/

export interface AccordionButtonProps extends HTMLChalkProps<"button"> {
}

/**
 * AccordionButton is used expands and collapses an accordion item.
 * It must be a child of `AccordionItem`.
 *
 * Note 🚨: Each accordion button must be wrapped in an heading tag,
 * that is appropriate for the information architecture of the page.
 */
export const AccordionButton = forwardRef<AccordionButtonProps, "button">(
   (props, ref) => {
      const { getButtonProps } = useAccordionItemContext()
      const buttonProps = getButtonProps(props, ref)
      const theme = useTheme()
      
      const styles = useStyles()
      const buttonStyles: SystemStyleObject = {
         display: "flex",
         alignItems: "center",
         width: "100%",
         transition: "all 0.2s",
         outline: 0,
         ...styles.button,
      }
      
      return (
         <chalk.button
            theme={theme}
            {...buttonProps}
            className={cx("chalk-accordion__button", props.className)}
            __css={buttonStyles}
         />
      )
   },
)


/* -------------------------------------------------------------------------------------------------
 * Accordion Item => Panel
 * -----------------------------------------------------------------------------------------------*/

export interface AccordionPanelProps extends HTMLChalkProps<"div"> {
}

/**
 * Accordion panel that holds the content for each accordion.
 * It shows and hides based on the state login from the `AccordionItem`.
 *
 * It uses the `Collapse` component to animate its height.
 */
export const AccordionPanel = forwardRef<AccordionPanelProps, "div">(
   (props, ref) => {
      const { reduceMotion } = useAccordionContext()
      const { getPanelProps, isOpen } = useAccordionItemContext()
      const theme = useTheme()
      
      // remove `hidden` prop, 'coz we're using height animation
      const panelProps = getPanelProps(props, ref)
      
      const _className = cx("chalk-accordion__panel", props.className)
      const styles = useStyles()
      
      if (!reduceMotion) {
         delete panelProps.hidden
      }
      
      const child = (
         <chalk.div theme={theme} {...panelProps} __css={styles.panel} className={_className} />
      )
      
      if (!reduceMotion) {
         return <Collapse in={isOpen}>{child}</Collapse>
      }
      
      return child
   },
)


/* -------------------------------------------------------------------------------------------------
 * Accordion Item => Icon
 * -----------------------------------------------------------------------------------------------*/

/**
 * AccordionIcon that gives a visual cue of the open/close state of the accordion item.
 * It rotates `180deg` based on the open/close state.
 */
export const AccordionIcon: React.FC<IconProps> = (props) => {
   const { isOpen, isDisabled } = useAccordionItemContext()
   const { reduceMotion } = useAccordionContext()
   const theme = useTheme()
   
   const _className = cx("chalk-accordion__icon", props.className)
   const styles = useStyles()
   
   const iconStyles: SystemStyleObject = {
      opacity: isDisabled ? 0.4 : 1,
      transform: isOpen ? "rotate(-180deg)" : undefined,
      transition: reduceMotion ? undefined : "transform 0.2s",
      transformOrigin: "center",
      ...styles.icon,
   }
   
   return (
      <Icon
         viewBox="0 0 24 24"
         aria-hidden
         className={_className}
         __css={iconStyles}
         {...props}
      >
         <path
            fill="currentColor"
            d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
         />
      </Icon>
   )
}
