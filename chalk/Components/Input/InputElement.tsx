import {
   chalk,
   forwardRef,
   SystemStyleObject,
   useStyles,
   HTMLChalkProps,
   useTheme,
} from "../../System"
import { cx }     from "../../Utils"
import * as React from "react"

export interface InputElementProps extends HTMLChalkProps<"div"> {
   placement?: "left" | "right"
}

const StyledElement = chalk("div", {
   baseStyle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: "0",
      zIndex: 2,
   },
})

const InputElement = forwardRef<InputElementProps, "div">((props, ref) => {
   const { placement = "left", ...rest } = props
   const theme = useTheme()
   const styles = useStyles()
   const input: any = styles.field
   
   const attr = placement === "left" ? "left" : "right"
   
   const elementStyles: SystemStyleObject = {
      [attr]: "0",
      width: input?.height ?? input?.h,
      height: input?.height ?? input?.h,
      fontSize: input?.fontSize,
   }
   
   return <StyledElement theme={theme} ref={ref} __css={elementStyles} {...rest} />
})

// This is used in `input-group.tsx`
InputElement.id = "InputElement"



export const InputLeftElement = forwardRef<InputElementProps, "div">(
   (props, ref) => {
      const { className, ...rest } = props
      const _className = cx("chalk-input__left-element", className)
      
      return (
         <InputElement
            ref={ref}
            placement="left"
            className={_className}
            {...rest}
         />
      )
   },
)

// This is used in `input-group.tsx`
InputLeftElement.id = "InputLeftElement"



export const InputRightElement = forwardRef<InputElementProps, "div">(
   (props, ref) => {
      const { className, ...rest } = props
      const _className = cx("chalk-input__right-element", className)
      
      return (
         <InputElement
            ref={ref}
            placement="right"
            className={_className}
            {...rest}
         />
      )
   },
)

// This is used in `input-group.tsx`
InputRightElement.id = "InputRightElement"
