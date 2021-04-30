import React      from 'react'
import { Flex }   from '../chalk/Components/Layout/Flex'
import { Box }    from '../chalk/Components/Layout/Box'
import { Spacer } from '../chalk/Components/Layout/Spacer'

export default {
   title: 'Layout/Flex',
   component: Flex,
}

const Template = (args: any) => (
   <Flex {...args}>
      <Box p={5} w={40} bg={'purple.500'}>Box 1</Box>
      <Box p={5} w={50} bg={'blue.500'}>Box 2</Box>
      <Box p={5} flex={1} bg={'red.500'}>Box 3</Box>
   </Flex>
)

export const Base: any = Template.bind({})
Base.args = {
   color: 'white'
}

const SpacerTemplate = (args: any) => (
   <Flex color={'white'} {...args}>
      <Box p={5} w={30} bg={'purple.500'}>Box 1</Box>
      <Spacer />
      <Box p={5} w={30} bg={'blue.500'}>Box 2</Box>
   </Flex>
)
export const withSpacer: any = SpacerTemplate.bind({})
