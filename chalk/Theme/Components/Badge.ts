import {
   mode,
   secondaryBackground,
   secondaryBackgroundActive,
   secondaryBackgroundHover,
   secondaryColor,
} from '../Tools'
import { useToken } from '../../System'


const baseStyle = (props: Record<string, any>) => ({
   px: 2,
   py: '.2rem',
   textTransform: "uppercase",
   fontSize: "xs",
   borderRadius: props.pill ? 'full' : "md",
   fontWeight: "bold",
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
   
   if (colorScheme.includes('gray')) {
      
      return {
         bg: secondaryBackground('gray.500', props),
         color: secondaryColor('gray.500', props),
      }
   }
   
   if (colorScheme.includes('100') || colorScheme.includes('200') || colorScheme.includes('300')) {
      const c = !colorScheme.includes('gray') ? colorScheme.split('.')[0] + '.300' : 'gray.400'
      
      return {
         bg: secondaryBackground(c, props),
         color: secondaryColor(c, props),
      }
   }
   
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
}

export default {
   baseStyle,
   variants,
   defaultProps,
}
