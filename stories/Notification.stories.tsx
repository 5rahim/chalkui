import {
   Notification, NotificationCloseButton, NotificationContent,
   NotificationDescription, NotificationIcon, NotificationTitle,
}                              from "../chalk/Components/Notification"
import { Box }                 from "../chalk/Components/Layout/Box"
import React                   from "react"
import { BiCheckCircle }       from 'react-icons/bi'
import { Button, ButtonGroup } from '../chalk/Components/Button'
import { useToast }            from '../chalk/Components/Toast/UseToast'
import { Avatar }              from '../chalk/Components/Avatar'
import { WrapItem }            from '../chalk/Components/Layout/Wrap'

export default {
   title: 'Overlays/Notification',
   components: [Notification],
   subcomponents: { Notification },
}

export const Base = () => (
   <Box w="450px">
      <Notification>
         <NotificationIcon colorScheme="green.500" as={BiCheckCircle} />
         <NotificationContent>
            <NotificationTitle>Successfully saved!</NotificationTitle>
            <NotificationDescription>Anyone with a link can now view this file.</NotificationDescription>
         </NotificationContent>
         <NotificationCloseButton />
      </Notification>
   </Box>
)


export const WithButton = () => (
   <Box w="450px">
      <Notification>
         <NotificationContent>
            <NotificationTitle>Receive notifications</NotificationTitle>
            <NotificationDescription>Notifications may include alerts, sounds, and badges.</NotificationDescription>
            <ButtonGroup mt={2} spacing="1rem" size="md" variant="link">
               <Button colorScheme="green.500">Accept</Button>
               <Button>Don't allow</Button>
            </ButtonGroup>
         </NotificationContent>
      </Notification>
   </Box>
)

export const WithAvatar = () => (
   <Box w="450px">
      <Notification>
         <Avatar size={'md'} m={4} mr={0} name="Bojack Horseman" src="https://imgur.com/cUVOUXz.png" />
         <NotificationContent>
            <NotificationTitle>Bojack Horseman</NotificationTitle>
            <NotificationDescription>Sent you an invite to join the channel.</NotificationDescription>
            <ButtonGroup mt={2} spacing=".5rem" size="sm" variant="primary">
               <Button colorScheme="primary">Accept</Button>
               <Button variant="outline">Decline</Button>
            </ButtonGroup>
         </NotificationContent>
      </Notification>
   </Box>
)


export const Condensed = () => (
   <Box w="450px">
      <Notification>
         <NotificationContent>
            <NotificationTitle>Discussion archived</NotificationTitle>
         </NotificationContent>
         <Button variant="link" colorScheme="purple.500" mr={3} ml={20} outline={0}>Undo</Button>
         <NotificationCloseButton />
      </Notification>
   </Box>
)

export const WithToast = () => {
   const toast = useToast()
   return (
      <Button
         onClick={() =>
            toast({
               type: 'notification',
               duration: 9000,
               // icon: <NotificationIcon colorScheme="green.500" as={BiCheckCircle} />,
               position: "bottom-right",
               title: 'Discussion archived',
               action: <Button variant="link" colorScheme="purple.500" mr={3} ml={20} outline={0}>Undo</Button>,
               isClosable: true,
            })
         }
      >
         Show Toast
      </Button>
   )
}
