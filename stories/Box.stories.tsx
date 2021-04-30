import { Box }        from '../chalk/Components/Layout/Box'
import React          from 'react'
import { Flex }       from '../chalk/Components/Layout/Flex'
import { Heading }    from '../chalk/Components/Typography/Heading'
import { Text }       from '../chalk/Components/Typography/Text'
import { SimpleGrid } from '../chalk/Components/Layout/SimpleGrid'

export default {
   title: 'Layout/Box',
   component: Box,
}

const BoxTemplate = (args: any) => <Box {...args} />

export const Base: any = BoxTemplate.bind({})
Base.args = {
   children: "This is a box",
   backgroundColor: 'blue.500',
   color: 'white',
   width: ['full', '50%', 'xl'],
   p: 4,
}


export const Example: any = (args: any) => (
   <SimpleGrid columns={2} spacing={5}>
      <Box shadow={'sm'} p={5}>
         <Heading size={'md'}>This is a box</Heading>
         <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias amet aperiam atque aut cum debitis et, excepturi expedita, facere id inventore ipsa nisi perspiciatis provident quis repudiandae tempore veritatis voluptates.
         </Text>
      </Box>
      <Box shadow={'sm'} p={5}>
         <Heading size={'md'}>This is a box</Heading>
         <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias amet aperiam atque aut cum debitis et, excepturi expedita, facere id inventore ipsa nisi perspiciatis provident quis repudiandae tempore veritatis voluptates.
         </Text>
      </Box>
   </SimpleGrid>
)
