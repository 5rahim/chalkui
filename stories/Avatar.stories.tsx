import { Avatar, AvatarBadge, AvatarGroup } from "../chalk/Components/Avatar"
import { Box }                 from "../chalk/Components/Layout/Box"
import { Stack }  from "../chalk/Components/Layout/Stack"
import { Text }   from "../chalk/Components/Typography/Text"
import React              from "react"
import { Wrap, WrapItem } from '../chalk/Components/Layout/Wrap'

export default {
   title: 'Components/Avatar',
   components: [Avatar],
   subcomponents: { Avatar },
}

export const Base = () => (
   <Wrap>
      <WrapItem>
         <Avatar name="Dan Abrahmov" src="https://imgur.com/cUVOUXz.png" />
      </WrapItem>
      <WrapItem>
         <Avatar name="Kola Tioluwani" src="https://imgur.com/cUVOUXz.png" />
      </WrapItem>
      <WrapItem>
         <Avatar name="Kent Dodds" src="https://imgur.com/cUVOUXz.png-dodds" />
      </WrapItem>
      <WrapItem>
         <Avatar name="Ryan Florence" src="https://imgur.com/cUVOUXz.png" />
      </WrapItem>
      <WrapItem>
         <Avatar name="Prosper Otemuyiwa" src="https://imgur.com/cUVOUXz.png" />
      </WrapItem>
      <WrapItem>
         <Avatar />
      </WrapItem>
   </Wrap>
)

export const Primary = () => (
   <Wrap>
      <WrapItem>
         <Avatar name={"Bojack"} />
      </WrapItem>
      <WrapItem>
         <Avatar name={"Horseman"} />
      </WrapItem>
      <WrapItem>
         <Avatar name={"Bojack Horseman"} colorScheme={"blue.500"} />
      </WrapItem>
   </Wrap>
)

export const Secondary = () => (
   <Wrap>
      <WrapItem>
         <Avatar name={"Bojack Horseman"} variant={"secondary"} colorScheme={"blue.500"} />
      </WrapItem>
      <WrapItem>
         <Avatar name={"Bojack Horseman"} variant={"secondary"} colorScheme={"red.500"} />
      </WrapItem>
      <WrapItem>
         <Avatar name={"Bojack Horseman"} variant={"secondary"} colorScheme={"green.500"} />
      </WrapItem>
      <WrapItem>
         <Avatar name={"Bojack Horseman"} variant={"secondary"} colorScheme={"orange.500"} />
      </WrapItem>
   </Wrap>
)

export const outline = () => (
   <Wrap>
      <WrapItem>
         <Avatar name={"Bojack Horseman"} variant={"outline"} colorScheme={"blue.500"} />
      </WrapItem>
      <WrapItem>
         <Avatar name={"Bojack Horseman"} variant={"outline"} colorScheme={"red.500"} />
      </WrapItem>
      <WrapItem>
         <Avatar name={"Bojack Horseman"} variant={"outline"} colorScheme={"green.500"} />
      </WrapItem>
   </Wrap>
)


export const Sizes = () => (
   <Wrap>
      <WrapItem>
         <Avatar size={'2xs'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
      </WrapItem>
      <WrapItem>
         <Avatar size={'xs'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
      </WrapItem>
      <WrapItem>
         <Avatar size={'sm'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
      </WrapItem>
      <WrapItem>
         <Avatar size={'md'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
      </WrapItem>
      <WrapItem>
         <Avatar size={'lg'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
      </WrapItem>
      <WrapItem>
         <Avatar size={'xl'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
      </WrapItem>
      <WrapItem>
         <Avatar size={'2xl'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
      </WrapItem>
   </Wrap>
)


export const withBadge = () => (
   <Wrap>
      <WrapItem>
         <Avatar size={'sm'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png">
            <AvatarBadge boxSize={".9rem"} bg="green.500" />
         </Avatar>
      </WrapItem>
      <WrapItem>
         <Avatar name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png">
            <AvatarBadge bg="green.500" />
         </Avatar>
      </WrapItem>
   </Wrap>
)


export const Group = () => (
   <AvatarGroup size="md" max={2}>
      <Avatar name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
      <Avatar name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
      <Avatar name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
      <Avatar name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
      <Avatar name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
   </AvatarGroup>
)
