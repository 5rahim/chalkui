import * as React   from "react"
import {
   TabsProvider,
   useTab,
   useTabIndicator,
   useTabList,
   UseTabListProps,
   UseTabOptions,
   useTabPanel,
   useTabPanels,
   useTabs,
   UseTabsProps,
}                    from "./UseTabs"
import {
   chalk, forwardRef, HTMLChalkProps, omitThemingProps,
   StylesProvider, SystemStyleObject, ThemingProps, useMultiStyleConfig, useStyles, useTheme,
}                    from '../../System'
import { cx, omit }  from '../../Utils'
import { GridProps } from '../Layout/Grid'

interface MenusOptions {
   /**
    * If `true`, menus will stretch to width of the menulist.
    */
   isFullWidth?: boolean
   /**
    * The alignment of the menus
    */
   align?: "start" | "end" | "center",
   /**
    * The gap between items
    */
   spacing?: GridProps["gridGap"]
   /**
    *
    */
   orientation?: "vertical" | "horizontal"
   /**
    *
    */
   defaultColor?: string
   hoverColor?: string
   hoverBg?: string
   selectedColor?: string
   selectedBg?: string
}

export interface MenusProps
   extends UseTabsProps,
      ThemingProps<"Tabs">,
      Omit<HTMLChalkProps<"div">, "onChange">,
      MenusOptions {
   children: React.ReactNode
}

/**
 * Tabs
 *
 * Provides context and logic for all menus components. It doesn't render
 * any DOM node.
 */
export const Menu = forwardRef<MenusProps, "div">((props, ref) => {
   const theme = useTheme()
   const styles = useMultiStyleConfig("Menu", props)
   const { children, className, spacing, orientation,
      defaultColor, hoverColor, hoverBg, selectedColor, selectedBg, ...rest } = omitThemingProps(props)
   
   const spacingStyle: any = spacing ? { gridGap: spacing } : {}
   
   const { htmlProps, ...ctx } = useTabs(rest)
   const context = React.useMemo(() => ctx, [ctx])
   
   const rootProps = omit(htmlProps as any, ["isFullWidth"])
   
   return (
      <TabsProvider value={context}>
         <StylesProvider value={{ ...styles, spacingStyle }}>
            <chalk.div
               theme={theme}
               className={cx("chalk-menus", className)}
               ref={ref}
               {...rootProps}
               __css={styles.root}
            >
               {children}
            </chalk.div>
         </StylesProvider>
      </TabsProvider>
   )
})


export interface TabProps extends UseTabOptions, HTMLChalkProps<"a"> {
}

/**
 * MenuItem button used to activate a specific menu panel. It renders a `button`,
 * and is responsible for automatic and manual selection modes.
 */
export const MenuItem = forwardRef<TabProps, "a">((props, ref) => {
   const theme = useTheme()
   const styles = useStyles()
   const tabProps = useTab({ ...props, ref })
   
   const itemStyles: SystemStyleObject = {
      outline: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...styles.tab,
   }
   
   return (
      <chalk.a
         theme={theme}
         {...tabProps}
         className={cx("chalk-menus__tab", props.className)}
         __css={itemStyles}
      />
   )
})


export interface MenuHeaderProps extends HTMLChalkProps<"h1"> {
}

/**
 * MenuItem button used to activate a specific menu panel. It renders a `button`,
 * and is responsible for automatic and manual selection modes.
 */
export const MenuHeader = forwardRef<MenuHeaderProps, "h1">((props, ref) => {
   const theme = useTheme()
   const styles = useStyles()
   
   const tabStyles: SystemStyleObject = {
      ...styles.menuheader,
   }
   
   return (
      <chalk.h1
         theme={theme}
         className={cx("chalk-menus__tab", props.className)}
         __css={tabStyles}
         {...props}
      />
   )
})


export interface MenuListProps
   extends UseTabListProps,
      Omit<HTMLChalkProps<"div">, "onKeyDown" | "ref"> {
}

/**
 * TabList is used to manage a list of menu buttons. It renders a `div` by default,
 * and is responsible the keyboard interaction between menus.
 */
export const MenuList = forwardRef<MenuListProps, "div">((props, ref) => {
   const theme = useTheme()
   const menulistProps = useTabList({ ...props, ref })
   
   const styles = useStyles()
   
   const menulistStyles: SystemStyleObject = {
      display: "flex",
      ...styles.spacingStyle,
      ...styles.menulist,
   }
   
   return (
      <chalk.div
         theme={theme}
         {...menulistProps}
         className={cx("chalk-menus__menulist", props.className)}
         __css={menulistStyles}
      />
   )
})


export interface MenuPanelProps extends HTMLChalkProps<"div"> {
}

/**
 * TabPanel
 * Used to render the content for a specific menu.
 */
export const MenuPanel = forwardRef<MenuPanelProps, "div">((props, ref) => {
   const theme = useTheme()
   const panelProps = useTabPanel({ ...props, ref })
   const styles = useStyles()
   
   return (
      <chalk.div
         theme={theme}
         outline="0"
         {...panelProps}
         className={cx("chalk-menus__menu-panel", props.className)}
         __css={styles.menupanel}
      />
   )
})


export interface MenuPanelsProps extends HTMLChalkProps<"div"> {
}

/**
 * TabPanel
 *
 * Used to manage the rendering of multiple menu panels. It uses
 * `cloneElement` to hide/show menu panels.
 *
 * It renders a `div` by default.
 */
export const MenuPanels = forwardRef<MenuPanelsProps, "div">((props, ref) => {
   const theme = useTheme()
   const panelsProps = useTabPanels(props)
   const styles = useStyles()
   
   return (
      <chalk.div
         theme={theme}
         {...panelsProps}
         width="100%"
         ref={ref}
         className={cx("chalk-menus__menu-panels", props.className)}
         __css={styles.menupanels}
      />
   )
})


export interface MenuIndicatorProps extends HTMLChalkProps<"div"> {
}

/**
 * TabIndicator
 *
 * Used to render an active menu indicator that animates between
 * selected menus.
 */
export const MenuIndicator = forwardRef<MenuIndicatorProps, "div">(
   (props, ref) => {
      const theme = useTheme()
      const indicatorStyle = useTabIndicator()
      const style = {
         ...props.style,
         ...indicatorStyle,
      }
      
      const styles = useStyles()
      
      return (
         <chalk.div
            theme={theme}
            ref={ref}
            {...props}
            className={cx("chalk-menus__menu-indicator", props.className)}
            style={style}
            __css={styles.indicator}
         />
      )
   },
)
