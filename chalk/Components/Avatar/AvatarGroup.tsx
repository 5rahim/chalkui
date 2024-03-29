import React                                                                                                from 'react'
import { SystemProps, SystemStyleObject }                                                                   from '../../StyledSystem'
import { chalk, forwardRef, HTMLChalkProps, omitThemingProps, ThemingProps, useMultiStyleConfig, useTheme } from '../../System'
import { cx, filterUndefined }                                                                              from '../../Utils'
import { baseStyle }                                                                                        from './Avatar'
import { getValidChildren }                                                                                 from '../ReactUtils'

interface AvatarGroupOptions {
   /**
    * The children of the avatar group.
    *
    * Ideally should be `Avatar` and `MoreIndicator` components
    */
   children: React.ReactNode
   /**
    * The space between the avatars in the group.
    * @type SystemProps["margin"]
    */
   spacing?: SystemProps["margin"]
   /**
    * The maximum number of visible avatars
    */
   max?: number
}

export interface AvatarGroupProps
   extends AvatarGroupOptions,
      Omit<HTMLChalkProps<"div">, "children">,
      ThemingProps<"Avatar"> {
}

/**
 * AvatarGroup displays a number of avatars grouped together in a stack.
 */
export const AvatarGroup = forwardRef<AvatarGroupProps, "div">((props, ref) => {
   const theme = useTheme()
   const styles = useMultiStyleConfig("Avatar", props)
   
   const {
      children,
      borderColor,
      max,
      spacing = "-0.75rem",
      borderRadius = "full",
      ...rest
   }: any = omitThemingProps(props)
   
   const validChildren = getValidChildren(children as any)
   
   /**
    * get the avatars within the max
    */
   const childrenWithinMax = max ? validChildren.slice(0, max) : validChildren
   
   /**
    * get the remaining avatar count
    */
   const excess = max != null && validChildren.length - max
   
   /**
    * Reversing the children is a great way to avoid using zIndex
    * to overlap the avatars
    */
   const reversedChildren = childrenWithinMax.reverse()
   
   const clones = reversedChildren.map((child, index) => {
      const isFirstAvatar = index === 0
      
      const childProps = {
         mr: isFirstAvatar ? 0 : spacing,
         size: props.size,
         borderColor: child.props.borderColor || borderColor,
         showBorder: true,
      }
      
      return React.cloneElement(child, filterUndefined(childProps))
   })
   
   const groupStyles: SystemStyleObject = {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      flexDirection: "row-reverse",
   }
   
   const excessStyles: SystemStyleObject = {
      borderRadius,
      ml: spacing,
      ...baseStyle,
      ...styles.excessLabel,
   }
   
   return (
      <chalk.div
         ref={ref}
         role="group"
         __css={groupStyles}
         theme={theme}
         {...rest}
         className={cx("chalk-avatar__group", props.className)}
      >
         {excess > 0 && (
            <chalk.span className="chalk-avatar__excess" __css={excessStyles} theme={theme}>
               {`+${excess}`}
            </chalk.span>
         )}
         {clones}
      </chalk.div>
   )
})
