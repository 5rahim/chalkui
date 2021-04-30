import { IconBox }       from "../chalk/Components/IconBox"
import { Box }           from "../chalk/Components/Layout/Box"
import { HStack, Stack } from "../chalk/Components/Layout/Stack"
import { Text }          from "../chalk/Components/Typography/Text"
import React             from "react"
import { BiCheck }       from 'react-icons/bi'

export default {
   title: 'Components/IconBox',
   components: [IconBox],
   subcomponents: { IconBox },
}

export const Base = () => (
   <>
      <HStack mb={2}>
         <IconBox colorScheme="primary" icon={<BiCheck/>} size="xl" />
         <IconBox colorScheme="primary" icon={<BiCheck/>} size="lg" />
         <IconBox colorScheme="primary" icon={<BiCheck/>} size="md" />
         <IconBox colorScheme="primary" icon={<BiCheck/>} size="sm" />
         <IconBox colorScheme="primary" icon={<BiCheck/>} size="xs" />
      </HStack>
      <HStack mb={2}>
         <IconBox isCircular colorScheme="primary" icon={<BiCheck/>} size="xl" />
         <IconBox isCircular colorScheme="primary" icon={<BiCheck/>} size="lg" />
         <IconBox isCircular colorScheme="primary" icon={<BiCheck/>} size="md" />
         <IconBox isCircular colorScheme="primary" icon={<BiCheck/>} size="sm" />
         <IconBox isCircular colorScheme="primary" icon={<BiCheck/>} size="xs" />
      </HStack>
      <HStack mb={2}>
         <IconBox variant="primary" isCircular colorScheme="primary" icon={<BiCheck/>} size="xl" />
         <IconBox variant="primary" isCircular colorScheme="primary" icon={<BiCheck/>} size="lg" />
         <IconBox variant="primary" isCircular colorScheme="primary" icon={<BiCheck/>} size="md" />
         <IconBox variant="primary" isCircular colorScheme="primary" icon={<BiCheck/>} size="sm" />
         <IconBox variant="primary" isCircular colorScheme="primary" icon={<BiCheck/>} size="xs" />
      </HStack>
      <HStack mb={2}>
         <IconBox variant="primary" isCircular colorScheme="primary" icon={<BiCheck/>} size="xl" />
         <IconBox variant="primary" isCircular colorScheme="primary" icon={<BiCheck/>} size="lg" />
         <IconBox variant="primary" isCircular colorScheme="primary" icon={<BiCheck/>} size="md" />
         <IconBox variant="primary" isCircular colorScheme="primary" icon={<BiCheck/>} size="sm" />
         <IconBox variant="primary" isCircular colorScheme="primary" icon={<BiCheck/>} size="xs" />
      </HStack>
      <HStack mb={2}>
         <IconBox variant="outline" isCircular colorScheme="primary" icon={<BiCheck/>} size="xl" />
         <IconBox variant="outline" isCircular colorScheme="primary" icon={<BiCheck/>} size="lg" />
         <IconBox variant="outline" isCircular colorScheme="primary" icon={<BiCheck/>} size="md" />
         <IconBox variant="outline" isCircular colorScheme="primary" icon={<BiCheck/>} size="sm" />
         <IconBox variant="outline" isCircular colorScheme="primary" icon={<BiCheck/>} size="xs" />
      </HStack>
   </>
)
