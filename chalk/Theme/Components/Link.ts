import { Dictionary }    from '../../Utils'
import { lighten, mode } from '../Tools'

export default {
   baseStyle: (props: Record<string, any>) => ({
      transition: `all 0.15s ease-out`,
      cursor: "pointer",
      textDecoration: "none",
      outline: "none",
      color: mode("messenger.500", "messenger.300")(props),
      _hover: {
         // textDecoration: "underline",
         color: lighten(mode("messenger.500", "messenger.300")(props), 10)
      },
      _focus: {
         boxShadow: "outline",
      },
   }),
}
