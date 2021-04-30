import { Spinner } from "../chalk/Components/Spinner"
import { Box }     from "../chalk/Components/Layout/Box"
import { Stack }   from "../chalk/Components/Layout/Stack"
import { Text }    from "../chalk/Components/Typography/Text"
import React       from "react"

export default {
   title: 'Feedback/Spinner',
   components: [Spinner],
   subcomponents: { Spinner },
}

export const Base = () => (
   <Spinner />
)

export const Color = () => (
   <Spinner color="red.500" />
)

export const EmptyAreaColor = () => (
   <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
   />
)
