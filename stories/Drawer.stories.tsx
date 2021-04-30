import { Drawer, DrawerCloseButton, DrawerFooter }                from "../chalk/Components/Modal"
import { Box }                                                    from "../chalk/Components/Layout/Box"
import { Stack }                                                  from "../chalk/Components/Layout/Stack"
import { Text }                                                   from "../chalk/Components/Typography/Text"
import React                                                      from "react"
import { useDisclosure }                                          from '../chalk/Hooks'
import { Radio, RadioGroup }                                      from '../chalk/Components/Radio'
import { Button }                                                 from '../chalk/Components/Button'
import { DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from '../chalk/Components/Modal'

export default {
   title: 'Overlays/Drawer',
   components: [Drawer],
   subcomponents: { Drawer },
}

export const Base = () => {
   const { isOpen, onOpen, onClose } = useDisclosure()
   const [placement, setPlacement] = React.useState("right")
   
   return (
      <>
         <RadioGroup defaultValue={placement} onChange={setPlacement}>
            <Stack direction="row" mb="4">
               <Radio value="top">Top</Radio>
               <Radio value="right">Right</Radio>
               <Radio value="bottom">Bottom</Radio>
               <Radio value="left">Left</Radio>
            </Stack>
         </RadioGroup>
         <Button colorScheme="blue.500" onClick={onOpen}>
            Open
         </Button>
         <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay>
               <DrawerContent>
                  <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
                  <DrawerBody>
                     <p>Some contents...</p>
                     <p>Some contents...</p>
                     <p>Some contents...</p>
                  </DrawerBody>
               </DrawerContent>
            </DrawerOverlay>
         </Drawer>
      </>
   )
}

class Input extends React.Component<{ placeholder: string }> {
   render() {
      return null
   }
}

export const WithBrandedHeader = () => {
   const { isOpen, onOpen, onClose } = useDisclosure()
   const btnRef: any = React.useRef()
   
   return (
      <>
         <Button ref={btnRef} onClick={onOpen}>
            Open
         </Button>
         <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
            size="md"
         >
            <DrawerOverlay>
               <DrawerContent>
                  <DrawerCloseButton color="white" />
                  <DrawerHeader bg="purple.600" color="white">Create your account
                     <Text mt={1} color="whiteAlpha.700" fontSize="sm" fontWeight="normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Commodi cumque, dolore error ex id nostrum.</Text></DrawerHeader>
                  
                  <DrawerBody>
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores delectus dignissimos dolorem error fugiat ipsum libero
                     molestias numquam officia, officiis perspiciatis quaerat quas quasi, quo suscipit tenetur voluptas voluptate!
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores delectus dignissimos dolorem error fugiat ipsum libero
                     molestias numquam officia, officiis perspiciatis quaerat quas quasi, quo suscipit tenetur voluptas voluptate!
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores delectus dignissimos dolorem error fugiat ipsum libero
                     molestias numquam officia, officiis perspiciatis quaerat quas quasi, quo suscipit tenetur voluptas voluptate!
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores delectus dignissimos dolorem error fugiat ipsum libero
                     molestias numquam officia, officiis perspiciatis quaerat quas quasi, quo suscipit tenetur voluptas voluptate!
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores delectus dignissimos dolorem error fugiat ipsum libero
                     molestias numquam officia, officiis perspiciatis quaerat quas quasi, quo suscipit tenetur voluptas voluptate!
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores delectus dignissimos dolorem error fugiat ipsum libero
                     molestias numquam officia, officiis perspiciatis quaerat quas quasi, quo suscipit tenetur voluptas voluptate!
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores delectus dignissimos dolorem error fugiat ipsum libero
                     molestias numquam officia, officiis perspiciatis quaerat quas quasi, quo suscipit tenetur voluptas voluptate!
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores delectus dignissimos dolorem error fugiat ipsum libero
                     molestias numquam officia, officiis perspiciatis quaerat quas quasi, quo suscipit tenetur voluptas voluptate!
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores delectus dignissimos dolorem error fugiat ipsum libero
                     molestias numquam officia, officiis perspiciatis quaerat quas quasi, quo suscipit tenetur voluptas voluptate!
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores delectus dignissimos dolorem error fugiat ipsum libero
                     molestias numquam officia, officiis perspiciatis quaerat quas quasi, quo suscipit tenetur voluptas voluptate!
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores delectus dignissimos dolorem error fugiat ipsum libero
                     molestias numquam officia, officiis perspiciatis quaerat quas quasi, quo suscipit tenetur voluptas voluptate!
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores delectus dignissimos dolorem error fugiat ipsum libero
                     molestias numquam officia, officiis perspiciatis quaerat quas quasi, quo suscipit tenetur voluptas voluptate!
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores delectus dignissimos dolorem error fugiat ipsum libero
                     molestias numquam officia, officiis perspiciatis quaerat quas quasi, quo suscipit tenetur voluptas voluptate!
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores delectus dignissimos dolorem error fugiat ipsum libero
                     molestias numquam officia, officiis perspiciatis quaerat quas quasi, quo suscipit tenetur voluptas voluptate!
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores delectus dignissimos dolorem error fugiat ipsum libero
                     molestias numquam officia, officiis perspiciatis quaerat quas quasi, quo suscipit tenetur voluptas voluptate!
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores delectus dignissimos dolorem error fugiat ipsum libero
                     molestias numquam officia, officiis perspiciatis quaerat quas quasi, quo suscipit tenetur voluptas voluptate!
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores delectus dignissimos dolorem error fugiat ipsum libero
                     molestias numquam officia, officiis perspiciatis quaerat quas quasi, quo suscipit tenetur voluptas voluptate!
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores delectus dignissimos dolorem error fugiat ipsum libero
                     molestias numquam officia, officiis perspiciatis quaerat quas quasi, quo suscipit tenetur voluptas voluptate!
                     <Input placeholder="Type here..." />
                  </DrawerBody>
                  
                  <DrawerFooter borderTopWidth="1px">
                     <Button boxShadow="sm" colorScheme="gray.500" variant="outline" mr={2} onClick={onClose}>
                        Cancel
                     </Button>
                     <Button colorScheme="purple.600">Save</Button>
                  </DrawerFooter>
               </DrawerContent>
            </DrawerOverlay>
         </Drawer>
      </>
   )
}
