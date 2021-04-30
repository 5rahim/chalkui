import {
   darken,
   either,
   getColor,
   lighten,
   mode,
   secondaryBackground,
   secondaryColor,
   secondaryFocusColor,
   transparentize,
} from '../Tools'

const parts = ["root", "menulist", "tab", "menupanels", "menupanel", "indicator", "header"]

type Dict = Record<string, any>


function getCustomColor(c: any, props: any) {
   return mode(
      either(secondaryColor(c, props), "gray.900")(c.includes("gray")),
      either(secondaryColor(c, props), "gray.100")(c.includes("gray")),
   )(props)
}

function baseStyleRoot(props: Dict) {
   const { orientation } = props
   return {
      overflow: "hidden",
      display: orientation === "vertical" ? "flex" : "contents",
   }
}

function baseStyleTab(props: Dict) {
   const { isFullWidth, orientation } = props
   
   return {
      display: "inline-flex",
      color: "gray.400",
      flex: isFullWidth ? 1 : undefined,
      transition: "all 0.2s",
      fontWeight: "semibold",
      cursor: "pointer",
      outline: 0,
      justifyContent: orientation === "vertical" ? "flex-start" : "center",
      _focus: {
         zIndex: 1,
         // boxShadow: "outline",
      },
   }
}

function baseStyleHeader(props: Dict) {
   const { isFullWidth, orientation } = props
   
   return {
      display: "inline-flex",
      color: mode("gray.500", "gray.200")(props),
      fontWeight: "semibold",
      textTransform: "uppercase",
      px: 3,
      py: 2,
      letterSpacing: "1.5px",
   }
}

function baseStyleTablist(props: Dict) {
   const { align = "start", orientation } = props
   
   const alignments: any = {
      end: "flex-end",
      center: "center",
      start: "flex-start",
   }
   
   return {
      width: "100%",
      justifyContent: alignments[align],
      flexDirection: orientation === "vertical" ? "column" : "row",
   }
}

const baseStyleTabpanel = { p: 4 }

const baseStyle = (props: Dict) => ({
   root: baseStyleRoot(props),
   tab: baseStyleTab(props),
   menuheader: baseStyleHeader(props),
   menulist: baseStyleTablist(props),
   menupanel: baseStyleTabpanel,
})

const sizes = {
   sm: {
      tab: {
         py: "0.25rem",
         px: "1rem",
         fontSize: "0.85rem",
      },
   },
   md: {
      tab: {
         fontSize: "1rem",
         py: "0.5rem",
         px: "1rem",
      },
   },
   lg: {
      tab: {
         fontSize: "1rem",
         py: "1rem",
         px: "1.5rem",
      },
   },
}

function variantLine(props: Dict) {
   const { colorScheme: c, orientation } = props
   const isVertical = orientation === "vertical"
   const borderProp = orientation === "vertical" ? "borderLeft" : "borderBottom"
   const marginProp = isVertical ? "ml" : "mb"
   
   return {
      menulist: {
         [borderProp]: "1px solid",
         borderColor: "inherit",
      },
      tab: {
         // color: "gray.400",
         [borderProp]: "2px solid",
         borderColor: "transparent",
         [marginProp]: "-1px",
         _selected: {
            color: getCustomColor(c, props),
            borderColor: "currentColor",
         },
         _hover: {
            borderColor: "currentColor",
         },
         _active: {
            bg: mode("gray.100", "whiteAlpha.100")(props),
         },
         _disabled: {
            opacity: 0.4,
            cursor: "not-allowed",
         },
      },
   }
}

function variantEnclosed(props: Dict) {
   const { colorScheme: c } = props
   return {
      tab: {
         borderTopRadius: "md",
         border: "1px solid",
         borderColor: "transparent",
         mb: "-1px",
         _selected: {
            color: mode(c, lighten(c, 15))(props),
            borderColor: "inherit",
            borderBottomColor: mode(`white`, `gray.800`)(props),
         },
      },
      menulist: {
         mb: "-1px",
         borderBottom: "1px solid",
         borderColor: "inherit",
      },
   }
}

function variantEnclosedColored(props: Dict) {
   const { colorScheme: c } = props
   return {
      tab: {
         border: "1px solid",
         borderColor: "inherit",
         bg: mode(`gray.50`, `whiteAlpha.50`)(props),
         mb: "-1px",
         _notLast: {
            mr: "-1px",
         },
         _selected: {
            bg: mode(`#fff`, "gray.800")(props),
            color: mode(`${c}.600`, `${c}.300`)(props),
            borderColor: "inherit",
            borderTopColor: "currentColor",
            borderBottomColor: "transparent",
         },
      },
      menulist: {
         mb: "-1px",
         borderBottom: "1px solid",
         borderColor: "inherit",
      },
   }
}

function variantPill(props: Dict) {
   const { colorScheme: c, theme } = props
   return {
      tab: {
         borderRadius: "full",
         fontWeight: "semibold",
         _hover: {
            color: mode("gray.800", 'gray.100')(props),
         },
         _selected: {
            color: getCustomColor(c, props),
            bg: secondaryBackground(c, props),
         },
      },
   }
}

function variantSolidPill(props: Dict) {
   const { colorScheme: c } = props
   return {
      tab: {
         borderRadius: "full",
         fontWeight: "semibold",
         _hover: {
            bg: mode(
               transparentize(secondaryBackground(c, props), 0.1),
               lighten('gray.800', 5),
            )(props),
            color: mode("gray.900", 'gray.100')(props),
         },
         _selected: {
            color: mode(`#fff`, "gray.800")(props),
            bg: mode(c, lighten(c, 15))(props),
         },
      },
   }
}

function variantCustom(props: Dict) {
   const { colorScheme: c, hoverBg, hoverColor, selectedColor, selectedBg, defaultColor, borderRadius } = props
   return {
      tab: {
         color: defaultColor || "gray.400",
         borderRadius: borderRadius || 0,
         fontWeight: "semibold",
         _hover: {
            bg: hoverBg || mode(transparentize(secondaryBackground(c, props), 0.1), lighten('gray.800', 5))(props),
            color: hoverColor || mode("gray.900", 'gray.100')(props),
         },
         _selected: {
            color: selectedColor || mode(`#fff`, "gray.800")(props),
            bg: selectedBg || mode(c, lighten(c, 15))(props),
         },
      },
   }
}

function variantRounded(props: Dict) {
   const { colorScheme: c, theme } = props
   return {
      tab: {
         borderRadius: "md",
         fontWeight: "semibold",
         _hover: {
            color: mode("gray.800", 'gray.100')(props),
         },
         _selected: {
            color: getCustomColor(c, props),
            bg: secondaryBackground(c, props),
         },
      },
   }
}

function variantSolidRounded(props: Dict) {
   const { colorScheme: c } = props
   return {
      tab: {
         borderRadius: "md",
         fontWeight: "semibold",
         _hover: {
            bg: mode(
               transparentize(secondaryBackground(c, props), 0.1),
               lighten('gray.800', 5),
            )(props),
            color: mode("gray.900", 'gray.100')(props),
         },
         _selected: {
            color: mode(`#fff`, "gray.800")(props),
            bg: mode(c, lighten(c, 15))(props),
         },
      },
   }
}

function variantRightAccent(props: Dict) {
   const { colorScheme: c, theme } = props
   return {
      tab: {
         borderRadius: 0,
         fontWeight: "semibold",
         borderRight: "2px solid",
         borderColor: secondaryBackground(c, props),
         _hover: {
            color: mode("gray.800", 'gray.100')(props),
         },
         _selected: {
            color: getCustomColor(c, props),
            borderColor: mode(c, lighten(c, 15))(props),
         },
      },
   }
}

function variantBasic(props: Dict) {
   const { colorScheme: c } = props
   return {
      tab: {
         py: "0",
         px: "0",
         fontWeight: "600",
         _hover: {
            color: darken('gray.400', 15),
         },
         _selected: {
            color: getCustomColor(c, props),
         },
      },
   }
}

function variantDivided(props: Dict) {
   const { colorScheme: c } = props
   return {
      menulist: {
         'li, a': {
            pb: props.spacing,
            borderBottom: "1px",
            borderColor: mode(`gray.100`, `gray.700`)(props),
            "&:last-of-type": {
               borderBottomWidth: 0,
            },
         },
      },
      tab: {
         _hover: {
            bg: either(secondaryBackground("gray.500", props), secondaryBackground(c, props))(c.includes("gray")),
            color: mode("gray.900", 'gray.100')(props),
         },
         _selected: {
            color: getCustomColor(c, props),
            bg: secondaryBackground(c, props),
         },
      },
   }
}

function variantGhost(props: Dict) {
   const { colorScheme: c, theme } = props
   return {
      tab: {
         fontWeight: "semibold",
         _hover: {
            // color: mode("gray.800", 'gray.100')(props),
            bg: secondaryBackground(c, props),
         },
         _selected: {
            color: getCustomColor(c, props),
            bg: secondaryBackground(c, props),
         },
      },
   }
}

const variantUnstyled = {}

const variants = {
   line: variantLine,
   enclosed: variantEnclosed,
   "enclosed-colored": variantEnclosedColored,
   pill: variantPill,
   "solid-pill": variantSolidPill,
   "custom": variantCustom,
   rounded: variantRounded,
   "solid-rounded": variantSolidRounded,
   basic: variantBasic,
   unstyled: variantUnstyled,
   "right-accent": variantRightAccent,
   "divided": variantDivided,
   "ghost": variantGhost,
}

const defaultProps = {
   size: "md",
   variant: "line",
   colorScheme: "messenger.500",
   orientation: "horizontal",
}

export default {
   parts,
   baseStyle,
   sizes,
   variants,
   defaultProps,
}
