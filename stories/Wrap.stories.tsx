import { HStack } from '../chalk/Components/Layout/Stack'
import { Box }           from '../chalk/Components/Layout/Box'
import React              from 'react'
import { Wrap, WrapItem } from '../chalk/Components/Layout/Wrap'

export default {
   title: 'Layout/Wrap',
   component: Wrap,
}

export const Base = (args: any) => (
   <Box width={"600px"} color={"white"}>
      <Wrap>
         <WrapItem>
            <Box w="180px" h="80px" bg="blue.500">
               Box 1
            </Box>
         </WrapItem>
         <WrapItem>
            <Box w="180px" h="80px" bg="purple.500">
               Box 2
            </Box>
         </WrapItem>
         <WrapItem>
            <Box w="180px" h="80px" bg="pink.500">
               Box 3
            </Box>
         </WrapItem>
         <WrapItem>
            <Box w="180px" h="80px" bg="cyan.500">
               Box 4
            </Box>
         </WrapItem>
      </Wrap>
   </Box>
)


export const withAlignment = (args: any) => (
   <Box width={"600px"} color={"white"}>
      <Wrap spacing="30px" align="center" justify={'center'}>
         <WrapItem>
            <Box w="180px" h="80px" bg="blue.500">
               Box 1
            </Box>
         </WrapItem>
         <WrapItem>
            <Box w="180px" h="40px" bg="purple.500">
               Box 2
            </Box>
         </WrapItem>
         <WrapItem>
            <Box w="120px" h="80px" bg="pink.500">
               Box 3
            </Box>
         </WrapItem>
         <WrapItem>
            <Box w="180px" h="40px" bg="cyan.500">
               Box 4
            </Box>
         </WrapItem>
         <WrapItem>
            <Box w="180px" h="80px" bg="green.500">
               Box 5
            </Box>
         </WrapItem>
      </Wrap>
   </Box>
)
