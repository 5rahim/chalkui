import { mode } from '../Tools'
import Badge    from './Badge'


export default {
   parts: ["label", "number", "icon", "helpText"],
   baseStyle: (props: Record<string, any>) => ({
      label: {
         fontWeight: "semibold",
         color: mode("gray.500", "white")(props),
      },
      helpText: {
         opacity: 0.8,
         marginBottom: 2,
         marginTop: '-.2rem'
      },
      number: {
         verticalAlign: "baseline",
         fontWeight: "semibold",
         color: mode('gray.800', 'white')(props)
      },
      icon: {
         mr: 1,
         // w: "14px",
         // h: "14px",
         // verticalAlign: "middle",
      },
      indicator: {
         display: 'inline-flex',
         ...Badge.baseStyle,
         px: 1,
         py: 0,
         ml: 2,
         borderRadius: 'md',
         fontSize: '1rem',
         alignItems: 'center'
         
      }
   }),
   sizes: {
      md: {
         label: { fontSize: "lg" },
         helpText: { fontSize: "md" },
         number: { fontSize: "2rem" },
      },
   },
   defaultProps:  {
      size: "md",
   },
}
