import { mode } from '../Tools'

export default {
   parts: ["container", "title", "description", "icon", "action"],
   baseStyle: (props: Record<string, any>) => ({
      container: {
         width: 'auto',
         boxShadow: 'sm',
         borderRadius: 'md',
         borderWidth: mode('1px', 0)(props),
         bg: mode('white', 'gray.700')(props),
         color: mode('gray.500', 'white')(props)
      },
      content: {
         py: 3,
         px: 4
      },
      title: {
         fontWeight: 'semibold',
         color: mode('gray.800', 'white')(props)
      },
      description: {
      
      },
      icon: {
         fontSize: '1.5rem',
         p: 4,
         mr: -4
      },
      action: {
      
      },
      closeButton: {
         mr: 3,
         mt: 3
      }
   })
}
