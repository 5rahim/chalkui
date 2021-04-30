import { Badge }  from "../chalk/Components/Layout/Badge"
import { Box }    from "../chalk/Components/Layout/Box"
import { Stack }  from "../chalk/Components/Layout/Stack"
import { Text }   from "../chalk/Components/Typography/Text"
import React      from "react"
import { Avatar } from '../chalk/Components/Avatar'
import { Flex }   from '../chalk/Components/Layout/Flex'

export default {
   title: 'DataDisplay/Badge',
   components: [Badge],
   subcomponents: { Badge },
}

export const Base = () => (
   <Stack direction="row">
      <Badge>Default</Badge>
      <Badge colorScheme="blue.500">Process</Badge>
      <Badge colorScheme="green.500">Success</Badge>
      <Badge colorScheme="red.500">Removed</Badge>
      <Badge colorScheme="purple.500">New</Badge>
   </Stack>
)


export const VariantPrimary = () => (
   <Stack direction="row">
      <Badge variant="primary">Default</Badge>
      <Badge variant="primary" colorScheme="blue.500">Process</Badge>
      <Badge variant="primary" colorScheme="green.500">Success</Badge>
      <Badge variant="primary" colorScheme="red.500">Removed</Badge>
      <Badge variant="primary" colorScheme="purple.500">New</Badge>
   </Stack>
)


export const VariantOutline = () => (
   <Stack direction="row">
      <Badge variant="outline">Default</Badge>
      <Badge variant="outline" colorScheme="blue.500">Process</Badge>
      <Badge variant="outline" colorScheme="green.500">Success</Badge>
      <Badge variant="outline" colorScheme="red.500">Removed</Badge>
      <Badge variant="outline" colorScheme="purple.500">New</Badge>
   </Stack>
)

export const Composition = () => (
   <Flex>
      <Avatar/>
      <Box ml="3">
         <Text fontWeight="bold">
            Bojack Horseman
            <Badge ml="1" colorScheme="green">
               New
            </Badge>
         </Text>
         <Text fontSize="sm">UI Engineer</Text>
      </Box>
   </Flex>
)

export const Size = () => (
   <Text fontSize="xl" fontWeight="bold">
      Bojack Horseman
      <Badge ml="1" fontSize="0.8em" colorScheme="green.500">
         New
      </Badge>
   </Text>
)
