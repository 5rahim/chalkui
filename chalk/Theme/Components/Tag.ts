import Badge from "./Badge"

const parts = ["container", "label", "closeButton"]

type Dict = Record<string, any>

const baseStyleContainer = (props: Dict) => ({
   fontWeight: "medium",
   lineHeight: 1.2,
   borderRadius: props.pill ? 'full' : 'md',
   outline: 0,
   _focus: {
      boxShadow: "outline",
   },
})

const baseStyleLabel = {
   lineHeight: 1.2,
}

const baseStyleCloseButton = {
   fontSize: "18px",
   w: "1.25rem",
   h: "1.25rem",
   borderRadius: "full",
   ml: "0.375rem",
   mr: "-1",
   opacity: 0.5,
   _disabled: {
      opacity: 0.4,
   },
   _focus: {
      boxShadow: "outline",
      bg: "rgba(0, 0, 0, 0.14)",
   },
   _hover: { opacity: 0.8 },
   _active: { opacity: 1 },
}

const baseStyle = (props: Dict) => ({
   container: baseStyleContainer(props),
   label: baseStyleLabel,
   closeButton: baseStyleCloseButton,
})

const sizes = {
   sm: {
      container: {
         minH: "1.25rem",
         minW: "1.25rem",
         fontSize: "xs",
         px: 2,
      },
      closeButton: {
         mr: "-2px",
         ml: "0.35rem",
      },
   },
   md: {
      container: {
         minH: "1.5rem",
         minW: "1.5rem",
         fontSize: "sm",
         px: 2,
      },
   },
   lg: {
      container: {
         minH: 8,
         minW: 8,
         fontSize: "md",
         borderRadius: "md",
         px: 3,
      },
   },
}

const variants = {
   secondary: (props: Dict) => ({
      container: Badge.variants.secondary(props),
   }),
   primary: (props: Dict) => ({
      container: Badge.variants.primary(props),
   }),
   outline: (props: Dict) => ({
      container: Badge.variants.outline(props),
   }),
}

const defaultProps = {
   size: "md",
   variant: "secondary",
   colorScheme: "gray.500",
}

export default {
   parts,
   variants,
   baseStyle,
   sizes,
   defaultProps,
}
