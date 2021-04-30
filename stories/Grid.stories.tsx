import { Box }  from '../chalk/Components/Layout/Box'
import React              from 'react'
import { Grid, GridItem } from '../chalk/Components/Layout/Grid'

export default {
   title: 'Layout/Grid',
   component: Grid,
}

const Template = (args: any) => (
   <Grid {...args}>
      <Box w={'100%'} h={10} bg={'purple.500'} />
      <Box w={'100%'} h={10} bg={'purple.500'} />
      <Box w={'100%'} h={10} bg={'purple.500'} />
      <Box w={'100%'} h={10} bg={'purple.500'} />
      <Box w={'100%'} h={10} bg={'purple.500'} />
      <Box w={'100%'} h={10} bg={'purple.500'} />
   </Grid>
)
export const Base: any = Template.bind({})
Base.args = {
   templateColumns: "repeat(6, 1fr)",
   gap: 8
}

export const withRows: any = (args: any) => (
   <Grid h="200px" templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" gap={6}>
      <GridItem rowSpan={2} colSpan={1} bg="blue.500" />
      <GridItem colSpan={2} bg="purple.500" />
      <GridItem colSpan={2} bg="purple.500" />
      <GridItem colSpan={4} bg="blue.500" />
   </Grid>
)
