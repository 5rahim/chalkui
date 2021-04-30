import { Modal }                 from "../chalk/Components/Modal"
import { Box }                   from "../chalk/Components/Layout/Box"
import { HStack, Stack, VStack } from "../chalk/Components/Layout/Stack"
import { Text }                  from "../chalk/Components/Typography/Text"
import React                     from "react"
import { useDisclosure }         from '../chalk/Hooks'
import { Button }                from '../chalk/Components/Button'
import {
   ModalBody, ModalCloseButton, ModalContent,
   ModalFooter, ModalHeader, ModalOverlay,
}                                from '../chalk/Components/Modal'
import { Icon }                  from '../chalk/Components/Icon'
import { BiBell, BiCheck }       from 'react-icons/bi'
import { IconBox }               from '../chalk/Components/IconBox'
import { Radio, RadioGroup }     from "../chalk/Components/Radio"

export default {
   title: 'Overlays/Modal',
   components: [Modal],
   subcomponents: { Modal },
}

export const Base = () => {
   const { isOpen, onOpen, onClose } = useDisclosure()
   return (
      <>
         <Button onClick={onOpen}>Open Modal</Button>
         
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Modal Title</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores eius explicabo ipsa laboriosam numquam porro praesentium quasi
                  quisquam reprehenderit, sint. Atque consequatur dolorum ducimus facilis provident quia, reprehenderit? Quod, unde!
               </ModalBody>
               
               <ModalFooter>
                  <Button colorScheme="primary" mr={3} onClick={onClose}>
                     Close
                  </Button>
                  <Button variant="ghost">Secondary Action</Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   )
}


export const WithIcon = () => {
   const { isOpen, onOpen, onClose } = useDisclosure()
   return (
      <>
         <Button onClick={onOpen}>Open Modal</Button>
         
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent textAlign="center">
               <IconBox isCircular icon={<BiCheck />} colorScheme="green.500" margin="0 auto" mt={3} />
               <ModalHeader textAlign="center">Payment Successful</ModalHeader>
               <ModalBody textAlign="center">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores eius explicabo ipsa laboriosam.
               </ModalBody>
               
               <ModalFooter>
                  <Button colorScheme="primary" onClick={onClose} isFullWidth>
                     Go back to dashboard
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   )
}


export const WithFullWidthIcon = () => {
   const { isOpen, onOpen, onClose } = useDisclosure()
   return (
      <>
         <Button onClick={onOpen}>Open Modal</Button>
         
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent textAlign="center">
               <IconBox isCircular icon={<BiCheck />} colorScheme="green.500" isFullWidth size="full" p={2} />
               <ModalHeader textAlign="center">Payment Successful</ModalHeader>
               <ModalBody textAlign="center">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores eius explicabo ipsa laboriosam.
               </ModalBody>
               
               <ModalFooter>
                  <Button colorScheme="primary" onClick={onClose} isFullWidth>
                     Go back to dashboard
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   )
}


export const KeepScrolling = () => {
   const { isOpen, onOpen, onClose } = useDisclosure()
   
   return (
      <>
         <Button onClick={onOpen}>Open Modal</Button>
         
         <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Modal Title</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <Text fontWeight="bold" mb="1rem">
                     You can scroll the content behind the modal
                  </Text>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam asperiores, assumenda aut debitis deleniti eius esse impedit
                  laborum laudantium, nam nobis optio quam qui quibusdam quidem rerum sequi ullam vero?
               </ModalBody>
               
               <ModalFooter>
                  <Button colorScheme="primary" mr={3} onClick={onClose}>
                     Close
                  </Button>
                  <Button variant="ghost">Secondary Action</Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
         
         <Box h="2000px" />
      </>
   )
}


export const KeepOnOverlayClick = () => {
   const { isOpen, onOpen, onClose } = useDisclosure()
   return (
      <>
         <Button onClick={onOpen}>Open Modal</Button>
         
         <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Modal Title</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores eius explicabo ipsa laboriosam numquam porro praesentium quasi
                  quisquam reprehenderit, sint. Atque consequatur dolorum ducimus facilis provident quia, reprehenderit? Quod, unde!
               </ModalBody>
               
               <ModalFooter>
                  <Button colorScheme="primary" mr={3} onClick={onClose}>
                     Close
                  </Button>
                  <Button variant="ghost">Secondary Action</Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   )
}


export const isCentered = () => {
   const { isOpen, onOpen, onClose } = useDisclosure()
   return (
      <>
         <Button onClick={onOpen}>Open Modal</Button>
         
         <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Modal Title</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores eius explicabo ipsa laboriosam numquam porro praesentium quasi
                  quisquam reprehenderit, sint. Atque consequatur dolorum ducimus facilis provident quia, reprehenderit? Quod, unde!
               </ModalBody>
               
               <ModalFooter>
                  <Button colorScheme="primary" mr={3} onClick={onClose}>
                     Close
                  </Button>
                  <Button variant="ghost">Secondary Action</Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   )
}


export const changeTransition = () => {
   const { isOpen, onOpen, onClose } = useDisclosure()
   return (
      <>
         <Button onClick={onOpen}>Open Modal</Button>
         
         <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Modal Title</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores eius explicabo ipsa laboriosam numquam porro praesentium quasi
                  quisquam reprehenderit, sint. Atque consequatur dolorum ducimus facilis provident quia, reprehenderit? Quod, unde!
               </ModalBody>
               
               <ModalFooter>
                  <Button colorScheme="primary" mr={3} onClick={onClose}>
                     Close
                  </Button>
                  <Button variant="ghost">Secondary Action</Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   )
}

export const OverflowBehaviour = () => {
   const { isOpen, onOpen, onClose } = useDisclosure()
   const [scrollBehavior, setScrollBehavior]: any = React.useState("inside")
   
   const btnRef: any = React.useRef()
   return (
      <>
         <RadioGroup value={scrollBehavior} onChange={setScrollBehavior}>
            <Stack direction="row">
               <Radio value="inside">inside</Radio>
               <Radio value="outside">outside</Radio>
            </Stack>
         </RadioGroup>
         
         <Button mt={3} ref={btnRef} onClick={onOpen}>
            Trigger modal
         </Button>
         
         <Modal
            onClose={onClose}
            finalFocusRef={btnRef}
            isOpen={isOpen}
            scrollBehavior={scrollBehavior}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Modal Title</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur fuga impedit inventore ipsa ipsum perferendis ratione saepe veritatis? Ab aliquid asperiores at expedita harum iste laudantium nobis tempore, ullam.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur fuga impedit inventore ipsa ipsum perferendis ratione saepe veritatis? Ab aliquid asperiores at expedita harum iste laudantium nobis tempore, ullam.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur fuga impedit inventore ipsa ipsum perferendis ratione saepe veritatis? Ab aliquid asperiores at expedita harum iste laudantium nobis tempore, ullam.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur fuga impedit inventore ipsa ipsum perferendis ratione saepe veritatis? Ab aliquid asperiores at expedita harum iste laudantium nobis tempore, ullam.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur fuga impedit inventore ipsa ipsum perferendis ratione saepe veritatis? Ab aliquid asperiores at expedita harum iste laudantium nobis tempore, ullam.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur fuga impedit inventore ipsa ipsum perferendis ratione saepe veritatis? Ab aliquid asperiores at expedita harum iste laudantium nobis tempore, ullam.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur fuga impedit inventore ipsa ipsum perferendis ratione saepe veritatis? Ab aliquid asperiores at expedita harum iste laudantium nobis tempore, ullam.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur fuga impedit inventore ipsa ipsum perferendis ratione saepe veritatis? Ab aliquid asperiores at expedita harum iste laudantium nobis tempore, ullam.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur fuga impedit inventore ipsa ipsum perferendis ratione saepe veritatis? Ab aliquid asperiores at expedita harum iste laudantium nobis tempore, ullam.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur fuga impedit inventore ipsa ipsum perferendis ratione saepe veritatis? Ab aliquid asperiores at expedita harum iste laudantium nobis tempore, ullam.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur fuga impedit inventore ipsa ipsum perferendis ratione saepe veritatis? Ab aliquid asperiores at expedita harum iste laudantium nobis tempore, ullam.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur fuga impedit inventore ipsa ipsum perferendis ratione saepe veritatis? Ab aliquid asperiores at expedita harum iste laudantium nobis tempore, ullam.
               </ModalBody>
               <ModalFooter>
                  <Button onClick={onClose}>Close</Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   )
}
