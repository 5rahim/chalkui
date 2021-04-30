import * as React           from "react"
import {
   chalk,
   forwardRef,
   HTMLChalkProps,
   omitThemingProps,
   StylesProvider,
   SystemProps,
   SystemStyleObject,
   ThemingProps,
   useMultiStyleConfig,
   useStyles,
   useTheme,
} from '../../System'
import { cx }               from '../../Utils'
import { getValidChildren } from '../ReactUtils'

export interface BreadcrumbSeparatorProps extends HTMLChalkProps<"div"> {
   /**
    * @type SystemProps["mx"]
    */
   spacing?: SystemProps["mx"]
}

/**
 * React component that separates each breadcrumb link
 */
export const BreadcrumbSeparator = forwardRef<BreadcrumbSeparatorProps, "span">(
   (props, ref) => {
      const { spacing, ...rest } = props
      const theme = useTheme()
      
      const styles = useStyles()
      const separatorStyles: SystemStyleObject = {
         mx: spacing,
         ...styles.separator,
      }
      
      return (
         <chalk.span
            theme={theme}
            ref={ref}
            role="presentation"
            {...rest}
            __css={separatorStyles}
         />
      )
   },
)


export interface BreadcrumbLinkProps extends HTMLChalkProps<"a"> {
   isCurrentPage?: boolean
}

/**
 * Breadcrumb link.
 *
 * It renders a `span` when it matches the current link. Otherwise,
 * it renders an anchor tag.
 */
export const BreadcrumbLink = forwardRef<BreadcrumbLinkProps, "a">(
   (props, ref) => {
      const { isCurrentPage, as, className, ...rest } = props
      const styles = useStyles()
      const theme = useTheme()
      
      const sharedProps = {
         ref,
         as,
         className: cx("chalk-breadcrumb__link", className),
         ...rest,
      }
      
      if (isCurrentPage) {
         return (
            <chalk.span theme={theme} aria-current="page" __css={styles.link} {...sharedProps} />
         )
      }
      
      return <chalk.a theme={theme} __css={styles.link} {...sharedProps} />
   },
)


interface BreadcrumbItemOptions extends BreadcrumbOptions {
   isCurrentPage?: boolean
   isLastChild?: boolean
}

export interface BreadcrumbItemProps
   extends BreadcrumbItemOptions,
      HTMLChalkProps<"li"> {
}

/**
 * BreadcrumbItem is used to group a breadcrumb link.
 * It renders a `li` element to denote it belongs to an order list of links.
 *
 * @see Docs https://chalk-ui.com/docs/components/breadcrumbs
 */
export const BreadcrumbItem = forwardRef<BreadcrumbItemProps, "li">(
   (props, ref) => {
      const {
         isCurrentPage,
         separator,
         isLastChild,
         spacing,
         children,
         className,
         ...rest
      } = props
      const theme = useTheme()
      
      const validChildren = getValidChildren(children)
      
      const clones = validChildren.map((child) => {
         if (child.type === BreadcrumbLink) {
            return React.cloneElement(child, {
               isCurrentPage,
            })
         }
         
         if (child.type === BreadcrumbSeparator) {
            return React.cloneElement(child, {
               spacing,
               children: child.props.children || separator,
            })
         }
         
         return child
      })
      
      const styles = useStyles()
      const itemStyles: SystemStyleObject = {
         display: "inline-flex",
         alignItems: "center",
         ...styles.item,
      }
      
      const _className = cx("chalk-breadcrumb__list-item", className)
      
      return (
         <chalk.li theme={theme} ref={ref} className={_className} {...rest} __css={itemStyles}>
            {clones}
            {!isLastChild && (
               <BreadcrumbSeparator spacing={spacing}>
                  {separator}
               </BreadcrumbSeparator>
            )}
         </chalk.li>
      )
   },
)


export interface BreadcrumbOptions {
   /**
    * The visual separator between each breadcrumb item
    * @type string | React.ReactElement
    */
   separator?: string | React.ReactElement
   /**
    * The left and right margin applied to the separator
    * @type SystemProps["mx"]
    */
   spacing?: SystemProps["mx"]
}

export interface BreadcrumbProps
   extends HTMLChalkProps<"nav">,
      BreadcrumbOptions,
      ThemingProps<"Breadcrumb"> {
}

/**
 * Breadcrumb is used to render a breadcrumb navigation landmark.
 * It renders a `nav` element with `aria-label` set to `Breadcrumb`
 */
export const Breadcrumb = forwardRef<BreadcrumbProps, "nav">((props, ref) => {
   const styles = useMultiStyleConfig("Breadcrumb", props)
   const ownProps = omitThemingProps(props)
   const theme = useTheme()
   
   const {
      children,
      spacing = "0.5rem",
      separator = "/",
      className,
      ...rest
   }: any = ownProps
   
   const validChildren = getValidChildren(children)
   const count = validChildren.length
   
   const clones = validChildren.map((child, index) =>
      React.cloneElement(child, {
         separator,
         spacing,
         isLastChild: count === index + 1,
      }),
   )
   
   const _className = cx("chalk-breadcrumb", className)
   
   return (
      <chalk.nav
         theme={theme}
         ref={ref}
         aria-label="breadcrumb"
         className={_className}
         __css={styles.container}
         {...rest}
      >
         <StylesProvider value={styles}>
            <chalk.ol className="chalk-breadcrumb__list">{clones}</chalk.ol>
         </StylesProvider>
      </chalk.nav>
   )
})
