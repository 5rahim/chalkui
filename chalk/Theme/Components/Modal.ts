import { mode } from '../Tools'


type Dict = Record<string, any>

function baseStyleDialogContainer(props: Dict) {
   const { isCentered, scrollBehavior } = props
   
   return {
      display: "flex",
      zIndex: "modal",
      justifyContent: "center",
      alignItems: isCentered ? "center" : "flex-start",
      overflow: scrollBehavior === "inside" ? "hidden" : "auto",
   }
}

function baseStyleDialog(props: Dict) {
   const { scrollBehavior } = props
   
   return {
      position: 'relative',
      borderRadius: "md",
      bg: mode("white", "gray.700")(props),
      color: "inherit",
      my: "3.75rem",
      zIndex: "modal",
      maxH: scrollBehavior === "inside" ? "calc(100vh - 7.5rem)" : undefined,
      boxShadow: mode("lg", "dark-lg")(props),
   }
}

function baseStyleBody(props: Dict) {
   const { scrollBehavior } = props
   return {
      px: 6,
      py: 2,
      flex: 1,
      overflow: scrollBehavior === "inside" ? "auto" : undefined,
   }
}

/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */
function getSize(value: string) {
   if (value === "full") {
      return { dialog: { maxW: "100vw", minH: "100vh" } }
   }
   return { dialog: { maxW: value } }
}

export default {
   parts: [
      "overlay",
      "dialogContainer",
      "dialog",
      "header",
      "closeButton",
      "body",
      "footer",
   ],
   baseStyle: (props: Dict) => ({
      overlay: {
         bg: "blackAlpha.600",
         zIndex: "modal",
      },
      dialogContainer: baseStyleDialogContainer(props),
      dialog: baseStyleDialog(props),
      body: baseStyleBody(props),
      header: {
         px: 6,
         py: 4,
         pb: 0,
         fontSize: "xl",
         fontWeight: "semibold",
      },
      closeButton: {
         position: "absolute",
         top: 2,
         right: 2,
         insetEnd: 3,
      },
      footer: {
         px: 6,
         py: 4,
      },
   }),
   sizes: {
      xs: getSize("xs"),
      sm: getSize("sm"),
      md: getSize("md"),
      lg: getSize("lg"),
      xl: getSize("xl"),
      "2xl": getSize("2xl"),
      "3xl": getSize("3xl"),
      "4xl": getSize("4xl"),
      "5xl": getSize("5xl"),
      "6xl": getSize("6xl"),
      full: getSize("full"),
   },
   defaultProps: {
      size: "md",
   },
}
