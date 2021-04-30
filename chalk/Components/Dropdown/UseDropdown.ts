import * as React                        from "react"
import {
   addItem, callAllHandlers, dataAttr, focus, getNextIndex,
   getNextItemFromSearch, getPrevIndex, isArray, isString,
   normalizeEventKey, removeItem,
}                                        from '../../Utils'
import {
   useControllableState, useDisclosure, UseDisclosureProps,
   useFocusOnHide, useId, useIds, useOutsideClick, useShortcut, useUpdateEffect,
}                                        from '../../Hooks'
import { usePopper, UsePopperProps }     from '../Popper'
import { useDescendant, useDescendants } from '../../Hooks/use-descendant'
import { useClickable }                                            from '../../Hooks/use-clickable'
import { createContext, EventKeyMap, getValidChildren, mergeRefs } from '../ReactUtils'

const [DropdownProvider, useDropdownContext] = createContext<UseDropdownReturn>({
   strict: false,
   name: "DropdownContext",
})

export { DropdownProvider, useDropdownContext }

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
}

/**
 * React Hook to manage a dropdown
 *
 * It provides the logic and will be used with react context
 * to propagate its return value to all children
 */
export function useDropdown(props: UseDropdownProps) {
   const {
      id,
      closeOnSelect = true,
      closeOnBlur = true,
      autoSelect = true,
      isLazy,
      placement = "bottom-start",
   } = props
   
   const { isOpen, onOpen, onClose, onToggle } = useDisclosure(props)
   
   /**
    * Prepare the reference to the dropdown and disclosure
    */
   const dropdownRef: any = React.useRef<HTMLDivElement>(null)
   const buttonRef: any = React.useRef<HTMLButtonElement>(null)
   
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
      placement,
      ...props,
   })
   
   const [focusedIndex, setFocusedIndex] = React.useState(-1)
   
   /**
    * Context to register all dropdown item nodes
    */
   const domContext = useDescendants<HTMLDivElement, {}>()
   
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
      setFocusedIndex(0)
   }, [onOpen, setFocusedIndex])
   
   const openAndFocusLastItem = React.useCallback(() => {
      onOpen()
      setFocusedIndex(domContext.descendants.length - 1)
   }, [onOpen, setFocusedIndex, domContext.descendants])
   
   const refocus = React.useCallback(() => {
      const hasFocusWithin = dropdownRef.current?.contains(document.activeElement)
      const shouldRefocus = isOpen && !hasFocusWithin
      
      if (!shouldRefocus) return
      
      const el = domContext.descendants[focusedIndex]?.element
      el?.focus({ preventScroll: true })
   }, [isOpen, focusedIndex, domContext.descendants])
   
   return {
      openAndFocusDropdown,
      openAndFocusFirstItem,
      openAndFocusLastItem,
      onTransitionEnd: refocus,
      domContext,
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
   }
}

export interface UseDropdownReturn extends ReturnType<typeof useDropdown> {
}

/**
 * React Hook to manage a dropdown button.
 *
 * The assumption here is that the `useDropdown` hook is used
 * in a component higher up the tree, and its return value
 * is passed as `context` to this hook.
 */

export interface UseDropdownButtonProps
   extends Omit<React.HTMLAttributes<Element>, "color"> {
}

export function useDropdownButton(
   props: UseDropdownButtonProps,
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
   
   const buttonProps = {
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
   
   return buttonProps
}

/**
 * React Hook to manage a dropdown list.
 *
 * The assumption here is that the `useDropdown` hook is used
 * in a component higher up the tree, and its return value
 * is passed as `context` to this hook.
 */

export interface UseDropdownListProps
   extends Omit<React.HTMLAttributes<Element>, "color"> {
}

export function useDropdownList(
   props: UseDropdownListProps,
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
      domContext: { descendants },
      isLazy,
   } = dropdown
   
   /**
    * Hook that creates a keydown event handler that listens
    * to printable keyboard character press
    */
   const onCharacterPress = useShortcut({
      preventDefault: (event) => event.key !== " ",
   })
   
   const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
         const eventKey = normalizeEventKey(event)
         
         const keyMap: EventKeyMap = {
            Tab: (event: any) => {
               event.preventDefault()
            },
            Escape: onClose,
            ArrowDown: () => {
               const nextIndex = getNextIndex(focusedIndex, descendants.length)
               setFocusedIndex(nextIndex)
            },
            ArrowUp: () => {
               const prevIndex = getPrevIndex(focusedIndex, descendants.length)
               setFocusedIndex(prevIndex)
            },
         }
         
         const fn = keyMap[eventKey]
         
         if (fn) {
            event.preventDefault()
            fn(event)
            return
         }
         
         const characterHandler = onCharacterPress((character) => {
            /**
             * Typeahead: Based on current character pressed,
             * find the next item to be selected
             */
            const nextItem = getNextItemFromSearch(
               descendants,
               character,
               (node) => node.element?.textContent || "",
               descendants[focusedIndex],
            )
            
            if (nextItem) {
               const index = descendants.indexOf(nextItem)
               setFocusedIndex(index)
            }
         })
         
         characterHandler(event)
      },
      [descendants, focusedIndex, onCharacterPress, onClose, setFocusedIndex],
   )
   
   return {
      ...props,
      ref: mergeRefs(dropdownRef, ref),
      children: !isLazy || isOpen ? props.children : null,
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

export function useDropdownPositioner(props: any = {}) {
   const { popper, isOpen } = useDropdownContext()
   return {
      ...props,
      ref: popper.popperRef,
      style: { visibility: isOpen ? "visible" : "hidden" },
   }
}

export interface UseDropdownItemProps
   extends Omit<React.HTMLAttributes<Element>, "color"> {
   isDisabled?: boolean
   isFocusable?: boolean
}

export function useDropdownItem(
   props: UseDropdownItemProps,
   externalRef: React.Ref<any> = null,
) {
   const {
      onMouseEnter: onMouseEnterProp,
      onMouseMove: onMouseMoveProp,
      onMouseLeave: onMouseLeaveProp,
      onClick: onClickProp,
      isDisabled,
      isFocusable,
      ...htmlProps
   } = props
   
   const dropdown = useDropdownContext()
   
   const {
      domContext,
      setFocusedIndex,
      focusedIndex,
      closeOnSelect,
      onClose,
      dropdownRef,
      isOpen,
   } = dropdown
   
   const ref = React.useRef<HTMLDivElement>(null)
   const id = `dropdownitem-${useId()}`
   
   /**
    * Register the dropdownitem's node into the domContext
    */
   const index = useDescendant({
      element: ref.current,
      context: domContext,
      disabled: isDisabled,
      focusable: isFocusable,
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
         if (document.activeElement !== ref.current) {
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
         /**
          * Close dropdown and parent dropdown's if `closeOnSelect` is set to `true`
          */
         if (closeOnSelect) {
            onClose()
         }
      },
      [onClose, onClickProp, closeOnSelect],
   )
   
   const isFocused = index === focusedIndex
   
   const trulyDisabled = isDisabled && !isFocusable
   
   useUpdateEffect(() => {
      if (!isOpen) return
      if (isFocused && !trulyDisabled && ref.current) {
         focus(ref.current, { nextTick: true })
      } else if (document.activeElement !== dropdownRef.current) {
         dropdownRef.current?.focus()
      }
   }, [isFocused, trulyDisabled, dropdownRef, isOpen])
   
   const tabbable = useClickable({
      onClick,
      onMouseEnter,
      onMouseMove,
      onMouseLeave,
      ref: mergeRefs(ref, externalRef),
      isDisabled,
      isFocusable,
   })
   
   return {
      ...htmlProps,
      ...tabbable,
      id,
      role: "dropdownitem",
      tabIndex: isFocused ? 0 : -1,
   }
}

export interface UseDropdownOptionOptions {
   value?: string
   isChecked?: boolean
   type?: "radio" | "checkbox"
   children?: React.ReactNode
}

export interface UseDropdownOptionProps
   extends UseDropdownItemProps,
      UseDropdownOptionOptions {
}

export function useDropdownOption(
   props: UseDropdownOptionProps,
   externalRef: React.Ref<any> = null,
) {
   const {
      onClick,
      isDisabled,
      isFocusable,
      type = "radio",
      isChecked,
      ...rest
   } = props
   
   const hookProps = { isDisabled, isFocusable, onClick }
   const optionsProps = useDropdownItem(hookProps, externalRef)
   
   return {
      ...rest,
      ...optionsProps,
      role: `dropdownitem${type}`,
      "aria-checked": isChecked as React.AriaAttributes["aria-checked"],
   }
}

export interface UseDropdownOptionGroupProps {
   value?: string | string[]
   defaultValue?: string | string[]
   type?: "radio" | "checkbox"
   onChange?: (value: string | string[]) => void
   children?: React.ReactNode
}

export function useDropdownOptionGroup(props: UseDropdownOptionGroupProps) {
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
