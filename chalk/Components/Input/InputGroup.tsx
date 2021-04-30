import {
   chalk,
   forwardRef,
   omitThemingProps,
   StylesProvider,
   ThemingProps,
   useMultiStyleConfig,
   HTMLChalkProps,
   useTheme,
} from "../../System"
import {
   cx,
}                           from "../../Utils"
import { getValidChildren } from "../ReactUtils"
import * as React           from "react"

export interface InputGroupProps
   extends HTMLChalkProps<"div">,
      ThemingProps<"Input"> {
}

export const InputGroup = forwardRef<InputGroupProps, "div">((props, ref) => {
   const styles = useMultiStyleConfig("Input", props)
   const { children, className, ...rest }: any = omitThemingProps(props)
   const theme = useTheme()
   const _className = cx("chalk-input__group", className)
   const groupStyles: InputGroupProps = {}
   
   const validChildren = getValidChildren(children)
   
   const input: any = styles.field
   
   validChildren.forEach((child: any) => {
      if (!styles) return
      
      if (input && child.type.id === "InputLeftElement") {
         groupStyles.paddingLeft = input.height ?? input.h
      }
      
      if (input && child.type.id === "InputRightElement") {
         groupStyles.paddingRight = input.height ?? input.h
      }
      
      if (child.type.id === "InputRightAddon") {
         groupStyles.borderRightRadius = 0
      }
      
      if (child.type.id === "InputLeftAddon") {
         groupStyles.borderLeftRadius = 0
      }
   })
   
   const clones = validChildren.map((child: any) => {
      /**
       * Make it possible to override the size and variant from `Input`
       */
      const theming = {
         size: child.props?.size || props.size,
         variant: child.props?.variant || props.variant,
      }
      
      return child.type.id !== "Input"
         ? React.cloneElement(child, theming)
         : React.cloneElement(
            child,
            Object.assign(theming, groupStyles, child.props),
         )
   })
   
   return (
      <chalk.div
         theme={theme}
         className={_className}
         ref={ref}
         __css={{
            width: "100%",
            display: "flex",
            position: "relative",
         }}
         {...rest}
      >
         <StylesProvider value={styles}>{clones}</StylesProvider>
      </chalk.div>
   )
})
