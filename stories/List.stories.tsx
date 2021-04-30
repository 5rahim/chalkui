import { CelledList, DividedList, List, ListIcon, ListItem, ListLinkItem, OrderedList, UnorderedList } from "../chalk/Components/Layout/List"
import { Box }                                                  from "../chalk/Components/Layout/Box"
import { Stack, VStack }                                        from "../chalk/Components/Layout/Stack"
import { Text }                                                 from "../chalk/Components/Typography/Text"
import React                                                    from "react"
import { BiCalendar, BiCalendarAlt, MdCheckCircle, MdSettings } from 'react-icons/all'
import { Flex }                                                 from '../chalk/Components/Layout/Flex'
import { Avatar, AvatarGroup }                                  from '../chalk/Components/Avatar'
import { WrapItem }                                             from '../chalk/Components/Layout/Wrap'
import { Heading }                                              from '../chalk/Components/Typography/Heading'
import { Link }                                                 from '../chalk/Components/Layout/Link'
import { Icon }                                                 from '../chalk/Components/Icon'
import { Badge }                                                from '../chalk/Components/Layout/Badge'
import { Tag }                                                  from '../chalk/Components/Tag'

export default {
   title: 'DataDisplay/List',
   components: [List],
   subcomponents: { List },
}

export const Base = () => (
   <UnorderedList>
      <ListItem>Lorem ipsum dolor sit amet</ListItem>
      <ListItem>Consectetur adipiscing elit</ListItem>
      <ListItem>Integer molestie lorem at massa</ListItem>
      <ListItem>Facilisis in pretium nisl aliquet</ListItem>
   </UnorderedList>
)

export const Ordered = () => (
   <OrderedList>
      <ListItem>Lorem ipsum dolor sit amet</ListItem>
      <ListItem>Consectetur adipiscing elit</ListItem>
      <ListItem>Integer molestie lorem at massa</ListItem>
      <ListItem>Facilisis in pretium nisl aliquet</ListItem>
   </OrderedList>
)


export const WithIcons = () => (
   <List spacing={2}>
      <ListItem>
         <ListIcon as={MdCheckCircle} color="green.500" />
         Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </ListItem>
      <ListItem>
         <ListIcon as={MdCheckCircle} color="green.500" />
         Assumenda, quia temporibus eveniet a libero incidunt suscipit
      </ListItem>
      <ListItem>
         <ListIcon as={MdCheckCircle} color="green.500" />
         Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
      </ListItem>
      {/* You can also use custom icons from react-icons */}
      <ListItem>
         <ListIcon as={MdSettings} color="green.500" />
         Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
      </ListItem>
   </List>
)

export const WithLinks = () => (
   <Stack spacing={8}>
      <List spacing={1}>
         <ListLinkItem href="#">
            <Link>
               What is a FAQ?
            </Link>
         </ListLinkItem>
         <ListLinkItem href="#">
            <Link>
               Who is our user?
            </Link>
         </ListLinkItem>
         <ListLinkItem href="#">
            <Link>
               Where is our office located?
            </Link>
         </ListLinkItem>
      </List>
      
      <List spacing={2} isHorizontal>
         <ListLinkItem href="#">
            <Link>
               What is a FAQ?
            </Link>
         </ListLinkItem>
         <ListLinkItem href="#">
            <Link>
               Who is our user?
            </Link>
         </ListLinkItem>
         <ListLinkItem href="#">
            <Link>
               Where is our office located?
            </Link>
         </ListLinkItem>
      </List>
   </Stack>
)

export const WithAvatar = () => (
   <List spacing={2}>
      <ListItem>
         <Flex alignItems="center">
            <Avatar size={'sm'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" mr={2} />
            <Box fontSize="sm">
               <Link>Bojack Horseman</Link>
               <Text>Last seen watching <Link>Arrested Development</Link> just now.</Text>
            </Box>
         </Flex>
      </ListItem>
      <ListItem>
         <Flex alignItems="center">
            <Avatar size={'sm'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" mr={2} />
            <Box fontSize="sm">
               <Link>Bojack Horseman</Link>
               <Text>Last seen watching <Link>Arrested Development</Link> just now.</Text>
            </Box>
         </Flex>
      </ListItem>
      <ListItem>
         <Flex alignItems="center">
            <Avatar size={'sm'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" mr={2} />
            <Box fontSize="sm">
               <Link>Bojack Horseman</Link>
               <Text>Last seen watching <Link>Arrested Development</Link> just now.</Text>
            </Box>
         </Flex>
      </ListItem>
   </List>
)

export const WithAvatarHorizontal = () => (
   <List spacing={6} isHorizontal fontWeight="semibold" fontSize="sm">
      <ListItem>
         <Flex alignItems="center">
            <Avatar size={'xs'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" mr={2} />
            <Link>Bojack Horseman</Link>
         </Flex>
      </ListItem>
      <ListItem>
         <Flex alignItems="center">
            <Avatar size={'xs'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" mr={2} />
            <Link>Bojack Horseman</Link>
         </Flex>
      </ListItem>
      <ListItem>
         <Flex alignItems="center">
            <Avatar size={'xs'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" mr={2} />
            <Link>Bojack Horseman</Link>
         </Flex>
      </ListItem>
   </List>
)


export const Divided = () => (
   <DividedList spacing={2}>
      <ListItem>
         <Flex alignItems="center">
            <Avatar size={'sm'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" mr={2} />
            <Box fontSize="sm">
               <Link>Bojack Horseman</Link>
               <Text>Last seen watching <Link>Arrested Development</Link> just now.</Text>
            </Box>
         </Flex>
      </ListItem>
      <ListItem>
         <Flex alignItems="center">
            <Avatar size={'sm'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" mr={2} />
            <Box fontSize="sm">
               <Link>Bojack Horseman</Link>
               <Text>Last seen watching <Link>Arrested Development</Link> just now.</Text>
            </Box>
         </Flex>
      </ListItem>
      <ListItem>
         <Flex alignItems="center">
            <Avatar size={'sm'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" mr={2} />
            <Box fontSize="sm">
               <Link>Bojack Horseman</Link>
               <Text>Last seen watching <Link>Arrested Development</Link> just now.</Text>
            </Box>
         </Flex>
      </ListItem>
   </DividedList>
)


// export const DividedWithBorder = () => (
//    <Box border="1px" borderColor="gray.200" borderRadius="md" boxShadow="sm">
//       <DividedList isFullWidth>
//          <ListItem px={4} py={2}>
//             <Flex alignItems="center">
//                <Avatar size={'sm'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" mr={2} />
//                <Box fontSize="sm">
//                   <Link>Bojack Horseman</Link>
//                   <Text>Last seen watching <Link>Arrested Development</Link> just now.</Text>
//                </Box>
//             </Flex>
//          </ListItem>
//          <ListItem px={4} py={2}>
//             <Flex alignItems="center">
//                <Avatar size={'sm'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" mr={2} />
//                <Box fontSize="sm">
//                   <Link>Bojack Horseman</Link>
//                   <Text>Last seen watching <Link>Arrested Development</Link> just now.</Text>
//                </Box>
//             </Flex>
//          </ListItem>
//          <ListItem px={4} py={2}>
//             <Flex alignItems="center">
//                <Avatar size={'sm'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" mr={2} />
//                <Box fontSize="sm">
//                   <Link>Bojack Horseman</Link>
//                   <Text>Last seen watching <Link>Arrested Development</Link> just now.</Text>
//                </Box>
//             </Flex>
//          </ListItem>
//       </DividedList>
//    </Box>
// )


export const Celled = () => (
   <CelledList>
      <ListItem px={4} py={2}>
         <Flex alignItems="center">
            <Avatar size={'sm'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" mr={2} />
            <Box fontSize="sm">
               <Link>Bojack Horseman</Link>
               <Text>Last seen watching <Link>Arrested Development</Link> just now.</Text>
            </Box>
         </Flex>
      </ListItem>
      <ListItem px={4} py={2}>
         <Flex alignItems="center">
            <Avatar size={'sm'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" mr={2} />
            <Box fontSize="sm">
               <Link>Bojack Horseman</Link>
               <Text>Last seen watching <Link>Arrested Development</Link> just now.</Text>
            </Box>
         </Flex>
      </ListItem>
      <ListItem px={4} py={2}>
         <Flex alignItems="center">
            <Avatar size={'sm'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" mr={2} />
            <Box fontSize="sm">
               <Link>Bojack Horseman</Link>
               <Text>Last seen watching <Link>Arrested Development</Link> just now.</Text>
            </Box>
         </Flex>
      </ListItem>
   </CelledList>
)
export const CelledWithLinks = () => (
   <Stack>
      <CelledList>
         <ListLinkItem px={4} py={2}>
            <Flex alignItems="center">
               <Avatar size={'sm'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" mr={2} />
               <Box fontSize="sm">
                  <Heading>Bojack Horseman</Heading>
                  <Text>Last seen watching Arrested Development just now.</Text>
               </Box>
            </Flex>
         </ListLinkItem>
         <ListLinkItem px={4} py={2}>
            <Flex alignItems="center">
               <Avatar size={'sm'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" mr={2} />
               <Box fontSize="sm">
                  <Heading>Bojack Horseman</Heading>
                  <Text>Last seen watching Arrested Development just now.</Text>
               </Box>
            </Flex>
         </ListLinkItem>
         <ListLinkItem px={4} py={2}>
            <Flex alignItems="center">
               <Avatar size={'sm'} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" mr={2} />
               <Box fontSize="sm">
                  <Heading>Bojack Horseman</Heading>
                  <Text>Last seen watching Arrested Development just now.</Text>
               </Box>
            </Flex>
         </ListLinkItem>
      </CelledList>
   
      <CelledList>
         <ListLinkItem px={4} py={2}>
            Lorem ipsum dolor sit amet, consectetur adipisicing
         </ListLinkItem>
         <ListLinkItem px={4} py={2}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit
         </ListLinkItem>
         <ListLinkItem px={4} py={2}>
            Lorem ipsum dolor sit amet, consectetur
         </ListLinkItem>
      </CelledList>
   </Stack>
)


export const CelledExample = () => (
   <CelledList isFullWidth>
      <ListItem px={6} py={4}>
         <Flex alignItems="center" justifyContent="space-between">
            <Box fontSize="md">
               <Link fontWeight="semibold">Back End Developer</Link> in Engineering <Tag pill colorScheme="green.500">Full-time</Tag>
               <Flex alignItems="center"><Icon as={BiCalendarAlt} mr={1} /><Text>Closing on January 7, 2025</Text></Flex>
            </Box>
            <Box>
               <AvatarGroup size="sm" max={5}>
                  <Avatar name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
                  <Avatar name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
                  <Avatar name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
                  <Avatar name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
                  <Avatar name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
               </AvatarGroup>
            </Box>
         </Flex>
      </ListItem>
      <ListItem px={6} py={4}>
         <Flex alignItems="center" justifyContent="space-between">
            <Box fontSize="md">
               <Link fontWeight="semibold">Back End Developer</Link> in Engineering <Tag pill colorScheme="green.500">Full-time</Tag>
               <Flex alignItems="center"><Icon as={BiCalendarAlt} mr={1} /><Text>Closing on January 7, 2025</Text></Flex>
            </Box>
            <Box>
               <AvatarGroup size="sm" max={5}>
                  <Avatar name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
                  <Avatar name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
                  <Avatar name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
                  <Avatar name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
                  <Avatar name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
               </AvatarGroup>
            </Box>
         </Flex>
      </ListItem>
      <ListItem px={6} py={4}>
         <Flex alignItems="center" justifyContent="space-between">
            <Box fontSize="md">
               <Link fontWeight="semibold">Back End Developer</Link> in Engineering <Tag pill colorScheme="green.500">Full-time</Tag>
               <Flex alignItems="center"><Icon as={BiCalendarAlt} mr={1} /><Text>Closing on January 7, 2025</Text></Flex>
            </Box>
            <Box>
               <AvatarGroup size="sm" max={5}>
                  <Avatar name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
                  <Avatar name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
                  <Avatar name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
                  <Avatar name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
                  <Avatar name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
               </AvatarGroup>
            </Box>
         </Flex>
      </ListItem>
   </CelledList>
)


