import React              from 'react'
import { SimpleGrid }     from '../chalk/Components/Layout/SimpleGrid'
import { Box }            from '../chalk/Components/Layout/Box'

export default {
   title: 'Layout/SimpleGrid',
   component: SimpleGrid,
}

export const Base: any = (args: any) => (
   <SimpleGrid columns={[1, 2, 3]} spacing={5}>
      <Box bg="blue.500" height="80px" />
      <Box bg="blue.500" height="80px" />
      <Box bg="blue.500" height="80px" />
      <Box bg="blue.500" height="80px" />
      <Box bg="blue.500" height="80px" />
   </SimpleGrid>
)
