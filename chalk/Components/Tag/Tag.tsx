import * as React    from "react"
import {
   chalk,
   forwardRef, HTMLChalkProps, omitThemingProps, StylesProvider,
   SystemStyleObject, ThemingProps, useMultiStyleConfig, useStyles, useTheme,
} from '../../System'
import { Icon, IconProps } from '../Icon'


interface TagOptions {
   pill?: boolean
}

export interface TagProps
   extends HTMLChalkProps<"span">,
      TagOptions,
      ThemingProps<"Tag"> {
}

/**
 * The tag component is used to label or categorize UI elements.
 * To style the tag globally, change the styles in `theme.components.Tag`
 */
export const Tag = forwardRef<TagProps, "span">((props, ref) => {
   const theme = useTheme()
   const styles = useMultiStyleConfig("Tag", props)
   const { pill = false, ...ownProps } = omitThemingProps(props)
   
   const containerStyles: SystemStyleObject = {
      display: "inline-flex",
      verticalAlign: "top",
      alignItems: "center",
      maxWidth: "100%",
      ...styles.container,
   }
   
   return (
      <StylesProvider value={styles}>
         <chalk.span ref={ref} {...ownProps} __css={containerStyles} theme={theme} />
      </StylesProvider>
   )
})



export interface TagLabelProps extends HTMLChalkProps<"span"> {
}

export const TagLabel = forwardRef<TagLabelProps, "span">((props, ref) => {
   const theme = useTheme()
   const styles = useStyles()
   return <chalk.span ref={ref} isTruncated {...props} __css={styles.label} theme={theme} />
})



export const TagLeftIcon = forwardRef<IconProps, "svg">((props, ref) => (
   <Icon ref={ref} verticalAlign="top" marginRight="0.3rem" {...props} />
))



export const TagRightIcon = forwardRef<IconProps, "svg">((props, ref) => (
   <Icon ref={ref} verticalAlign="top" marginLeft="0.3rem" {...props} />
))



const TagCloseIcon: React.FC<IconProps> = (props) => (
   <Icon verticalAlign="inherit" viewBox="0 0 512 512" {...props}>
      <path
         fill="currentColor"
         d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"
      />
   </Icon>
)


export interface TagCloseButtonProps
   extends Omit<HTMLChalkProps<"button">, "disabled"> {
   isDisabled?: boolean
}

/**
 * TagCloseButton is used to close "remove" the tag
 */
export const TagCloseButton: React.FC<TagCloseButtonProps> = (props) => {
   const theme = useTheme()
   const { isDisabled, children, ...rest } = props
   
   const styles = useStyles()
   
   const btnStyles: SystemStyleObject = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      outline: "0",
      transition: "all 0.2s",
      ...styles.closeButton,
   }
   
   return (
      <chalk.button
         theme={theme}
         {...rest}
         type="button"
         aria-label="close"
         disabled={isDisabled}
         __css={btnStyles}
      >
         {children || <TagCloseIcon />}
      </chalk.button>
   )
}
