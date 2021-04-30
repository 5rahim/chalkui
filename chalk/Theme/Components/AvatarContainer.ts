import {
   mode,
   randomColor,
   secondaryBackground,
   secondaryDarken,
} from '../Tools'
import themeSizes from '../Foundations/Sizes'

function getSize(size: string) {
   const themeSize = themeSizes[size]
   return {
      width: size,
      height: size,
      fontSize: `calc(${themeSize ?? size} / 2.5)`,
   }
}

const baseContainerStyle = (props: Record<string, any>) => {
   return {
      borderColor: mode("white", "gray.800")(props),
      verticalAlign: "top",
   }
}

const primaryVariant = (props: Record<string, any>) => {
   const { name, colorScheme } = props
   const color = name ? randomColor({ string: name }) : "gray.400"
   return {
      color: "#fff",
      backgroundColor: colorScheme || color,
   }
}

const secondaryVariant = (props: Record<string, any>) => {
   const { colorScheme } = props
   return {
      color: secondaryDarken(colorScheme),
      backgroundColor: secondaryBackground(colorScheme, props),
   }
}

const outlineVariant = (props: Record<string, any>) => {
   const { colorScheme } = props
   return {
      color: colorScheme,
      border: "1px solid",
      borderColor: colorScheme,
      backgroundColor: "transparent",
   }
}

export default {
   baseStyle: (props: Record<string, any>) => baseContainerStyle(props),
   variants: {
      primary: primaryVariant,
      secondary: secondaryVariant,
      outline: outlineVariant,
   },
   sizes: {
      "2xs": getSize("4"),
      xs: getSize("6"),
      sm: getSize("8"),
      md: getSize("12"),
      lg: getSize("16"),
      xl: getSize("24"),
      "2xl": getSize("32"),
      full: getSize("100%"),
   },
   defaultProps: {
      variant: "primary",
      size: "md",
   },
}
