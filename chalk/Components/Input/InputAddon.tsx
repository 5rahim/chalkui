import {
   chalk,
   forwardRef,
   useStyles,
   HTMLChalkProps,
   useTheme,
}                 from "../../System"
import { cx }     from "../../Utils"
import * as React from "react"

type Placement = "left" | "right"

const placements = {
   left: {
      marginRight: "-1px",
      borderRightRadius: 0,
      borderRightColor: "transparent",
   },
   right: {
      marginLeft: "-1px",
      borderLeftRadius: 0,
      borderLeftColor: "transparent",
   },
}

const StyledAddon = chalk("div", {
   baseStyle: {
      flex: "0 0 auto",
      width: "auto",
      display: "flex",
      alignItems: "center",
      whiteSpace: "nowrap",
   },
})

export interface InputAddonProps extends HTMLChalkProps<"div"> {
   placement?: Placement
}

/**
 * InputAddon
 *
 * Element to append or prepend to an input
 */
export const InputAddon = forwardRef<InputAddonProps, "div">((props, ref) => {
   const { placement = "left", ...rest } = props
   const placementStyles = placements[placement] ?? {}
   const styles = useStyles()
   const theme = useTheme()
   
   return (
      <StyledAddon
         theme={theme}
         ref={ref}
         {...rest}
         __css={{
            ...styles.addon,
            ...placementStyles,
         }}
      />
   )
})


/**
 * InputLeftAddon
 *
 * Element to append to the left of an input
 */
export const InputLeftAddon = forwardRef<InputAddonProps, "div">(
   (props, ref) => (
      <InputAddon
         ref={ref}
         placement="left"
         {...props}
         className={cx("chalk-input__left-addon", props.className)}
      />
   ),
)


// This is used in `input-group.tsx`
InputLeftAddon.id = "InputLeftAddon"

/**
 * InputRightAddon
 *
 * Element to append to the right of an input
 */
export const InputRightAddon = forwardRef<InputAddonProps, "div">(
   (props, ref) => (
      <InputAddon
         ref={ref}
         placement="right"
         {...props}
         className={cx("chalk-input__right-addon", props.className)}
      />
   ),
)



// This is used in `input-group.tsx`
InputRightAddon.id = "InputRightAddon"
