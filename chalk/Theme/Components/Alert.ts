import { Dictionary } from '../../Utils'
import {
   darken,
   getColor,
   lighten,
   mode,
   secondaryBackground,
   transparentize,
}                     from '../Tools'

const parts = ["container", "title", "description", "icon"]

const baseStyle = {
   container: {
      px: 3,
      py: 2,
      borderRadius: 'lg',
   },
   largeContainer: {
      px: 3,
      py: 5,
      borderRadius: 'lg',
   },
   title: {
      display: 'block',
      fontWeight: "bold",
      lineHeight: 6,
      mr: 2,
   },
   largeTitle: {
      display: 'block',
      fontWeight: "bold",
      lineHeight: 1,
   },
   description: {
      lineHeight: 6,
   },
   icon: {
      flexShrink: 0,
      mr: 3,
      w: 8,
      h: '100%',
   },
   largeIcon: {
      flexShrink: 0,
      mr: 3,
      w: 10,
      h: '100%',
   },
}

function getBg(props: Dictionary) {
   const { theme, colorScheme: c } = props
   const lightBg = getColor(theme, `${c}.100`, c)
   const darkBg = transparentize(`${c}.200`, 0.16)(theme)
   return mode(lightBg, darkBg)(props)
}

function variantSecondary(props: Dictionary) {
   const { colorScheme } = props
   const containerStyles = {
      bg: secondaryBackground(colorScheme, props),
      color: mode(colorScheme, 'white')(props),
   }
   return {
      container: containerStyles,
      largeContainer: containerStyles,
      icon: { color: mode(`${colorScheme}.500`, `${colorScheme}.200`)(props) },
   }
}

function variantLeftAccent(props: Dictionary) {
   const { colorScheme } = props
   const containerStyles = {
      color: mode(colorScheme, 'white')(props),
      // borderRadius: 0,
      borderColor: darken(colorScheme, 10),
      pl: 3,
      borderLeftWidth: "4px",
      bg: secondaryBackground(colorScheme, props),
   }
   return {
      container: containerStyles,
      largeContainer: containerStyles,
   }
}

function variantTopAccent(props: Dictionary) {
   const { colorScheme } = props
   const containerStyles = {
      pt: 2,
      color: mode(colorScheme, 'white')(props),
      // borderRadius: 0,
      borderColor: darken(colorScheme, 10),
      borderTopWidth: "4px",
      bg: secondaryBackground(colorScheme, props),
   }
   return {
      container: containerStyles,
      largeContainer: containerStyles,
   }
}

function variantPrimary(props: Dictionary) {
   const { colorScheme } = props
   const containerStyles = {
      bg: colorScheme,
      color: 'white',
   }
   return {
      container: containerStyles,
      largeContainer: containerStyles,
   }
}

function variantGhost(props: Dictionary) {
   const { colorScheme } = props
   const containerStyles = {
      color: colorScheme,
      bg: 'transparent',
   }
   return {
      container: containerStyles,
      largeContainer: containerStyles,
   }
}

const variants = {
   primary: variantPrimary,
   secondary: variantSecondary,
   "left-accent": variantLeftAccent,
   "top-accent": variantTopAccent,
   ghost: variantGhost,
}

const defaultProps = {
   variant: "primary",
   colorScheme: "blue.500",
}

export default {
   parts,
   baseStyle,
   variants,
   defaultProps,
}
