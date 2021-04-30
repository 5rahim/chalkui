import * as React from "react"
import {
   chalk, forwardRef, HTMLChalkProps,
   omitThemingProps, ThemingProps, useStyleConfig, useTheme,
} from '../../System'
import { cx }     from '../../Utils'

export interface CodeProps
   extends HTMLChalkProps<"code">,
      ThemingProps<"Code"> {
}

/**
 * React component to render inline code snippets.
 */
export const Code = forwardRef<CodeProps, "code">((props, ref) => {
   const theme = useTheme()
   const styles = useStyleConfig("Code", props)
   const { className, ...rest } = omitThemingProps(props)
   
   return (
      <chalk.code
         ref={ref}
         className={cx("chalk-code", props.className)}
         theme={theme}
         {...rest}
         __css={{
            display: "inline-block",
            ...styles,
         }}
      />
   )
})
