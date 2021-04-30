import {
   Popover,
   PopoverArrow,
   PopoverBody,
   PopoverCloseButton,
   PopoverContent,
   PopoverFooter,
   PopoverHeader,
   PopoverTrigger,
} from "../chalk/Components/Popover"
import { Box }    from "../chalk/Components/Layout/Box"
import { Stack }  from "../chalk/Components/Layout/Stack"
import { Text }   from "../chalk/Components/Typography/Text"
import React      from "react"
import {
   Button,
   ButtonGroup,
} from '../chalk/Components/Button'

export default {
   title: 'Overlays/Popover',
   components: [Popover],
   subcomponents: { Popover },
}

export const Base = () => (
   <Popover>
      <PopoverTrigger>
         <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>
         <PopoverCloseButton />
         <PopoverHeader>Confirmation!</PopoverHeader>
         <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
      </PopoverContent>
   </Popover>
)


export const Focus = () => {
   const initialFocusRef: any = React.useRef()
   return (
      <Popover
         initialFocusRef={initialFocusRef}
         placement="bottom"
         closeOnBlur={false}
      >
         <PopoverTrigger>
            <Button>Trigger</Button>
         </PopoverTrigger>
         <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
            <PopoverHeader pt={4} fontWeight="bold" border="0">
               Manage Your Channels
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
               Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
               eiusmod tempor incididunt ut labore et dolore.
            </PopoverBody>
            <PopoverFooter
               border="0"
               d="flex"
               alignItems="center"
               justifyContent="space-between"
               pb={4}
            >
               <Box fontSize="sm">Step 2 of 4</Box>
               <ButtonGroup size="sm">
                  <Button colorScheme="green.500">Setup Email</Button>
                  <Button colorScheme="blue.500" ref={initialFocusRef}>
                     Next
                  </Button>
               </ButtonGroup>
            </PopoverFooter>
         </PopoverContent>
      </Popover>
   )
}

export const Position = () => (
   <Box>
      <Box height="150px"/>
      <Popover placement="top-start">
         <PopoverTrigger>
            <Button>Trigger</Button>
         </PopoverTrigger>
         <PopoverContent>
            <PopoverCloseButton />
            <PopoverHeader>Confirmation!</PopoverHeader>
            <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
         </PopoverContent>
      </Popover>
   </Box>
)
