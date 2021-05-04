import { IconButton } from "../chalk/Components/Button"
import React          from "react"
import { BiSearch }   from 'react-icons/bi'

export default {
   title: 'Forms/IconButton',
   components: [IconButton],
   subcomponents: { IconButton },
}

export const Base = () => (
   <IconButton
      colorScheme="blue.500"
      aria-label="Search database"
      icon={<BiSearch />}
   />
)
