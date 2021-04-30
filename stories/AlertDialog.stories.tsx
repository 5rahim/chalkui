import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay } from "../chalk/Components/Modal"
import { Box }                                                                                                        from "../chalk/Components/Layout/Box"
import { Stack }                                                                                                      from "../chalk/Components/Layout/Stack"
import { Text }                                                                                                       from "../chalk/Components/Typography/Text"
import React                                                                                                          from "react"
import { Button }                                                                                                     from '../chalk/Components/Button'
import { Flex }                                                                                                       from '../chalk/Components/Layout/Flex'
import { IconBox }                                                                                                    from '../chalk/Components/IconBox'
import { BiShieldQuarter }                                                                                            from "react-icons/bi"

export default {
   title: 'Overlays/AlertDialog',
   components: [AlertDialog],
   subcomponents: { AlertDialog },
}

export const Base = () => {
   const [isOpen, setIsOpen] = React.useState(false)
   const onClose = () => setIsOpen(false)
   const cancelRef: any = React.useRef()
   
   return (
      <>
         <Button colorScheme="red.500" onClick={() => setIsOpen(true)}>
            Delete Customer
         </Button>
         
         <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
         >
            <AlertDialogOverlay>
               <AlertDialogContent>
                  <Flex>
                     <IconBox colorScheme="red.500" isCircular icon={<BiShieldQuarter />} mt={4} ml={4} position="absolute" />
                     <Box pl="3.5rem">
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                           Delete Customer
                        </AlertDialogHeader>
   
                        <AlertDialogBody>
                           Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>
   
                        <AlertDialogFooter>
                           <Button variant="secondary" ref={cancelRef} onClick={onClose}>
                              Cancel
                           </Button>
                           <Button variant="secondary" colorScheme="red.500" onClick={onClose} ml={3}>
                              Delete
                           </Button>
                        </AlertDialogFooter>
                     </Box>
                  </Flex>
               </AlertDialogContent>
            </AlertDialogOverlay>
         </AlertDialog>
      </>
   )
}
