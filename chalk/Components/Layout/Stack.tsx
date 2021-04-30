import { SystemProps }                                                 from '../../StyledSystem'
import { getDividerStyles, getStackStyles, selector, StackDirection }  from './Stack.utils'
import { chalk, ChalkComponent, forwardRef, HTMLChalkProps, useTheme } from '../../System'
import { cx }                                                          from '../../Utils'
import React                                                           from 'react'
import { getValidChildren }                                            from '../ReactUtils'

export type { StackDirection }

interface StackOptions {
   /**
    * Shorthand for `alignItems` style prop
    * @type SystemProps["alignItems"]
    */
   align?: SystemProps["alignItems"]
   /**
    * Shorthand for `justifyContent` style prop
    * @type SystemProps["justifyContent"]
    */
   justify?: SystemProps["justifyContent"]
   /**
    * Shorthand for `flexWrap` style prop
    * @type SystemProps["flexWrap"]
    */
   wrap?: SystemProps["flexWrap"]
   /**
    * The space between each stack item
    * @type SystemProps["margin"]
    */
   spacing?: SystemProps["margin"]
   /**
    * The direction to stack the items.
    */
   direction?: StackDirection
   /**
    * If `true`, each stack item will show a divider
    * @type React.ReactElement
    */
   divider?: React.ReactElement
   /**
    * If `true`, the children will be wrapped in a `Box` with
    * `display: inline-block`, and the `Box` will take the spacing props
    */
   shouldWrapChildren?: boolean
   /**
    * If `true` the items will be stacked horizontally.
    */
   isInline?: boolean
}

export interface StackDividerProps extends HTMLChalkProps<"div"> {
}

export const StackDivider: ChalkComponent<"div"> = (props) => {
   const theme = useTheme()
   return <chalk.div
      theme={theme}
      className="chalk-stack__divider"
      {...props}
      __css={{
         ...props["__css"],
         borderWidth: 0,
         alignSelf: "stretch",
         borderColor: "inherit",
         width: "auto",
         height: "auto",
      }}
   />
}

export const StackItem: ChalkComponent<"div"> = (props) => {
   const theme = useTheme()
   return <chalk.div
      theme={theme}
      className="chalk-stack__item"
      {...props}
      __css={{
         display: "inline-block",
         flex: "0 0 auto",
         minWidth: 0,
         ...props["__css"],
      }}
   />
}

export interface StackProps extends HTMLChalkProps<"div">, StackOptions {
}

/**
 * Stacks help you easily create flexible and automatically distributed layouts
 *
 * You can stack elements in the horizontal or vertical direction,
 * and apply a space or/and divider between each element.
 *
 * It uses `display: flex` internally and renders a `div`.
 *
 */
export const Stack = forwardRef<StackProps, "div">((props, ref) => {
   const theme = useTheme()
   
   const {
      isInline,
      direction: directionProp,
      align,
      justify,
      spacing = "0.5rem",
      wrap,
      children,
      divider,
      className,
      shouldWrapChildren,
      ...rest
   } = props
   
   const direction = isInline ? "row" : directionProp ?? "column"
   
   const styles = React.useMemo(() => getStackStyles({ direction, spacing }), [
      direction,
      spacing,
   ])
   
   const dividerStyle = React.useMemo(
      () => getDividerStyles({ spacing, direction }),
      [spacing, direction],
   )
   
   const hasDivider = !!divider
   const shouldUseChildren = !shouldWrapChildren && !hasDivider
   
   const validChildren = getValidChildren(children)
   
   const clones = shouldUseChildren
      ? validChildren
      : validChildren.map((child, index) => {
         const isLast = index + 1 === validChildren.length
         const wrappedChild = <StackItem key={index}>{child}</StackItem>
         const _child = shouldWrapChildren ? wrappedChild : child
         
         if (!hasDivider) return _child
         
         const clonedDivider = React.cloneElement(
            divider as React.ReactElement<any>,
            { __css: dividerStyle },
         )
         
         const _divider = isLast ? null : clonedDivider
         
         return (
            <React.Fragment key={index}>
               {_child}
               {_divider}
            </React.Fragment>
         )
      })
   
   const _className = cx("chalk-stack", className)
   
   return (
      <chalk.div
         ref={ref}
         display="flex"
         alignItems={align}
         justifyContent={justify}
         flexDirection={styles.flexDirection}
         flexWrap={wrap}
         className={_className}
         __css={hasDivider ? {} : { [selector]: styles[selector] }}
         theme={theme}
         {...rest}
      >
         {clones}
      </chalk.div>
   )
})


/**
 * A view that arranges its children in a horizontal line.
 */
export const HStack = forwardRef<StackProps, "div">((props, ref) => {
   const theme = useTheme()
   return (
      // @ts-ignore
      <Stack align="center" {...props} direction="row" ref={ref} theme={theme} />
   )
   
})

/**
 * A view that arranges its children in a vertical line.
 */
export const VStack = forwardRef<StackProps, "div">((props, ref) => {
   return (
      <Stack align="center" {...props} direction="column" ref={ref} />
   )
})
