import { Kbd }   from "../chalk/Components/Layout/Kbd"
import { Box }   from "../chalk/Components/Layout/Box"
import { Stack } from "../chalk/Components/Layout/Stack"
import { Text }  from "../chalk/Components/Typography/Text"
import React     from "react"

export default {
   title: 'DataDisplay/Kbd',
   components: [Kbd],
   subcomponents: { Kbd },
}

export const Base = () => (
   <span><Kbd>shift</Kbd> + <Kbd>H</Kbd></span>
)
