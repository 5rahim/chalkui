import { mode } from '../Tools'

const parts = ["item", "command", "list", "button", "groupTitle", "divider"]

function baseStyleList(props: Record<string, any>) {
   return {
      bg: mode(`#fff`, `gray.700`)(props),
      boxShadow: mode(`sm`, `dark-lg`)(props),
      color: "inherit",
      minW: "3xs",
      py: "2",
      zIndex: 1,
      borderRadius: "md",
      borderWidth: "1px",
   }
}

function baseStyleItem(props: Record<string, any>) {
   return {
      py: "0.4rem",
      px: "0.8rem",
      fontSize: "md",
      transition: "background 50ms ease-in 0s",
      _focus: {
         bg: mode(`gray.100`, `whiteAlpha.100`)(props),
      },
      _active: {
         bg: mode(`gray.200`, `whiteAlpha.200`)(props),
      },
      _expanded: {
         bg: mode(`gray.100`, `whiteAlpha.100`)(props),
      },
      _disabled: {
         opacity: 0.4,
         cursor: "not-allowed",
      },
   }
}

const baseStyleGroupTitle = (props: Record<string, any>) => ({
   mx: 4,
   my: 2,
   fontWeight: "semibold",
   fontSize: "sm",
   textTransform: "uppercase",
   color: mode("gray.400", "gray.300")(props)
})

const baseStyleCommand = {
   opacity: 0.6,
}

const baseStyleDivider = {
   border: 0,
   borderBottom: "1px solid",
   borderColor: "inherit",
   my: "0.5rem",
   opacity: 0.6,
}

const baseStyle = (props: Record<string, any>) => ({
   list: baseStyleList(props),
   item: baseStyleItem(props),
   groupTitle: baseStyleGroupTitle(props),
   command: baseStyleCommand,
   divider: baseStyleDivider,
})

export default {
   parts,
   baseStyle,
}
