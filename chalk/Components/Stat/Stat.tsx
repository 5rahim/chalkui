import {
   chalk,
   forwardRef,
   HTMLChalkProps,
   omitThemingProps,
   StylesProvider,
   ThemingProps,
   useColorModeValue,
   useMultiStyleConfig,
   useStyles,
   useTheme,
   useToken,
}                              from "../../System"
import * as React              from "react"
import { cx }                  from '../../Utils'
import {
   Icon,
   IconProps,
}                              from '../Icon'
import { VisuallyHidden }      from '../VisuallyHidden'
import {
   IoIosArrowDown,
   IoIosArrowUp,
}                              from 'react-icons/io'
import { secondaryBackground } from '../../Theme/Tools'

export interface StatLabelProps extends HTMLChalkProps<"dt"> {
}

export const StatLabel = forwardRef<StatLabelProps, "dt">((props, ref) => {
   const theme = useTheme()
   const styles = useStyles()
   return (
      <chalk.p
         ref={ref}
         {...props}
         className={cx("chalk-stat__label", props.className)}
         theme={theme}
         __css={styles.label}
      />
   )
})


export interface StatHelpTextProps extends HTMLChalkProps<"p"> {
}

export const StatHelpText = forwardRef<StatHelpTextProps, "p">((props, ref) => {
   const theme = useTheme()
   const styles = useStyles()
   
   return (
      <chalk.p
         ref={ref}
         {...props}
         className={cx("chalk-stat__help-text", props.className)}
         __css={styles.helpText}
         theme={theme}
      />
   )
})


export interface StatNumberProps extends HTMLChalkProps<"dd"> {
}

export const StatNumber = forwardRef<StatNumberProps, "dd">((props, ref) => {
   const theme = useTheme()
   const styles = useStyles()
   return (
      <chalk.dd
         ref={ref}
         {...props}
         className={cx("chalk-stat__number", props.className)}
         __css={{
            ...styles.number,
            fontFeatureSettings: "pnum",
            fontVariantNumeric: "proportional-nums",
         }}
         theme={theme}
      />
   )
})

export interface StatIndicatorProps extends HTMLChalkProps<"dd"> {
   type?: "increase" | "decrease"
}

export const StatIndicator = forwardRef<StatIndicatorProps, "dd">((props, ref) => {
   const { type = "increase" }: any = props
   const theme = useTheme()
   const styles = useStyles()
   const [green, red] = useToken("colors", ["green.500", "red.500"])
   const g = useToken("colors", useColorModeValue('green.500', 'green.300'))
   const r = useToken("colors", useColorModeValue('red.500', 'red.300'))
   const color = type === 'increase' ? g : r
   
   return (
      <StylesProvider value={{ color, type }}>
         <chalk.dd
            ref={ref}
            {...props}
            className={cx("chalk-stat__indicator", props.className)}
            __css={{
               ...styles.indicator,
               bg: secondaryBackground(color, props),
               color: color,
            }}
            theme={theme}
         />
      </StylesProvider>
   )
})


export const StatDownArrow: React.FC<IconProps> = (props) => (
   <Icon color="red.400" {...props}>
      <path
         fill="currentColor"
         d="M21,5H3C2.621,5,2.275,5.214,2.105,5.553C1.937,5.892,1.973,6.297,2.2,6.6l9,12 c0.188,0.252,0.485,0.4,0.8,0.4s0.611-0.148,0.8-0.4l9-12c0.228-0.303,0.264-0.708,0.095-1.047C21.725,5.214,21.379,5,21,5z"
      />
   </Icon>
)


export const StatUpArrow: React.FC<IconProps> = (props) => (
   <Icon color="green.400" {...props}>
      <path
         fill="currentColor"
         d="M12.8,5.4c-0.377-0.504-1.223-0.504-1.6,0l-9,12c-0.228,0.303-0.264,0.708-0.095,1.047 C2.275,18.786,2.621,19,3,19h18c0.379,0,0.725-0.214,0.895-0.553c0.169-0.339,0.133-0.744-0.095-1.047L12.8,5.4z"
      />
   </Icon>
)


export interface StatArrowProps extends IconProps {
   type?: "increase" | "decrease"
}

export const StatArrow: React.FC<StatArrowProps> = (props) => {
   const { type, "aria-label": ariaLabel, ...rest } = props
   const styles: any = useStyles()
   
   const cType = styles.type || type
   
   const IconComponent = cType === "increase" ? IoIosArrowUp : IoIosArrowDown
   const defaultAriaLabel = cType === "increase" ? "increased by" : "decreased by"
   const label = ariaLabel || defaultAriaLabel
   const [green, red] = useToken("colors", ["green.500", "red.500"])
   
   return (
      <>
         <VisuallyHidden>{label}</VisuallyHidden>
         <chalk.span __css={{
            fontSize: '1.3rem',
            color: styles.color || (type === "increase" ? green : red),
            ...styles.icon,
         }}>
            <IconComponent aria-hidden style={{ display: 'inline-block' }} />
         </chalk.span>
      </>
   )
}


export interface StatProps
   extends HTMLChalkProps<"div">,
      ThemingProps<"Stat"> {
}

export const Stat = forwardRef<StatProps, "div">((props, ref) => {
   const theme = useTheme()
   const styles = useMultiStyleConfig("Stat", props)
   const { className, children, ...rest } = omitThemingProps(props)
   
   return (
      <StylesProvider value={styles}>
         <chalk.div
            className={cx("chalk-stat", className)}
            ref={ref}
            position="relative"
            flex="1 1 0%"
            theme={theme}
            {...rest}
         >
            <dl>{children as any}</dl>
         </chalk.div>
      </StylesProvider>
   )
})


interface StatGroupProps extends HTMLChalkProps<"div"> {
}

export const StatGroup = forwardRef<StatGroupProps, "div">((props, ref) => {
   const theme = useTheme()
   return (
      <chalk.div
         {...props}
         ref={ref}
         role="group"
         className={cx("chalk-stat__group", props.className)}
         __css={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignItems: "flex-start",
         }}
         theme={theme}
      />
   )
})

