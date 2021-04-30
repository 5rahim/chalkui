import { Container }     from "../chalk/Components/Layout/Container"
import { Box }           from "../chalk/Components/Layout/Box"
import { Stack, VStack } from "../chalk/Components/Layout/Stack"
import { Text }          from "../chalk/Components/Typography/Text"
import React             from "react"
import { Flex }          from '../chalk/Components/Layout/Flex'

export default {
   title: 'Layout/Container',
   components: [Container],
   subcomponents: { Container },
}

export const Base = (args: any) => (
   <Container>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consequuntur doloremque eum facere hic id porro, quam quidem tempora voluptatum? Consequatur dicta dignissimos pariatur praesentium veritatis voluptates? Eligendi, nam, voluptatem.
   </Container>
)


export const Sizes = (args: any) => (
   <Flex flexDirection={'column'} gridGap={'15px'}>
      <Container maxW={'container.xl'}>
         XL Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consequuntur doloremque eum facere hic id porro, quam quidem tempora voluptatum? Consequatur dicta dignissimos pariatur praesentium veritatis voluptates? Eligendi, nam, voluptatem.
      </Container>
      <Container maxW={'container.lg'}>
         LG Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consequuntur doloremque eum facere hic id porro, quam quidem tempora voluptatum? Consequatur dicta dignissimos pariatur praesentium veritatis voluptates? Eligendi, nam, voluptatem.
      </Container>
      <Container maxW={'container.md'}>
         MD Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consequuntur doloremque eum facere hic id porro, quam quidem tempora voluptatum? Consequatur dicta dignissimos pariatur praesentium veritatis voluptates? Eligendi, nam, voluptatem.
      </Container>
      <Container maxW={'container.sm'}>
         SM Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consequuntur doloremque eum facere hic id porro, quam quidem tempora voluptatum? Consequatur dicta dignissimos pariatur praesentium veritatis voluptates? Eligendi, nam, voluptatem.
      </Container>
      <Container>
         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consequuntur doloremque eum facere hic id porro, quam quidem tempora voluptatum? Consequatur dicta dignissimos pariatur praesentium veritatis voluptates? Eligendi, nam, voluptatem.
      </Container>
   </Flex>
)
