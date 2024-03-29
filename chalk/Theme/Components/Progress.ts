import {
   generateStripe,
   getColor,
   mode,
} from '../Tools'

type Dict = Record<string, any>

const parts = ["track", "filledTrack", "panel"]

function filledStyle(props: Dict) {
   const { colorScheme, theme: t, isIndeterminate, hasStripe } = props
   
   const stripeStyle = mode(
      generateStripe(),
      generateStripe("1rem", "rgba(0,0,0,0.1)"),
   )(props)
   
   const gradient = `linear-gradient(
    to right,
    transparent 0%,
    ${getColor(t, colorScheme)} 50%,
    transparent 100%
  )`
   
   const addStripe = !isIndeterminate && hasStripe
   
   return {
      ...(addStripe && stripeStyle),
      ...(isIndeterminate ? { bgImage: gradient } : { bgColor: colorScheme }),
   }
}

const baseStyleLabel = {
   lineHeight: "1",
   fontSize: "0.25em",
   fontWeight: "bold",
   color: "white",
}

function baseStyleTrack(props: Dict) {
   return {
      borderRadius: 'xl',
      bg: mode(`gray.100`, `whiteAlpha.300`)(props),
   }
}

function baseStyleFilledTrack(props: Dict) {
   return {
      transition: "all 0.3s",
      ...filledStyle(props),
   }
}

const baseStyle = (props: Dict) => ({
   label: baseStyleLabel,
   filledTrack: baseStyleFilledTrack(props),
   track: baseStyleTrack(props),
})

const sizes = {
   xs: {
      track: { h: "0.25rem" },
   },
   sm: {
      track: { h: "0.5rem" },
   },
   md: {
      track: { h: "0.75rem" },
   },
   lg: {
      track: { h: "1rem" },
   },
}

const defaultProps = {
   size: "md",
   colorScheme: "blue.500",
}

export default {
   parts,
   sizes,
   baseStyle,
   defaultProps,
}
