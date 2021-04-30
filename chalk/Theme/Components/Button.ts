import {
   darken,
   lighten,
   mode,
   secondaryBackground,
   secondaryBackgroundActive,
   secondaryBackgroundHover,
   secondaryColor,
} from '../Tools'
import { Dictionary } from '../../Utils'

function variantSecondary(props: Dictionary) {
   const { colorScheme } = props
   
   if (colorScheme.includes('gray')) {
      
      return {
         bg: secondaryBackground('gray.500', props),
         // color: mode('gray.500', `whiteAlpha.900`)(props),
         color: secondaryColor('gray.500', props),
         _hover: {
            bg: secondaryBackgroundHover('gray.500', props),
         },
         _active: {
            bg: secondaryBackgroundActive('gray.500', props),
         },
      }
   }
   
   if (colorScheme.includes('100') || colorScheme.includes('200') || colorScheme.includes('300')) {
      const c = !colorScheme.includes('gray') ? colorScheme.split('.')[0] + '.300' : 'gray.400'
      
      return {
         bg: secondaryBackground(c, props),
         color: secondaryColor(c, props),
         _hover: {
            bg: secondaryBackgroundHover(c, props),
         },
         _active: {
            bg: secondaryBackgroundActive(c, props),
         },
      }
   }
   
   return {
      // color: mode(colorScheme, "gray.100")(props),
      color: secondaryColor(colorScheme, props),
      bg: secondaryBackground(colorScheme, props),
      _hover: {
         bg: secondaryBackgroundHover(colorScheme, props),
      },
      _active: {
         bg: secondaryBackgroundActive(colorScheme, props),
      },
   }
}

function variantOutline(props: Dictionary) {
   const { colorScheme } = props
   const isLighter = colorScheme.includes('100') || colorScheme.includes('200') || colorScheme.includes('300')
   const isDarkerGray = (colorScheme.includes('800') || colorScheme.includes('900')) && colorScheme.includes('gray')
   
   const basicStyle = {
      border: "1px solid",
   }
   
   if (isDarkerGray) {
      return {
         ...basicStyle,
         borderColor: 'gray.700',
         color: 'gray.700',
         _hover: {
            color: "white",
            borderColor: 'gray.700',
            bg: 'gray.700',
         },
         _active: {
            color: "white",
            borderColor: 'transparent',
            bg: darken('gray.700', 10),
         },
      }
   }
   
   
   if (isLighter) {
      const c = !colorScheme.includes('gray') ? colorScheme.split('.')[0] + '.300' : 'gray.400'
      
      return {
         ...basicStyle,
         borderColor: c,
         // color: mode(c, `whiteAlpha.900`)(props),
         color: secondaryColor(c, props),
         _hover: {
            borderColor: c,
            color: "white",
            bg: c,
         },
         _active: {
            color: "white",
            borderColor: 'transparent',
            bg: darken(c, 10),
         },
      }
   }
   
   
   return {
      ...basicStyle,
      borderColor: colorScheme,
      color: secondaryColor(colorScheme, props),
      _hover: {
         borderColor: colorScheme,
         color: "white",
         bg: colorScheme,
      },
      _active: {
         color: "white",
         borderColor: 'transparent',
         bg: darken(colorScheme, 10),
      },
      // ...variantSecondary(props),
   }
}

function variantGhost(props: Dictionary) {
   const { colorScheme } = props
   const isLighter = colorScheme.includes('100') || colorScheme.includes('200') || colorScheme.includes('300')
   const isDarkerGray = (colorScheme.includes('800') || colorScheme.includes('900')) && colorScheme.includes('gray')
   
   if (isDarkerGray) {
      return {
         borderColor: 'gray.700',
         color: 'gray.700',
         _hover: {
            color: "white",
            borderColor: 'gray.700',
            bg: 'gray.700',
         },
         _active: {
            borderColor: 'transparent',
            bg: darken('gray.700', 10),
         },
      }
   }
   
   
   if (isLighter) {
      const c = !colorScheme.includes('gray') ? colorScheme.split('.')[0] + '.300' : 'gray.400'
      
      return {
         borderColor: c,
         // color: mode(c, `whiteAlpha.900`)(props),
         color: secondaryColor(c, props),
         _hover: {
            borderColor: c,
            color: "white",
            bg: c,
         },
         _active: {
            borderColor: 'transparent',
            bg: darken(c, 10),
         },
      }
   }
   
   
   return {
      borderColor: colorScheme,
      color: secondaryColor(colorScheme, props),
      _hover: {
         borderColor: colorScheme,
         color: "white",
         bg: colorScheme,
      },
      _active: {
         borderColor: 'transparent',
         bg: darken(colorScheme, 10),
      },
      // ...variantSecondary(props),
   }
}

type AccessibleColor = {
   bg?: string
   color?: string
   hoverBg?: string
   activeBg?: string
}

/** Accessible color overrides for less accessible colors. */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
   yellow: {
      bg: "yellow.400",
      color: "black",
      hoverBg: "yellow.500",
      activeBg: "yellow.600",
   },
   cyan: {
      bg: "cyan.400",
      color: "black",
      hoverBg: "cyan.500",
      activeBg: "cyan.600",
   },
}

function variantPrimary(props: Dictionary) {
   const { colorScheme } = props
   
   const isDarkerGray = (colorScheme.includes('800') || colorScheme.includes('900')) && colorScheme.includes('gray')
   const isLighter = colorScheme.includes('100') || colorScheme.includes('200')
   
   if (isDarkerGray) {
      
      return {
         color: "white",
         bg: mode(colorScheme, 'gray.700')(props),
         _hover: {
            bg: darken('gray.700', 5),
            _disabled: {
               bg: 'gray.700',
            },
         },
         _active: { bg: darken('gray.700', 10) },
      }
   }
   
   
   if (isLighter) {
      
      return {
         color: darken(colorScheme, 70),
         bg: colorScheme,
         _hover: {
            bg: darken(colorScheme, 5),
            _disabled: {
               bg: colorScheme,
            },
         },
         _active: { bg: darken(colorScheme, 10) },
      }
   }
   
   const {
      bg = colorScheme,
      hoverBg = darken(colorScheme, 10),
      activeBg = darken(colorScheme, 20),
   } = accessibleColorMap[colorScheme] || {}
   
   return {
      bg: mode(bg, colorScheme)(props),
      color: "white",
      _hover: {
         bg: hoverBg,
         _disabled: {
            bg: mode(bg, colorScheme)(props),
         },
      },
      _active: { bg: activeBg },
   }
}

function variantLink(props: Dictionary) {
   const { colorScheme } = props
   
   const colors = () => {
      if (colorScheme.includes('100') || colorScheme.includes('200')) {
         return {
            color: secondaryColor(colorScheme, props),
         }
      }
      if ((colorScheme.includes('800') || colorScheme.includes('900')) && colorScheme.includes('gray')) {
         return {
            color: 'gray.700',
         }
      }
      return { color: secondaryColor(colorScheme, props) }
   }
   
   return {
      padding: 0,
      height: "auto",
      lineHeight: "normal",
      verticalAlign: "baseline",
      ...colors(),
      _hover: {
         textDecoration: "underline",
         _disabled: {
            textDecoration: "none",
         },
      },
      _active: {
         color: lighten(colorScheme, 10),
      },
   }
}

const variantUnstyled = {
   bg: "none",
   color: "inherit",
   display: "inline",
   lineHeight: "inherit",
   m: 0,
   p: 0,
}

const variants = {
   secondary: variantSecondary,
   outline: variantOutline,
   primary: variantPrimary,
   link: variantLink,
   ghost: variantGhost,
   unstyled: variantUnstyled,
}

export default {
   baseStyle: {
      lineHeight: "1.2",
      borderRadius: "md",
      fontWeight: "semibold",
      _focus: {
         // boxShadow: "outline",
      },
      _disabled: {
         opacity: 0.4,
         cursor: "not-allowed",
         boxShadow: "none",
      },
      _hover: {
         _disabled: {
            bg: "initial",
         },
      },
   },
   variants,
   sizes: {
      lg: {
         h: 12,
         minW: 12,
         fontSize: "lg",
         px: 6,
      },
      md: {
         h: 10,
         minW: 10,
         fontSize: "md",
         px: 5,
      },
      sm: {
         h: 8,
         minW: 8,
         fontSize: "sm",
         px: 3,
      },
      xs: {
         h: 6,
         minW: 6,
         fontSize: "xs",
         px: 2,
      },
   },
   defaultProps: {
      variant: "primary",
      size: "md",
      colorScheme: "gray.100",
   },
}
