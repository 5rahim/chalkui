import { mode, transparentize } from '../Tools'
import themeSizes               from '../../Theme/Foundations/Sizes'


function getSize(size: string) {
   const themeSize = themeSizes[size]
   return {
      container: {
         width: size,
         height: size,
         fontSize: `calc(${themeSize ?? size} / 2.5)`,
      },
      excessLabel: {
         width: size,
         height: size,
      },
      label: {
         fontWeight: "bold",
         fontSize: `calc(${themeSize ?? size} / 3)`,
         lineHeight: size !== "100%" ? themeSize ?? size : undefined,
      },
   }
}


export default {
   parts: ["container", "excessLabel", "badge", "label"],
   baseStyle: (props: Record<string, any>) => ({
      badge: {
         transform: "translate(25%, 25%)",
         borderRadius: "full",
         border: "0.2em solid",
         width: '1.25rem',
         height: '1.25rem',
         borderColor: props.borderColor || mode("white", "gray.800")(props),
      },
      excessLabel: {
         fontWeight: "bold",
         color: mode(transparentize("#000000", 0.7), "#fff")(props),
         bg: mode("gray.200", "whiteAlpha.400")(props),
      },
   }),
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
