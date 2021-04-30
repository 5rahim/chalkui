import { customTheme } from '../chalk/React'
import { mode }        from '../chalk/Theme/Tools'

const theme = customTheme({
   styles: {
      global: (props: any) => ({
         body: {
            fontFamily: "Inter, sans-serif",
            color: mode("gray.600", "whiteAlpha.800")(props),
         },
      }),
   },
})

export default theme
