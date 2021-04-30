import { SystemProps, SystemStyleObject } from '../../StyledSystem'
import React                              from 'react'
import {
   chalk, ChalkComponent, forwardRef, HTMLChalkProps,
   omitThemingProps, StylesProvider, ThemingProps,
   useMultiStyleConfig, useStyleConfig, useStyles, useTheme,
} from '../../System'
import { cx }                             from '../../Utils'
import { ImageProps, useImage }           from '../Image'

interface AvatarOptions {
   /**
    * The name of the person in the avatar.
    *
    * - if `src` has loaded, the name will be used as the `alt` attribute of the `img`
    * - If `src` is not loaded, the name will be used to create the initials
    */
   name?: string
   /**
    * If `true`, the `Avatar` will show a border around it.
    *
    * Best for a group of avatars
    */
   showBorder?: boolean
   /**
    * The badge at the bottom right corner of the avatar.
    */
   children?: React.ReactNode
   /**
    * The image url of the `Avatar`
    */
   src?: string
   /**
    * List of sources to use for different screen resolutions
    */
   srcSet?: string
   /**
    * Defines loading strategy
    */
   loading?: "eager" | "lazy"
   /**
    * The border color of the avatar
    * @type SystemProps["borderColor"]
    */
   borderColor?: SystemProps["borderColor"]
   /**
    * Function called when image failed to load
    */
   onError?: () => void
   /**
    * The default avatar used as fallback when `name`, and `src`
    * is not specified.
    * @type React.ReactElement
    */
   icon?: React.ReactElement
   /**
    * Function to get the initials to display
    */
   getInitials?: (name: string) => string
}

export interface AvatarBadgeProps extends HTMLChalkProps<"div"> {
}

/**
 * AvatarBadge used to show extra badge to the top-right
 * or bottom-right corner of an avatar.
 */
export const AvatarBadge = forwardRef<AvatarBadgeProps, "div">((props, ref) => {
   const styles = useStyles()
   const theme = useTheme()
   
   const badgeStyles: SystemStyleObject = {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      right: "0",
      bottom: "0",
      ...styles.badge,
   }
   
   return (
      <chalk.div
         ref={ref}
         theme={theme}
         {...props}
         className={cx("chalk-avatar__badge", props.className)}
         __css={badgeStyles}
      />
   )
})


function initials(name: string) {
   const [firstName, lastName] = name.split(" ")
   return firstName && lastName
      ? `${firstName.charAt(0)}${lastName.charAt(0)}`
      : firstName.charAt(0)
}

interface AvatarNameProps
   extends HTMLChalkProps<"div">,
      Pick<AvatarOptions, "name" | "getInitials"> {
}

/**
 * The avatar name container
 */
const AvatarName: React.FC<AvatarNameProps> = (props) => {
   const theme = useTheme()
   const { name, getInitials, ...rest } = props
   const styles = useStyles()
   
   return (
      <chalk.div theme={theme} aria-label={name} {...rest} __css={styles.label}>
         {name ? getInitials?.(name) : null}
      </chalk.div>
   )
}

/**
 * Fallback avatar react component.
 * This should be a generic svg used to represent an avatar
 */
const DefaultIcon: ChalkComponent<"svg"> = (props) => (
   <chalk.svg
      viewBox="0 0 128 128"
      color="#fff"
      width="100%"
      height="100%"
      {...props}
   >
      <path
         fill="currentColor"
         d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"
      />
      <path
         fill="currentColor"
         d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"
      />
   </chalk.svg>
)


export interface AvatarProps
   extends Omit<HTMLChalkProps<"span">, "onError">,
      AvatarOptions,
      ThemingProps<"Avatar"> {
}

export const baseStyle: SystemStyleObject = {
   display: "inline-flex",
   alignItems: "center",
   justifyContent: "center",
   textAlign: "center",
   textTransform: "uppercase",
   fontWeight: "medium",
   position: "relative",
}

/**
 * Avatar component that renders an user avatar with
 * support for fallback avatar and name-only avatars
 */
export const Avatar = forwardRef<AvatarProps, "span">((props, ref) => {
   const theme = useTheme()
   const styles = useMultiStyleConfig("Avatar", props)
   const containerStyles = useStyleConfig("AvatarContainer", props)
   
   const {
      src,
      name,
      showBorder,
      borderRadius = "full",
      onError,
      getInitials = initials,
      icon = <DefaultIcon />,
      loading,
      children,
      borderColor,
      ...rest
   }: any = omitThemingProps(props)
   
   const avatarStyles: SystemStyleObject = {
      flexShrink: 0,
      borderRadius,
      borderWidth: showBorder ? "2px" : undefined,
      ...baseStyle,
      ...containerStyles,
   }
   
   return (
      <chalk.span
         ref={ref}
         theme={theme}
         {...rest}
         className={cx("chalk-avatar", props.className)}
         __css={avatarStyles}
      >
         <StylesProvider value={styles}>
            <AvatarImage
               src={src}
               loading={loading}
               onError={onError}
               getInitials={getInitials}
               name={name}
               borderRadius={borderRadius}
               icon={icon}
            />
            {children}
         </StylesProvider>
      </chalk.span>
   )
})


interface AvatarImageProps
   extends ImageProps,
      Pick<AvatarProps, "getInitials" | "borderRadius" | "icon" | "name"> {
}

const AvatarImage: React.FC<AvatarImageProps> = (props: AvatarImageProps) => {
   const theme = useTheme()
   const {
      src,
      onError,
      getInitials,
      name,
      borderRadius,
      loading,
      icon = <DefaultIcon />,
   } = props
   /**
    * use the image hook to only show the image when it has loaded
    */
   const status = useImage({ src, onError })
   
   const hasLoaded = status === "loaded"
   
   /**
    * Fallback avatar applies under 2 conditions:
    * - If `src` was passed and the image has not loaded or failed to load
    * - If `src` wasn't passed
    *
    * In this case, we'll show either the name avatar or default avatar
    */
   const showFallback = !src || !hasLoaded
   
   if (showFallback) {
      return name ? (
         !src ? (
            <AvatarName
               className="chalk-avatar__initials"
               getInitials={getInitials}
               name={name}
            />
         ) : (
            icon
         )
      ) : (
         React.cloneElement(icon, { role: "img" })
      )
   }
   
   /**
    * If `src` was passed and the image has loaded, we'll show it
    */
   return (
      <chalk.img
         src={src}
         alt={name}
         className="chalk-avatar__img"
         loading={loading}
         theme={theme}
         __css={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            // @ts-ignore
            borderRadius,
         }}
      />
   )
}
