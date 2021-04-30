import { Progress } from "../chalk/Components/Progress"
import { Box }      from "../chalk/Components/Layout/Box"
import { Stack }    from "../chalk/Components/Layout/Stack"
import { Text }     from "../chalk/Components/Typography/Text"
import React        from "react"

export default {
   title: 'Feedback/Progress',
   components: [Progress],
   subcomponents: { Progress },
}

export const Base = () => (
   <Progress value={80} />
)


export const withColor = () => (
   <Progress colorScheme={'orange.500'} value={80} />
)

export const Sizes = () => (
   <Stack spacing={5}>
      <Progress colorScheme="green.500" size="sm" value={20} />
      <Progress colorScheme="green.500" size="md" value={20} />
      <Progress colorScheme="green.500" size="lg" value={20} />
      <Progress colorScheme="green.500" height="32px" value={20} />
   </Stack>
)


export const Indeterminate = () => (
   <Progress isIndeterminate />
)
