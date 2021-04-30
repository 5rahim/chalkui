import { mode }   from '../Tools'
import * as React from 'react'
import { List }   from '../../Components/Layout/List'

const parts = ["container", "item", "icon"]

const baseStyleContainer = (props: Record<string, any>) => ({
   position: "relative",
   display: "inline-flex",
   width: props.isFullWidth ? '100%' : 'auto',
   // flexDirection: "column"
})

const baseStyleItem = {
   // display: "block"
}

const baseStyleIcon = {
   marginRight: "0.3rem",
   display: "inline",
   verticalAlign: "text-bottom",
}

const baseStyleDivision = (props: Record<string, any>) => ({
   'li, a': {
      pb: props.spacing,
      borderBottom: "1px",
      borderColor: mode(`gray.200`, `gray.700`)(props),
      "&:last-of-type": {
         borderBottomWidth: 0,
      },
   },
})

const baseStyleCell = (props: Record<string, any>) => ({
   borderColor: mode(`gray.200`, `gray.700`)(props),
   ...baseStyleDivision(props),
   '.chalk-list__link-item': {
      _hover: {
         backgroundColor: mode('gray.100', 'gray.700')(props)
      }
   }
})

const baseStyle = (props: Record<string, any>) => ({
   container: baseStyleContainer(props),
   item: baseStyleItem,
   icon: baseStyleIcon,
   division: baseStyleDivision(props),
   cell: baseStyleCell(props),
})

export default {
   parts,
   baseStyle,
}
