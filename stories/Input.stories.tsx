import {
   Input,
   InputGroup,
   InputLeftAddon,
   InputLeftElement,
   InputRightAddon,
   InputRightElement,
}                  from "../chalk/Components/Input"
import { Box }     from "../chalk/Components/Layout/Box"
import { Stack }   from "../chalk/Components/Layout/Stack"
import { Text }    from "../chalk/Components/Typography/Text"
import React       from "react"
import { BiPhone } from 'react-icons/all'
import { BiCheck } from 'react-icons/bi'
import { Button }  from '../chalk/Components/Button'

export default {
   title: 'Forms/Input',
   components: [Input],
   subcomponents: { Input },
}

export const Base = () => (
   <Input placeholder="Basic usage" />
)


export const Sizes = () => (
   <Stack spacing={3}>
      <Input placeholder="extra small size" size="xs" />
      <Input placeholder="small size" size="sm" />
      <Input placeholder="medium size" size="md" />
      <Input placeholder="large size" size="lg" />
   </Stack>
)


export const Appearence = () => (
   <Stack spacing={3}>
      <Input variant="outline" placeholder="Outline" />
      <Input variant="filled" placeholder="Filled" />
      <Input variant="flushed" placeholder="Flushed" />
      <Input variant="unstyled" placeholder="Unstyled" />
   </Stack>
)

export const Addons = () => (
   <Stack spacing={4}>
      <InputGroup>
         <InputLeftAddon children="+234" />
         <Input type="tel" placeholder="phone number" />
      </InputGroup>
      
      <InputGroup variant="filled">
         <InputLeftAddon children="+234" />
         <Input type="tel" placeholder="phone number" />
      </InputGroup>
      
      <InputGroup variant="flushed">
         <InputLeftAddon children="+234" />
         <Input type="tel" placeholder="phone number" />
      </InputGroup>
      
      {/* If you add the size prop to `InputGroup`, it'll pass it to all its children. */}
      <InputGroup size="sm">
         <InputLeftAddon children="https://" />
         <Input placeholder="mysite" />
         <InputRightAddon children=".com" />
      </InputGroup>
   </Stack>
)


export const Icons = () => (
   <Stack spacing={4}>
      <InputGroup>
         <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="xl"
            children={<BiPhone />}
         />
         <Input type="tel" placeholder="Phone number" />
      </InputGroup>
      
      <InputGroup>
         <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children="$"
         />
         <Input placeholder="Enter amount" />
         <InputRightElement fontSize="xl" color="green.500" children={<BiCheck />} />
      </InputGroup>
   </Stack>
)

export const Password = () => {
   const [show, setShow] = React.useState(false)
   const handleClick = () => setShow(!show)
   
   return (
      <InputGroup size="md">
         <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
         />
         <InputRightElement width="4.5rem">
            <Button variant="secondary" h="1.75rem" size="sm" onClick={handleClick}>
               {show ? "Hide" : "Show"}
            </Button>
         </InputRightElement>
      </InputGroup>
   )
   
}

export const FocusAndError = () => (
   <Stack spacing={3}>
      <Input focusBorderColor="lime" placeholder="Here is a sample placeholder" />
      <Input
         focusBorderColor="pink.400"
         placeholder="Here is a sample placeholder"
      />
      <Input
         isInvalid
         errorBorderColor="red.300"
         placeholder="Here is a sample placeholder"
      />
      <Input
         isInvalid
         errorBorderColor="crimson"
         placeholder="Here is a sample placeholder"
      />
   </Stack>

)
