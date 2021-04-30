import {
   mode,
   secondaryBackground,
   secondaryColor,
} from '../Tools'
import { useToken } from '../../System'


const baseStyle = ({ isCircular, isFullWidth }: any) => ({
   textTransform: "uppercase",
   borderRadius: isFullWidth ? 0 : (isCircular ? "50%" : "md"),
   width: isFullWidth ? '100%' : 'auto',
   fontWeight: "bold",
   alignItems: "center",
   justifyContent: "center",
})

function variantPrimary(props: Record<string, any>) {
   const { colorScheme, theme } = props
   return {
      bg: colorScheme,
      color: 'white',
   }
}

function variantSecondary(props: Record<string, any>) {
   const { colorScheme, theme } = props
   return {
      bg: secondaryBackground(colorScheme, props),
      color: secondaryColor(colorScheme, props),
   }
}

function variantOutline(props: Record<string, any>) {
   const { colorScheme, theme } = props
   const c = useToken("colors", colorScheme)
   return {
      color: mode(colorScheme, colorScheme)(props),
      boxShadow: `inset 0 0 0px 2px ${c}`,
   }
}

const variants = {
   primary: variantPrimary,
   secondary: variantSecondary,
   outline: variantOutline,
}

const defaultProps = {
   variant: "secondary",
   colorScheme: "gray.500",
   size: "md",
}

export default {
   baseStyle,
   variants,
   defaultProps,
   sizes: {
      xl: { fontSize: "4rem", w: 30, h: 30 },
      lg: { fontSize: "3rem", w: 20, h: 20 },
      md: { fontSize: "2rem", w: 10, h: 10 },
      sm: { fontSize: "1.5rem", w: 8, h: 8 },
      xs: { fontSize: "1rem", w: 6, h: 6 },
      full: { fontSize: "2rem" },
   },
}
