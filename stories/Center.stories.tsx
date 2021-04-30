import { Center }        from "../chalk/Components/Layout/Center"
import { HStack, Stack } from "../chalk/Components/Layout/Stack"
import { Box, Circle }   from '../chalk/Components/Layout/Box'
import React             from "react"

export default {
   title: 'Layout/Center',
   components: [Center],
   subcomponents: { Center },
}

export const Base = () => (
   <HStack>
      <Center w="40px" h="40px" bg="blue.500" color="white">
         <Box as="span" fontSize="lg">
            1
         </Box>
      </Center>
      <Circle size="40px" bg="purple.500" color="white" fontSize="lg">
         2
      </Circle>
   </HStack>
)
