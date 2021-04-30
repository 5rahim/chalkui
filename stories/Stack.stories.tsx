import { Box }                                 from '../chalk/Components/Layout/Box'
import React                                   from 'react'
import { HStack, Stack, StackDivider, VStack } from '../chalk/Components/Layout/Stack'
import { Heading }                             from '../chalk/Components/Typography/Heading'
import { Text }                                from '../chalk/Components/Typography/Text'
import { SimpleGrid }                          from '../chalk/Components/Layout/SimpleGrid'

export default {
   title: 'Layout/Stack',
   component: Stack,
}

export const Base = (args: any) => (
   <HStack spacing={"10px"} color={'white'}>
      <Box w="40px" h="40px" bg="blue.500">
         1
      </Box>
      <Box w="40px" h="40px" bg="purple.500">
         2
      </Box>
      <Box w="40px" h="40px" bg="pink.500">
         3
      </Box>
   </HStack>
)


export const Responsive = (args: any) => (
   <Stack direction={["column", "row"]} spacing={"10px"} color={'white'}>
      <Box w="80px" h="40px" bg="blue.500">
         1
      </Box>
      <Box w="80px" h="40px" bg="purple.500">
         2
      </Box>
      <Box w="80px" h="40px" bg="pink.500">
         3
      </Box>
   </Stack>
)


export const withDivider = (args: any) => (
   <VStack
      color={'white'}
      divider={<StackDivider borderColor="gray.200" />}
      spacing={"10px"}
      align="stretch"
   >
      <Box h="40px" bg="blue.500">
         1
      </Box>
      <Box h="40px" bg="purple.500">
         2
      </Box>
      <Box h="40px" bg="pink.500">
         3
      </Box>
   </VStack>
)


export const Example = (args: any) => (
   <HStack spacing={"20px"}>
      <Box shadow={'sm'} p={5}>
         <Heading size={'md'}>This is a box</Heading>
         <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias amet aperiam atque aut cum debitis et, excepturi expedita, facere id
            inventore ipsa nisi perspiciatis provident quis repudiandae tempore veritatis voluptates.
         </Text>
      </Box>
      <Box shadow={'sm'} p={5}>
         <Heading size={'md'}>This is a box</Heading>
         <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias amet aperiam atque aut cum debitis et, excepturi expedita, facere id
            inventore ipsa nisi perspiciatis provident quis repudiandae tempore veritatis voluptates.
         </Text>
      </Box>
   </HStack>
)
