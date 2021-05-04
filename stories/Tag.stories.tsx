import {
   Tag,
   TagCloseButton,
   TagLabel,
   TagLeftIcon,
   TagRightIcon,
}                          from "../chalk/Components/Tag"
import { Box }             from "../chalk/Components/Layout/Box"
import {
   HStack,
   Stack,
}                          from "../chalk/Components/Layout/Stack"
import { Text }            from "../chalk/Components/Typography/Text"
import React, { useState } from "react"
import { BiCog }           from 'react-icons/bi'
import { IoIosAdd }        from 'react-icons/io'
import { Avatar }          from '../chalk/Components/Avatar'
import { AnimatePresence } from 'framer-motion'
import { ZoomOutItem }     from "../chalk/Components/Animations"

export default {
   title: 'DataDisplay/Tag',
   components: [Tag],
   subcomponents: { Tag },
}

export const Base = () => (
   <Tag>Sample Tag</Tag>
)


export const Sizes = () => (
   <HStack spacing={4}>
      {["sm", "md", "lg"].map((size) => (
         <Tag size={size} key={size} variant="primary" colorScheme="blue.500">
            Teal
         </Tag>
      ))}
   </HStack>
)

export const WithLeftIcon = () => (
   <HStack spacing={4}>
      {["sm", "md", "lg"].map((size) => (
         <Tag size={size} key={size} variant="secondary" colorScheme="green.500">
            <TagLeftIcon as={IoIosAdd} />
            <TagLabel>Tag</TagLabel>
         </Tag>
      ))}
   </HStack>
)


export const WithRightIcon = () => (
   <HStack spacing={4}>
      {["sm", "md", "lg"].map((size) => (
         <Tag size={size} key={size} variant="outline" colorScheme="blue.500">
            <TagLabel>Blue</TagLabel>
            <TagRightIcon as={BiCog} />
         </Tag>
      ))}
   </HStack>
)

export const CloseButton = () => (
   <HStack spacing={4}>
      {["sm", "md", "lg"].map((size) => (
         <Tag
            size={size}
            key={size}
            borderRadius="full"
            variant="secondary"
            colorScheme="green.500"
         >
            <TagLabel>Green</TagLabel>
            <TagCloseButton />
         </Tag>
      ))}
   </HStack>
)


export const WithAvatar = () => (
   <Tag size="lg" colorScheme="red.500" borderRadius="full">
      <Avatar
         src="https://i.imgur.com/cUVOUXz.jpg"
         size="xs"
         name="Bojack Horseman"
         ml={-1}
         mr={2}
      />
      <TagLabel>Bojack</TagLabel>
      <TagCloseButton />
   </Tag>
)

export const Example = () => {
   const [tags, setTags] = useState(['One', 'Two', 'Three', 'Four', 'Five'])
   
   return (
      <>
         <AnimatePresence>
            {tags.map((tag) => (
               <ZoomOutItem
                  key={tag}
                  sx={{ mr: 2 }}
                  transition={{ duration: 0.3 }}
                  isInline
               >
                  <Tag variant="secondary" variantColor="cyan.800" pill>
                     <TagLabel>{tag}</TagLabel>
                     <TagCloseButton onClick={() => setTags(tags.filter((t) => t !== tag))} />
                  </Tag>
               </ZoomOutItem>
            ))}
         </AnimatePresence>
      </>
   )
}
