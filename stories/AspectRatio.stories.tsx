import { AspectRatio }    from "../chalk/Components/Layout/AspectRatio"
import { Image }          from "../chalk/Components/Image"
import { Stack }          from "../chalk/Components/Layout/Stack"
import { Text }           from "../chalk/Components/Typography/Text"
import React              from "react"
import { Grid, GridItem } from '../chalk/Components/Layout/Grid'
import { Box }            from '../chalk/Components/Layout/Box'
import { SimpleGrid }     from '../chalk/Components/Layout/SimpleGrid'
import { Container }      from '../chalk/Components/Layout/Container'

export default {
   title: 'Layout/AspectRatio',
   components: [AspectRatio],
   subcomponents: { AspectRatio },
}

export const Base = () => (
   <AspectRatio maxW="400px" ratio={4 / 3}>
      <Image src="https://imgur.com/cUVOUXz.png" alt="bojack" objectFit="cover" />
   </AspectRatio>
)


export const Example = () => (
   <Container maxW={'container.lg'}>
      <SimpleGrid columns={[2, null]}>
         <AspectRatio maxWidth={['100%', 4]} ratio={4 / 3}>
            <Image src="https://i.imgur.com/cUVOUXz.jpg" alt="Bojack Horseman" />
         </AspectRatio>
      
         <Box backgroundColor="gray.100" width="100%" p={5}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet architecto aspernatur assumenda deserunt dignissimos dolore, dolorum
            eveniet exercitationem expedita id impedit libero nam nostrum obcaecati pariatur perferendis placeat recusandae reiciendis.
         </Box>
      </SimpleGrid>
   </Container>
)
