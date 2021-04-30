import { Divider } from "../chalk/Components/Layout/Divider"
import { Box }     from "../chalk/Components/Layout/Box"
import { Stack }   from "../chalk/Components/Layout/Stack"
import { Text }    from "../chalk/Components/Typography/Text"
import React       from "react"
import { Center }  from '../chalk/Components/Layout/Center'

export default {
   title: 'DataDisplay/Divider',
   components: [Divider],
   subcomponents: { Divider },
}

export const Base = () => (
   <Box>
      <Text>
         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aspernatur deserunt enim eos expedita explicabo illo laboriosam libero
         maxime molestias nihil nostrum optio perspiciatis, praesentium ratione sapiente totam, unde ut?
      </Text>
      <Divider />
      <Text>
         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aspernatur deserunt enim eos expedita explicabo illo laboriosam libero
         maxime molestias nihil nostrum optio perspiciatis, praesentium ratione sapiente totam, unde ut?
      </Text>
   </Box>
)

export const Orientation = () => (
   <Center height="50px">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis dolores nam neque odio quasi quibusdam quod reprehenderit! Aliquid assumenda,
      corporis culpa dignissimos dolores, iure modi quasi quis quo, quod ullam.
      <Divider orientation="vertical" />
      <Text ml={2}>
         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, dolore ducimus ipsa mollitia odit quis veniam! Accusamus aspernatur
         consequatur cupiditate, distinctio exercitationem expedita ipsa laboriosam minus natus, nemo officia saepe.
      </Text>
   </Center>
)
