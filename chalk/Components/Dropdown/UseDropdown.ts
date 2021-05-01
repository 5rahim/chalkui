import { useClickable } from "../../Hooks/use-clickable"
import { createDescendantContext } from "../Descendant"
import {
   useControllableState,
   useDisclosure,
   UseDisclosureProps,
   useFocusOnHide,
   useId,
   useIds,
   useOutsideClick,
   useShortcut,
   useUpdateEffect,
} from "../../Hooks"
import { usePopper, UsePopperProps } from "../Popper"
import {
   createContext,
   EventKeyMap,
   getValidChildren,
   mergeRefs,
} from "../ReactUtils"
import {
   addItem,
   callAllHandlers,
   dataAttr,
   determineLazyBehavior,
   focus,
   getNextItemFromSearch,
   getOwnerDocument,
   isActiveElement,
   isArray,
   isString,
   LazyBehavior,
   normalizeEventKey,
   removeItem,
} from "../../Utils"
import * as React from "react"

/* -------------------------------------------------------------------------------------------------
 * Create context to track descendants and their indices
 * -----------------------------------------------------------------------------------------------*/

export const [
   DropdownDescendantsProvider,
   useDropdownDescendantsContext,
   useDropdownDescendants,
   useDropdownDescendant,
] = createDescendantContext<HTMLElement>()

/* -------------------------------------------------------------------------------------------------
 * Create context to track dropdown state and logic
 * -----------------------------------------------------------------------------------------------*/

export const [DropdownProvider, useDropdownContext] = createContext<
   Omit<UseDropdownReturn, "descendants">
   >({
   strict: false,
   name: "DropdownContext",
})

/* -------------------------------------------------------------------------------------------------
 * useDropdown hook
 * -----------------------------------------------------------------------------------------------*/

export interface UseDropdownProps extends UsePopperProps, UseDisclosureProps {
   /**
    * If `true`, the dropdown will close when a dropdown item is
    * clicked
    *
    * @default true
    */
   closeOnSelect?: boolean
   /**
    * If `true`, the dropdown will close when you click outside
    * the dropdown list
    *
    * @default true
    */
   closeOnBlur?: boolean
   /**
    * If `true`, the first enabled dropdown item will receive focus and be selected
    * when the dropdown opens.
    *
    * @default true
    */
   autoSelect?: boolean
   /**
    * Performance 🚀:
    * If `true`, the DropdownItem rendering will be deferred
    * until the dropdown is open.
    */
   isLazy?: boolean
   /**
    * Performance 🚀:
    * The lazy behavior of dropdown's content when not visible.
    * Only works when `isLazy={true}`
    *
    * - "unmount": The dropdown's content is always unmounted when not open.
    * - "keepMounted": The dropdown's content initially unmounted,
    * but stays mounted when dropdown is open.
    *
    * @default "unmount"
    */
   lazyBehavior?: LazyBehavior
}

/**
 * React Hook to manage a dropdown
 *
 * It provides the logic and will be used with react context
 * to propagate its return value to all children
 */
export function useDropdown(props: UseDropdownProps = {}) {
   const {
      id,
      closeOnSelect = true,
      closeOnBlur = true,
      autoSelect = true,
      isLazy,
      isOpen: isOpenProp,
      defaultIsOpen,
      onClose: onCloseProp,
      onOpen: onOpenProp,
      placement = "bottom-start",
      lazyBehavior = "unmount",
      ...popperProps
   } = props
   
   const { isOpen, onOpen, onClose, onToggle } = useDisclosure({
      isOpen: isOpenProp,
      defaultIsOpen,
      onClose: onCloseProp,
      onOpen: onOpenProp,
   })
   
   /**
    * Prepare the reference to the dropdown and disclosure
    */
   const dropdownRef = React.useRef<HTMLDivElement>(null)
   const buttonRef = React.useRef<HTMLButtonElement>(null)
   
   useOutsideClick({
      ref: dropdownRef,
      handler: (event) => {
         if (
            isOpen &&
            closeOnBlur &&
            !buttonRef.current?.contains(event.target as HTMLElement)
         ) {
            onClose()
         }
      },
   })
   
   /**
    * Add some popper.js for dynamic positioning
    */
   const popper = usePopper({
      ...popperProps,
      placement,
   })
   
   const [focusedIndex, setFocusedIndex] = React.useState(-1)
   
   /**
    * Context to register all dropdown item nodes
    */
   const descendants = useDropdownDescendants()
   
   /**
    * Focus the button when we close the dropdown
    */
   useUpdateEffect(() => {
      if (!isOpen) {
         setFocusedIndex(-1)
      }
   }, [isOpen])
   
   useFocusOnHide(dropdownRef, {
      focusRef: buttonRef,
      visible: isOpen,
      shouldFocus: true,
   })
   
   /**
    * Generate unique ids for dropdown's list and button
    */
   const [buttonId, dropdownId] = useIds(id, `dropdown-button`, `dropdown-list`)
   
   const openAndFocusDropdown = React.useCallback(() => {
      onOpen()
      focus(dropdownRef.current, { nextTick: true })
   }, [onOpen, dropdownRef])
   
   const openAndFocusFirstItem = React.useCallback(() => {
      onOpen()
      const first = descendants.firstEnabled()
      if (first) setFocusedIndex(first.index)
   }, [onOpen, setFocusedIndex, descendants])
   
   const openAndFocusLastItem = React.useCallback(() => {
      onOpen()
      const last = descendants.lastEnabled()
      if (last) setFocusedIndex(last.index)
   }, [onOpen, setFocusedIndex, descendants])
   
   const refocus = React.useCallback(() => {
      const doc = getOwnerDocument(dropdownRef.current)
      const hasFocusWithin = dropdownRef.current?.contains(doc.activeElement)
      const shouldRefocus = isOpen && !hasFocusWithin
      
      if (!shouldRefocus) return
      
      const el = descendants.item(focusedIndex)?.node
      if (el) focus(el)
   }, [isOpen, focusedIndex, descendants])
   
   return {
      openAndFocusDropdown,
      openAndFocusFirstItem,
      openAndFocusLastItem,
      onTransitionEnd: refocus,
      descendants,
      popper,
      buttonId,
      dropdownId,
      forceUpdate: popper.forceUpdate,
      orientation: "vertical",
      isOpen,
      onToggle,
      onOpen,
      onClose,
      dropdownRef,
      buttonRef,
      focusedIndex,
      closeOnSelect,
      closeOnBlur,
      autoSelect,
      setFocusedIndex,
      isLazy,
      lazyBehavior,
   }
}

export interface UseDropdownReturn extends ReturnType<typeof useDropdown> {}

/* -------------------------------------------------------------------------------------------------
 * useDropdownButton hook
 * -----------------------------------------------------------------------------------------------*/
export interface UseDropdownButtonProps
   extends Omit<React.HTMLAttributes<Element>, "color"> {}

/**
 * React Hook to manage a dropdown button.
 *
 * The assumption here is that the `useDropdown` hook is used
 * in a component higher up the tree, and its return value
 * is passed as `context` to this hook.
 */
export function useDropdownButton(
   props: UseDropdownButtonProps = {},
   externalRef: React.Ref<any> = null,
) {
   const dropdown = useDropdownContext()
   
   const {
      isOpen,
      onClose,
      autoSelect,
      popper,
      openAndFocusFirstItem,
      openAndFocusLastItem,
      openAndFocusDropdown,
   } = dropdown
   
   const onClick = React.useCallback(() => {
      if (isOpen) {
         onClose()
      } else {
         const action = autoSelect ? openAndFocusFirstItem : openAndFocusDropdown
         action()
      }
   }, [autoSelect, isOpen, onClose, openAndFocusFirstItem, openAndFocusDropdown])
   
   const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
         const eventKey = normalizeEventKey(event)
         const keyMap: EventKeyMap = {
            Enter: openAndFocusFirstItem,
            ArrowDown: openAndFocusFirstItem,
            ArrowUp: openAndFocusLastItem,
         }
         
         const action = keyMap[eventKey]
         
         if (action) {
            event.preventDefault()
            event.stopPropagation()
            action(event)
         }
      },
      [openAndFocusFirstItem, openAndFocusLastItem],
   )
   
   return {
      ...props,
      ref: mergeRefs(dropdown.buttonRef, externalRef, popper.referenceRef),
      id: dropdown.buttonId,
      "data-active": dataAttr(dropdown.isOpen),
      "aria-expanded": dropdown.isOpen,
      "aria-haspopup": "dropdown" as React.AriaAttributes["aria-haspopup"],
      "aria-controls": dropdown.dropdownId,
      onClick: callAllHandlers(props.onClick, onClick),
      onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
   }
}

function isTargetDropdownItem(event: Pick<MouseEvent, "currentTarget">) {
   const target = event.currentTarget as HTMLElement
   // this will catch `dropdownitem`, `dropdownitemradio`, `dropdownitemcheckbox`
   return !!target.getAttribute("role")?.startsWith("dropdownitem")
}

/* -------------------------------------------------------------------------------------------------
 * useDropdownList
 * -----------------------------------------------------------------------------------------------*/

export interface UseDropdownListProps
   extends Omit<React.HTMLAttributes<Element>, "color"> {}

/**
 * React Hook to manage a dropdown list.
 *
 * The assumption here is that the `useDropdown` hook is used
 * in a component higher up the tree, and its return value
 * is passed as `context` to this hook.
 */
export function useDropdownList(
   props: UseDropdownListProps = {},
   ref: React.Ref<any> = null,
) {
   const dropdown = useDropdownContext()
   
   if (!dropdown) {
      throw new Error(
         `useDropdownContext: context is undefined. Seems you forgot to wrap component within <Dropdown>`,
      )
   }
   
   const {
      focusedIndex,
      setFocusedIndex,
      dropdownRef,
      isOpen,
      onClose,
      dropdownId,
      isLazy,
      lazyBehavior,
   } = dropdown
   
   const descendants = useDropdownDescendantsContext()
   
   /**
    * Hook that creates a keydown event handler that listens
    * to printable keyboard character press
    */
   const createTypeaheadHandler = useShortcut({
      preventDefault: (event) => {
         const isDropdownItem = isTargetDropdownItem(event)
         return event.key !== " " && isDropdownItem
      },
   })
   
   const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
         const eventKey = normalizeEventKey(event)
         
         const keyMap: EventKeyMap = {
            Tab: (event) => event.preventDefault(),
            Escape: onClose,
            ArrowDown: () => {
               const next = descendants.nextEnabled(focusedIndex)
               if (next) setFocusedIndex(next.index)
            },
            ArrowUp: () => {
               const prev = descendants.prevEnabled(focusedIndex)
               if (prev) setFocusedIndex(prev.index)
            },
         }
         
         const fn = keyMap[eventKey]
         
         if (fn) {
            event.preventDefault()
            fn(event)
            return
         }
         
         /**
          * Typeahead: Based on current character pressed,
          * find the next item to be selected
          */
         const onTypeahead = createTypeaheadHandler((character) => {
            const nextItem = getNextItemFromSearch(
               descendants.values(),
               character,
               (item) => item?.node?.textContent ?? "",
               descendants.item(focusedIndex),
            )
            if (nextItem) {
               const index = descendants.indexOf(nextItem.node)
               setFocusedIndex(index)
            }
         })
         
         onTypeahead(event)
      },
      [
         descendants,
         focusedIndex,
         createTypeaheadHandler,
         onClose,
         setFocusedIndex,
      ],
   )
   
   const hasBeenOpened = React.useRef(false)
   if (isOpen) {
      hasBeenOpened.current = true
   }
   
   const shouldRenderChildren = determineLazyBehavior({
      hasBeenSelected: hasBeenOpened.current,
      isLazy,
      lazyBehavior,
      isSelected: isOpen,
   })
   
   return {
      ...props,
      ref: mergeRefs(dropdownRef, ref),
      children: shouldRenderChildren ? props.children : null,
      tabIndex: -1,
      role: "dropdown",
      id: dropdownId,
      style: {
         ...props.style,
         transformOrigin: "var(--popper-transform-origin)",
      },
      "aria-orientation": "vertical" as React.AriaAttributes["aria-orientation"],
      onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
   }
}

/* -------------------------------------------------------------------------------------------------
 * useDropdownPosition: Composes usePopper to position the dropdown
 * -----------------------------------------------------------------------------------------------*/

export function useDropdownPositioner(props: any = {}) {
   const { popper, isOpen } = useDropdownContext()
   return popper.getPopperProps({
      ...props,
      style: {
         visibility: isOpen ? "visible" : "hidden",
         ...props.style,
      },
   })
}

/* -------------------------------------------------------------------------------------------------
 * useDropdownItem: Hook for each dropdown item within the dropdown list.
 We also use it in `useDropdownItemOption`
 * -----------------------------------------------------------------------------------------------*/

export interface UseDropdownItemProps
   extends Omit<React.HTMLAttributes<Element>, "color"> {
   /**
    * If `true`, the dropdownitem will be disabled
    */
   isDisabled?: boolean
   /**
    * If `true` and the dropdownitem is disabled, it'll
    * remain keyboard-focusable
    */
   isFocusable?: boolean
   /**
    * Overrides the parent dropdown's `closeOnSelect` prop.
    */
   closeOnSelect?: boolean
}

export function useDropdownItem(
   props: UseDropdownItemProps = {},
   externalRef: React.Ref<any> = null,
) {
   const {
      onMouseEnter: onMouseEnterProp,
      onMouseMove: onMouseMoveProp,
      onMouseLeave: onMouseLeaveProp,
      onClick: onClickProp,
      isDisabled,
      isFocusable,
      closeOnSelect,
      ...htmlProps
   } = props
   
   const dropdown = useDropdownContext()
   
   const {
      setFocusedIndex,
      focusedIndex,
      closeOnSelect: dropdownCloseOnSelect,
      onClose,
      dropdownRef,
      isOpen,
      dropdownId,
   } = dropdown
   
   const ref = React.useRef<HTMLDivElement>(null)
   const id = `${dropdownId}-dropdownitem-${useId()}`
   
   /**
    * Register the dropdownitem's node into the domContext
    */
   const { index, register } = useDropdownDescendant({
      disabled: isDisabled && !isFocusable,
   })
   
   const onMouseEnter = React.useCallback(
      (event) => {
         onMouseEnterProp?.(event)
         if (isDisabled) return
         setFocusedIndex(index)
      },
      [setFocusedIndex, index, isDisabled, onMouseEnterProp],
   )
   
   const onMouseMove = React.useCallback(
      (event) => {
         onMouseMoveProp?.(event)
         if (ref.current && !isActiveElement(ref.current)) {
            onMouseEnter(event)
         }
      },
      [onMouseEnter, onMouseMoveProp],
   )
   
   const onMouseLeave = React.useCallback(
      (event) => {
         onMouseLeaveProp?.(event)
         if (isDisabled) return
         setFocusedIndex(-1)
      },
      [setFocusedIndex, isDisabled, onMouseLeaveProp],
   )
   
   const onClick = React.useCallback(
      (event: React.MouseEvent) => {
         onClickProp?.(event)
         if (!isTargetDropdownItem(event)) return
         /**
          * Close dropdown and parent dropdowns, allowing the DropdownItem
          * to override its parent dropdown's `closeOnSelect` prop.
          */
         if (closeOnSelect ?? dropdownCloseOnSelect) {
            onClose()
         }
      },
      [onClose, onClickProp, dropdownCloseOnSelect, closeOnSelect],
   )
   
   const isFocused = index === focusedIndex
   
   const trulyDisabled = isDisabled && !isFocusable
   
   useUpdateEffect(() => {
      if (!isOpen) return
      if (isFocused && !trulyDisabled && ref.current) {
         focus(ref.current, { nextTick: true })
      } else if (dropdownRef.current && !isActiveElement(dropdownRef.current)) {
         focus(dropdownRef.current)
      }
   }, [isFocused, trulyDisabled, dropdownRef, isOpen])
   
   const clickableProps = useClickable({
      onClick,
      onMouseEnter,
      onMouseMove,
      onMouseLeave,
      ref: mergeRefs(register, ref, externalRef),
      isDisabled,
      isFocusable,
   })
   
   return {
      ...htmlProps,
      ...clickableProps,
      id,
      role: "dropdownitem",
      tabIndex: isFocused ? 0 : -1,
   }
}

/* -------------------------------------------------------------------------------------------------
 * useDropdownOption: Composes useDropdownItem to provide a selectable/checkable dropdown item
 * -----------------------------------------------------------------------------------------------*/

export interface UseDropdownOptionOptions {
   value?: string
   isChecked?: boolean
   type?: "radio" | "checkbox"
   children?: React.ReactNode
}

export interface UseDropdownOptionProps
   extends UseDropdownItemProps,
      UseDropdownOptionOptions {}

export function useDropdownOption(
   props: UseDropdownOptionProps = {},
   ref: React.Ref<any> = null,
) {
   const { type = "radio", isChecked, ...rest } = props
   const ownProps = useDropdownItem(rest, ref)
   return {
      ...ownProps,
      role: `dropdownitem${type}`,
      "aria-checked": isChecked as React.AriaAttributes["aria-checked"],
   }
}

/* -------------------------------------------------------------------------------------------------
 * useDropdownOptionGroup: Manages the state of multiple selectable dropdownitem or dropdown option
 * -----------------------------------------------------------------------------------------------*/

export interface UseDropdownOptionGroupProps {
   value?: string | string[]
   defaultValue?: string | string[]
   type?: "radio" | "checkbox"
   onChange?: (value: string | string[]) => void
   children?: React.ReactNode
}

export function useDropdownOptionGroup(props: UseDropdownOptionGroupProps = {}) {
   const {
      children,
      type = "radio",
      value: valueProp,
      defaultValue,
      onChange: onChangeProp,
      ...htmlProps
   } = props
   
   const isRadio = type === "radio"
   
   const fallback = isRadio ? "" : []
   
   const [value, setValue] = useControllableState({
      defaultValue: defaultValue ?? fallback,
      value: valueProp,
      onChange: onChangeProp,
   })
   
   const onChange = React.useCallback(
      (selectedValue: string) => {
         if (type === "radio" && isString(value)) {
            setValue(selectedValue)
         }
         
         if (type === "checkbox" && isArray(value)) {
            const nextValue = value.includes(selectedValue)
               ? removeItem(value, selectedValue)
               : addItem(value, selectedValue)
            
            setValue(nextValue)
         }
      },
      [value, setValue, type],
   )
   
   const validChildren = getValidChildren(children)
   
   const clones = validChildren.map((child) => {
      /**
       * We've added an internal `id` to each `DropdownItemOption`,
       * let's use that for type-checking.
       *
       * We can't rely on displayName or the element's type since
       * they can be changed by the user.
       */
      if ((child.type as any).id !== "DropdownItemOption") return child
      
      const onClick = (event: MouseEvent) => {
         onChange(child.props.value)
         child.props.onClick?.(event)
      }
      
      const isChecked =
         type === "radio"
            ? child.props.value === value
            : value.includes(child.props.value)
      
      return React.cloneElement(child, {
         type,
         onClick,
         isChecked,
      })
   })
   
   return {
      ...htmlProps,
      children: clones,
   }
}

export function useDropdownState() {
   const { isOpen, onClose } = useDropdownContext()
   return { isOpen, onClose }
}
