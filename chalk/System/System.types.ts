import {
   ResponsiveValue,
   SystemProps,
   SystemStyleObject,
}                        from "../StyledSystem"
import { Dictionary }    from "../Utils"
import { Interpolation } from "@emotion/react"
import * as React        from "react"
import { ThemeTypings }  from '../StyledSystem/Theming.types'

export interface ThemingProps<ThemeComponent extends string = string> {
   variant?: ThemeComponent extends keyof ThemeTypings["components"]
      ? ThemeTypings["components"][ThemeComponent]["variants"] | (string & {})
      : string
   size?: ThemeComponent extends keyof ThemeTypings["components"]
      ? ThemeTypings["components"][ThemeComponent]["sizes"] | (string & {})
      : string
   colorScheme?: ThemeTypings["colorSchemes"] | (string & {})
   orientation?: "vertical" | "horizontal"
   styleConfig?: Dictionary
}

export interface ChalkProps extends SystemProps {
   /**
    * apply layer styles defined in `theme.layerStyles`
    */
   layerStyle?: string
   /**
    * apply typography styles defined in `theme.textStyles`
    */
   textStyle?: string
   /**
    * Reference styles from any component or key in the theme.
    *
    * @example
    * ```jsx
    * <Box apply="styles.h3">This is a div</Box>
    * ```
    *
    * This will apply styles defined in `theme.styles.h3`
    */
   apply?: string
   /**
    * if `true`, it'll render an ellipsis when the text exceeds the width of the viewport or maxWidth set.
    */
   isTruncated?: boolean
   /**
    * Used to truncate text at a specific number of lines
    */
   noOfLines?: ResponsiveValue<number>
   /**
    * Used for internal css management
    * @private
    */
   __css?: SystemStyleObject
   /**
    * Used to pass theme-aware style props.
    * NB: This is the public API for user-land
    */
   sx?: SystemStyleObject
   /**
    * The emotion's css style object
    */
   css?: Interpolation<{}>
}

export type As<Props = any> = React.ElementType<Props>

/**
 * Extract the props of a React element or component
 */
export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
   as?: As
}

export type OmitCommonProps<Target,
   OmitAdditionalProps extends keyof any = never> = Omit<Target, "transition" | "as" | "color" | OmitAdditionalProps>

export type RightJoinProps<SourceProps extends object = {},
   OverrideProps extends object = {}> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps

export type MergeWithAs<ComponentProps extends object,
   AsProps extends object,
   AdditionalProps extends object = {},
   AsComponent extends As = As> = RightJoinProps<ComponentProps, AdditionalProps> &
   RightJoinProps<AsProps, AdditionalProps> & {
   as?: AsComponent
}

export type ComponentWithAs<Component extends As, Props extends object = {}> = {
   <AsComponent extends As>(
      props: MergeWithAs<React.ComponentProps<Component>,
         React.ComponentProps<AsComponent>,
         Props,
         AsComponent>,
   ): JSX.Element
   
   displayName?: string
   propTypes?: React.WeakValidationMap<any>
   contextTypes?: React.ValidationMap<any>
   defaultProps?: Partial<any>
   id?: string
}

export interface ChalkComponent<T extends As, P = {}>
   extends ComponentWithAs<T, ChalkProps & P> {
}
