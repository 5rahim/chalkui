import { Select } from "../chalk/Components/Select"
import { Box }    from "../chalk/Components/Layout/Box"
import { Stack }  from "../chalk/Components/Layout/Stack"
import { Text }   from "../chalk/Components/Typography/Text"
import React      from "react"

export default {
   title: 'Forms/Select',
   components: [Select],
   subcomponents: { Select },
}

export const Base = () => (
   <Select placeholder="Select option">
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
   </Select>
)

export const Variants = () => (
   <Stack spacing={3}>
      <Select variant="outline" placeholder="Outline" />
      <Select variant="filled" placeholder="Filled" />
      <Select variant="flushed" placeholder="Flushed" />
      <Select variant="unstyled" placeholder="Unstyled" />
   </Stack>
)
