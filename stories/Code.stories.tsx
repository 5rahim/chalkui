import { Code }  from "../chalk/Components/Layout/Code"
import { Box }   from "../chalk/Components/Layout/Box"
import { Stack } from "../chalk/Components/Layout/Stack"
import { Text }  from "../chalk/Components/Typography/Text"
import React     from "react"

export default {
   title: 'DataDisplay/Code',
   components: [Code],
   subcomponents: { Code },
}

export const Base = () => (
   <Stack direction="row">
      <Code children="console.log(welcome)" />
      <Code colorScheme="red.500" children="var chalk = 'awesome!'" />
      <Code colorScheme="yellow.500" children="npm install chalk" />
   </Stack>
)
