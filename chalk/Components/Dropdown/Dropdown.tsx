import {
   chalk,
   forwardRef,
   HTMLChalkProps,
   omitThemingProps,
   PropsOf,
   StylesProvider,
   SystemProps,
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
import { MaybeRenderProp } from "../ReactUtils"
import {
   CustomDomComponent,
   motion,
   Variants,
}                          from "framer-motion"
import * as React          from "react"

import {
   DropdownDescendantsProvider,
   DropdownProvider,
   useDropdown,
   useDropdownButton,
   useDropdownContext,
   useDropdownItem,
   UseDropdownItemProps,
   useDropdownList,
   useDropdownOption,
   useDropdownOptionGroup,
   UseDropdownOptionGroupProps,
   UseDropdownOptionOptions,
   useDropdownPositioner,
   UseDropdownProps,
} from "./UseDropdown"

export interface DropdownProps extends UseDropdownProps, ThemingProps<"Dropdown"> {
   children: MaybeRenderProp<{
      isOpen: boolean
      onClose: () => void
      forceUpdate: (() => void) | undefined
   }>
}

/**
 * Dropdown provides context, state, and focus management
 * to its sub-components. It doesn't render any DOM node.
 */
export const Dropdown: React.FC<DropdownProps> = (props) => {
   const { children } = props
   
   const styles = useMultiStyleConfig("Dropdown", props)
   const ownProps = omitThemingProps(props)
   
   const { descendants, ...ctx } = useDropdown(ownProps)
   const context = React.useMemo(() => ctx, [ctx])
   
   const { isOpen, onClose, forceUpdate } = context
   
   return (
      <DropdownDescendantsProvider value={descendants}>
         <DropdownProvider value={context}>
            <StylesProvider value={styles}>
               {runIfFn(children, { isOpen, onClose, forceUpdate })}
            </StylesProvider>
         </DropdownProvider>
      </DropdownDescendantsProvider>
   )
}


export interface DropdownButtonProps extends HTMLChalkProps<"button"> {
}

const StyledDropdownButton = forwardRef<DropdownButtonProps, "button">((props, ref) => {
   const styles = useStyles()
   const theme = useTheme()
   return (
      <chalk.button
         theme={theme}
         ref={ref}
         {...props}
         __css={{
            display: "inline-flex",
            appearance: "none",
            alignItems: "center",
            outline: 0,
            transition: "all 250ms",
            ...styles.button,
         }}
      />
   )
})

/**
 * The trigger for the dropdown list. Must be a direct child of `Dropdown`.
 */
export const DropdownButton = forwardRef<DropdownButtonProps, "button">(
   (props, ref) => {
      const { children, as: As, ...rest } = props
      const theme = useTheme()
      const buttonProps = useDropdownButton(rest, ref)
      
      const Element = As || StyledDropdownButton
      
      return (
         <Element
            theme={theme}
            {...buttonProps}
            className={cx("chalk-dropdown__dropdown-button", props.className)}
         >
            <chalk.span theme={theme} __css={{ pointerEvents: "none", flex: "1 1 auto", minW: 0 }}>
               {props.children}
            </chalk.span>
         </Element>
      )
   },
)


export interface DropdownListProps extends HTMLChalkProps<"div"> {
   rootProps?: HTMLChalkProps<"div">
}

const motionVariants: Variants = {
   enter: {
      visibility: "visible",
      opacity: 1,
      scale: 1,
      transition: {
         duration: 0.2,
         ease: [0.4, 0, 0.2, 1],
      },
   },
   exit: {
      transitionEnd: {
         visibility: "hidden",
      },
      opacity: 0,
      scale: 0.8,
      transition: {
         duration: 0.1,
         easings: "easeOut",
      },
   },
}

// @future: only call `motion(chalk.div)` when we drop framer-motion v3 support
const MotionDiv: CustomDomComponent<PropsOf<typeof chalk.div>> =
   "custom" in motion
      ? (motion as any).custom(chalk.div)
      : (motion as any)(chalk.div)

export const DropdownList = forwardRef<DropdownListProps, "div">((props, ref) => {
   const { rootProps, ...rest } = props
   const { isOpen, onTransitionEnd } = useDropdownContext()
   const theme = useTheme()
   const listProps: any = useDropdownList(rest, ref)
   const positionerProps = useDropdownPositioner(rootProps)
   
   const styles = useStyles()
   
   return (
      <chalk.div
         theme={theme}
         {...positionerProps}
         __css={{ zIndex: props.zIndex ?? styles.list?.zIndex }}
      >
         <MotionDiv
            theme={theme}
            {...listProps}
            /**
             * We could call this on either `onAnimationComplete` or `onUpdate`.
             * It seems the re-focusing works better with the `onUpdate`
             */
            onUpdate={onTransitionEnd}
            className={cx("chalk-dropdown__dropdown-list", listProps.className)}
            variants={motionVariants}
            initial={false}
            animate={isOpen ? "enter" : "exit"}
            __css={{
               outline: 0,
               ...styles.list,
            }}
         />
      </chalk.div>
   )
})


export interface StyledDropdownItemProps extends HTMLChalkProps<"button"> {
}

const StyledDropdownItem = forwardRef<StyledDropdownItemProps, "button">(
   (props, ref) => {
      const { type, ...rest } = props
      const styles = useStyles()
      const theme = useTheme()
      /**
       * Given another component, use its type if present
       * Else, use no type to avoid invalid html, e.g. <a type="button" />
       * Else, fall back to "button"
       */
      const btnType = rest.as ? type ?? undefined : "button"
      
      const buttonStyles: SystemStyleObject = {
         textDecoration: "none",
         color: "inherit",
         userSelect: "none",
         display: "flex",
         width: "100%",
         alignItems: "center",
         textAlign: "left",
         flex: "0 0 auto",
         outline: 0,
         ...styles.item,
      }
      
      return (
         <chalk.button theme={theme} ref={ref} type={btnType} {...rest} __css={buttonStyles} />
      )
   },
)

interface DropdownItemOptions
   extends Pick<UseDropdownItemProps,
      "isDisabled" | "isFocusable" | "closeOnSelect"> {
   /**
    * The icon to render before the dropdown item's label.
    * @type React.ReactElement
    */
   icon?: React.ReactElement
   /**
    * The spacing between the icon and dropdown item's label.
    * @type SystemProps["mr"]
    */
   iconSpacing?: SystemProps["mr"]
   /**
    * Right-aligned label text content, useful for displaying hotkeys.
    */
   command?: string
   /**
    * The spacing between the command and dropdown item's label.
    * @type SystemProps["ml"]
    */
   commandSpacing?: SystemProps["ml"]
}

export interface DropdownItemProps
   extends HTMLChalkProps<"button">,
      DropdownItemOptions {
}

export const DropdownItem = forwardRef<DropdownItemProps, "button">((props, ref) => {
   const {
      icon,
      iconSpacing = "0.75rem",
      command,
      commandSpacing = "0.75rem",
      children,
      ...rest
   } = props
   
   const dropdownItemProps = useDropdownItem(rest, ref) as DropdownItemProps
   const theme = useTheme()
   const shouldWrap = icon || command
   
   const _children = shouldWrap ? (
      <span style={{ pointerEvents: "none", flex: 1 }}>{children}</span>
   ) : (
      children
   )
   
   return (
      <StyledDropdownItem
         theme={theme}
         {...dropdownItemProps}
         className={cx("chalk-dropdown__dropdownitem", dropdownItemProps.className)}
      >
         {icon && (
            <DropdownIcon fontSize="0.8em" marginRight={iconSpacing}>
               {icon}
            </DropdownIcon>
         )}
         {_children}
         {command && (
            <DropdownCommand marginLeft={commandSpacing}>{command}</DropdownCommand>
         )}
      </StyledDropdownItem>
   )
})


const CheckIcon: React.FC<PropsOf<"svg">> = (props) => (
   <svg viewBox="0 0 14 14" width="1em" height="1em" {...props}>
      <polygon
         fill="currentColor"
         points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"
      />
   </svg>
)

export interface DropdownItemOptionProps
   extends UseDropdownOptionOptions,
      Omit<DropdownItemProps, keyof UseDropdownOptionOptions> {
   /**
    * @type React.ReactElement
    */
   icon?: React.ReactElement
   /**
    * @type SystemProps["mr"]
    */
   iconSpacing?: SystemProps["mr"]
}

export const DropdownItemOption = forwardRef<DropdownItemOptionProps, "button">(
   (props, ref) => {
      const { icon, iconSpacing = "0.75rem", ...rest } = props
      const theme = useTheme()
      const optionProps = useDropdownOption(rest, ref) as StyledDropdownItemProps
      
      return (
         <StyledDropdownItem
            theme={theme}
            {...optionProps}
            className={cx("chalk-dropdown__dropdownitem-option", rest.className)}
         >
            <DropdownIcon
               fontSize="0.8em"
               marginRight={iconSpacing}
               opacity={props.isChecked ? 1 : 0}
            >
               {icon || <CheckIcon />}
            </DropdownIcon>
            <span style={{ flex: 1 }}>{optionProps.children}</span>
         </StyledDropdownItem>
      )
   },
)

DropdownItemOption.id = "DropdownItemOption"


export interface DropdownOptionGroupProps
   extends UseDropdownOptionGroupProps,
      Omit<DropdownGroupProps, "value" | "defaultValue" | "onChange"> {
}

export const DropdownOptionGroup: React.FC<DropdownOptionGroupProps> = (props) => {
   const { className, title, ...rest } = props
   const ownProps = useDropdownOptionGroup(rest)
   return (
      <DropdownGroup
         // @ts-ignore
         title={title}
         className={cx("chalk-dropdown__option-group", className)}
         {...ownProps}
      />
   )
}

if (__DEV__) {
   DropdownOptionGroup.displayName = "DropdownOptionGroup"
}

export interface DropdownGroupProps extends HTMLChalkProps<"div"> {
}

export const DropdownGroup = forwardRef<DropdownGroupProps, "div">((props, ref) => {
   const { title, children, className, ...rest } = props
   const theme = useTheme()
   const _className = cx("chalk-dropdown__group__title", className)
   const styles = useStyles()
   
   return (
      <div ref={ref} className="chalk-dropdown__group" role="group">
         {title && (
            <chalk.p theme={theme} className={_className} {...rest} __css={styles.groupTitle}>
               {title}
            </chalk.p>
         )}
         {children}
      </div>
   )
})


export interface DropdownCommandProps extends HTMLChalkProps<"span"> {
}

export const DropdownCommand = forwardRef<DropdownCommandProps, "span">(
   (props, ref) => {
      const styles = useStyles()
      const theme = useTheme()
      return (
         <chalk.span
            theme={theme}
            ref={ref}
            {...props}
            __css={styles.command}
            className="chalk-dropdown__command"
         />
      )
   },
)


export const DropdownIcon: React.FC<HTMLChalkProps<"span">> = (props) => {
   const { className, children, ...rest } = props
   const theme = useTheme()
   const child = React.Children.only(children)
   
   const clone = React.isValidElement(child)
      ? React.cloneElement(child, {
         theme: theme,
         focusable: "false",
         "aria-hidden": true,
         className: cx("chalk-dropdown__icon", child.props.className),
      })
      : null
   
   const _className = cx("chalk-dropdown__icon-wrapper", className)
   
   return (
      <chalk.span
         theme={theme}
         className={_className}
         {...rest}
         __css={{
            flexShrink: 0,
         }}
      >
         {clone}
      </chalk.span>
   )
}


export interface DropdownDividerProps extends HTMLChalkProps<"hr"> {
}

export const DropdownDivider: React.FC<DropdownDividerProps> = (props) => {
   const { className, ...rest } = props
   const styles = useStyles()
   const theme = useTheme()
   return (
      <chalk.hr
         theme={theme}
         role="separator"
         aria-orientation="horizontal"
         className={cx("chalk-dropdown__divider", className)}
         {...rest}
         __css={styles.divider}
      />
   )
}
