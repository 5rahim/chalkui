import { Toast }    from '../chalk/Components/Toast/Toast'
import { Box }      from "../chalk/Components/Layout/Box"
import { Stack }    from "../chalk/Components/Layout/Stack"
import React        from "react"
import { Button }   from '../chalk/Components/Button'
import { useToast }       from '../chalk/Components/Toast'
import { Wrap, WrapItem } from '../chalk/Components/Layout/Wrap'

export default {
   title: 'Feedback/Toast',
   components: [Toast],
   subcomponents: { Toast },
}

export const Base = () => {
   const toast = useToast()
   return (
      <Button
         onClick={() =>
            toast({
               title: "Account created.",
               description: "We've created your account for you.",
               status: "success",
               duration: 5000,
               isClosable: true,
               variant: 'primary',
            })
         }
      >
         Show Toast
      </Button>
   )
}


export const DescriptionOnly = () => {
   const toast = useToast()
   return (
      <Button
         onClick={() =>
            toast({
               duration: 5000,
               position: "bottom",
               description: "This is a description",
               isClosable: true,
            })
         }
      >
         Show Toast
      </Button>
   )
}

export const CloseAll = () => {
   const toast = useToast()
   const toastIdRef: any = React.useRef()
   
   function close() {
      if (toastIdRef.current) {
         toast.close(toastIdRef.current)
      }
   }
   
   function closeAll() {
      // you may optionally pass an object of positions to exclusively close
      // keeping other positions opened
      // e.g. `{ positions: ['bottom'] }`
      toast.closeAll()
   }
   
   function addToast() {
      toastIdRef.current = toast({ description: "some text" })
   }
   
   return (
      <Stack isInline spacing={2}>
         <Button onClick={addToast} type="button">
            Toast
         </Button>
         
         <Button onClick={close} type="button" variant="outline">
            Close last toast
         </Button>
         
         <Button onClick={closeAll} type="button" variant="outline">
            Close all toasts
         </Button>
      </Stack>
   )
}

export const Status = () => {
   const toast = useToast()
   const statuses = ["success", "error", "warning", "info"]
   
   return (
      <Wrap>
         {statuses.map((status, i) => (
            <WrapItem key={i}>
               <Button
                  onClick={() =>
                     toast({
                        title: `${status} toast`,
                        status: status,
                        isClosable: true,
                     })
                  }
               >
                  Show {status} toast
               </Button>
            </WrapItem>
         ))}
      </Wrap>
   )
}


export const Variants = () => {
   const toast = useToast()
   return (
      <Button
         onClick={() =>
            toast({
               duration: 5000,
               position: "bottom",
               description: "This is a description",
               variant: 'secondary',
               isClosable: true,
            })
         }
      >
         Show Toast
      </Button>
   )
}


export const Custom = () => {
   const toast = useToast()
   return (
      <Button
         onClick={() =>
            toast({
               duration: 5000,
               position: "bottom-left",
               render: () => (
                  <Box color="white" p={3} bg="blue.500">
                     Hello World
                  </Box>
               ),
            })
         }
      >
         Show Toast
      </Button>
   )
}
