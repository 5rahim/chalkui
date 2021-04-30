import { chalk, css, forwardRef, HTMLChalkProps, StylesProvider, SystemProps, SystemStyleObject, useStyles, useTheme } from '../../System'
import { cx, mapResponsive }                                                                                    from '../../Utils'
import React                                                 from 'react'

export interface WrapProps extends HTMLChalkProps<"div"> {
   /**
    * The space between the each child (even if it wraps)
    * @type SystemProps["margin"]
    */
   spacing?: SystemProps["margin"]
   /**
    * The `justify-content` value (for cross-axis alignment)
    * @type SystemProps["justifyContent"]
    */
   justify?: SystemProps["justifyContent"]
   /**
    * The `align-items` value (for main axis alignment)
    * @type SystemProps["alignItems"]
    */
   align?: SystemProps["alignItems"]
   /**
    * The `flex-direction` value
    * @type SystemProps["flexDirection"]
    */
   direction?: SystemProps["flexDirection"]
   /**
    * If `true`, the children will be wrapped in a `WrapItem`
    */
   shouldWrapChildren?: boolean
}

/**
 * Layout component used to stack elements that differ in length
 * and are liable to wrap.
 *
 * Common use cases:
 * - Buttons that appear together at the end of forms
 * - Lists of tags and chips
 */
export const Wrap = forwardRef<WrapProps, "div">((props, ref) => {
   const {
      spacing = "0.5rem",
      children,
      justify,
      direction,
      align,
      className,
      shouldWrapChildren,
      ...rest
   } = props
   
   const theme = useTheme()
   
   const itemSpacing = mapResponsive(spacing, (value) => {
      const { margin } = css({ margin: value })(theme)
      return `calc(${margin} / 2)`
   })
   
   const groupSpacing = mapResponsive(spacing, (value) => {
      const { margin } = css({ margin: value })(theme)
      return `calc(${margin} / 2 * -1)`
   })
   
   const groupStyles: SystemStyleObject = {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: justify,
      alignItems: align,
      flexDirection: direction,
      listStyleType: "none",
      padding: "0",
      margin: groupSpacing,
   }
   
   const itemStyles: SystemStyleObject = {
      display: "flex",
      alignItems: "flex-start",
      margin: itemSpacing,
   }
   
   const _children = shouldWrapChildren
      ? React.Children.map(children, (child, index) => (
         <WrapItem key={index}>{child}</WrapItem>
      ))
      : children
   
   return (
      <StylesProvider value={{ item: itemStyles }}>
         <chalk.div theme={theme} ref={ref} className={cx("chalk-wrap", className)} {...rest}>
            <chalk.ul theme={theme} className="chalk-wrap__list" __css={groupStyles}>
               {_children}
            </chalk.ul>
         </chalk.div>
      </StylesProvider>
   )
})

export interface WrapItemProps extends HTMLChalkProps<"li"> {}

export const WrapItem = forwardRef<WrapItemProps, "li">((props, ref) => {
   const theme = useTheme()
   const { className, ...rest } = props
   const styles = useStyles()
   return (
      <chalk.li
         ref={ref}
         __css={styles.item}
         className={cx("chalk-wrap__listitem", className)}
         theme={theme}
         {...rest}
      />
   )
})
