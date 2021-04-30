import * as React           from "react"
import { SystemProps }      from '../../StyledSystem'
import {
   chalk, forwardRef, HTMLChalkProps, omitThemingProps,
   StylesProvider, ThemingProps, useMultiStyleConfig, useStyles, useTheme,
}                           from '../../System'
import { cx }               from '../../Utils'
import { Icon, IconProps }  from "../Icon"
import { Link, LinkProps }  from './Link'
import { mode }             from '../../Theme/Tools'
import { Box }              from './Box'
import { getValidChildren } from '../ReactUtils'

interface ListOptions {
   /**
    * Short hand prop for `listStyleType`
    * @type SystemProps["listStyleType"]
    */
   styleType?: SystemProps["listStyleType"]
   /**
    * Short hand prop for `listStylePosition`
    * @type SystemProps["listStylePosition"]
    */
   stylePosition?: SystemProps["listStylePosition"]
   /**
    * The space between each list item
    * @type SystemProps["margin"]
    */
   spacing?: SystemProps["margin"]
   
   isHorizontal?: boolean
   
   isDivided?: boolean
   
   isFullWidth?: boolean
   
   isCelled?: boolean
}

export interface ListProps
   extends HTMLChalkProps<"ul">,
      ThemingProps<"List">,
      ListOptions {
}

/**
 * List is used to display list items, it renders a `<ul>` by default.
 */
export const List = forwardRef<ListProps, "ul">((props, ref) => {
   const theme = useTheme()
   const styles = useMultiStyleConfig("List", props)
   const {
      children,
      styleType = "none",
      stylePosition,
      spacing,
      isHorizontal = false,
      isDivided = false,
      isFullWidth = false,
      isCelled = false,
      ...rest
   }: any = omitThemingProps(props)
   
   const validChildren = getValidChildren(children)
   
   const selector = "& > *:not(style) ~ *:not(style)"
   
   // const spacingStyle = spacing ? { [selector]: { gridGap: spacing } } : {}
   const spacingStyle = spacing ? { gridGap: spacing } : {}
   const flow = { flexDirection: isHorizontal ? "row" : "column" }
   const divisionStyle = isDivided ? styles.division : {}
   const cellStyle = isCelled ? styles.cell : {}
   
   return (
      <StylesProvider value={styles}>
         <chalk.ul
            ref={ref}
            listStyleType={styleType}
            listStylePosition={stylePosition}
            /**
             * We added this role to fix the Safari accessibility issue with list-style-type: none
             * @see https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html
             */
            role="list"
            theme={theme}
            __css={{
               ...styles.container,
               ...spacingStyle,
               ...flow,
               ...divisionStyle,
               ...cellStyle,
            }}
            {...rest}
         >
            {validChildren}
         </chalk.ul>
      </StylesProvider>
   )
})


export const OrderedList = forwardRef<ListProps, "ol">((props, ref) => {
   const { as, ...rest } = props
   return (
      <List ref={ref} as="ol" styleType="decimal" marginLeft="1em" {...rest} />
   )
})


export const UnorderedList = forwardRef<ListProps, "ul">((props, ref) => {
   const { as, ...rest } = props
   return (
      <List ref={ref} as="ul" styleType="initial" marginLeft="1em" {...rest} />
   )
})


export const DividedList = forwardRef<ListProps, "ul">((props, ref) => {
   const { as, ...rest } = props
   return (
      <List ref={ref} isDivided {...rest} />
   )
})


export const CelledList = forwardRef<ListProps, "ul">((props, ref) => {
   const { as, ...rest } = props
   return (
      <List ref={ref} isCelled borderWidth="1px" borderRadius="md" boxShadow="sm" {...rest} />
   )
})


export interface ListItemProps extends HTMLChalkProps<"li"> {
}

/**
 * ListItem
 *
 * Used to render a list item
 */
export const ListItem = forwardRef<ListItemProps, "li">((props, ref) => {
   const theme = useTheme()
   const styles = useStyles()
   
   return <chalk.li ref={ref} {...props} __css={styles.item} theme={theme} />
})

export interface ListLinkItemProps extends HTMLChalkProps<"a"> {
}

/**
 */
export const ListLinkItem = forwardRef<LinkProps, "a">((props, ref) => {
   const theme = useTheme()
   const styles = useStyles()
   
   return <chalk.a
      ref={ref}
      className={cx("chalk-list__link-item", props.className)}
      {...props}
      theme={theme}
      __css={{
         cursor: "pointer",
         ...styles.item,
      }}
   />
})


/**
 * ListIcon
 * Used to render an icon beside the list item text
 */
export const ListIcon = forwardRef<IconProps, "svg">((props, ref) => {
   const styles = useStyles()
   
   return <Icon ref={ref} role="presentation" {...props} __css={styles.icon} />
})
