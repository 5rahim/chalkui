import {
   FormControl,
   FormHelperText,
   FormLabel,
}                from "../chalk/Components/FormControl"
import { Box }   from "../chalk/Components/Layout/Box"
import {
   HStack,
   Stack,
}                 from "../chalk/Components/Layout/Stack"
import { Text }   from "../chalk/Components/Typography/Text"
import React      from "react"
import { Input }  from '../chalk/Components/Input'
import {
   Radio,
   RadioGroup,
}                 from '../chalk/Components/Radio'
import { Select } from '../chalk/Components/Select'

export default {
   title: 'Forms/FormControl',
   components: [FormControl],
   subcomponents: { FormControl },
}

export const Base = () => (
   <FormControl id="email">
      <FormLabel>Email address</FormLabel>
      <Input type="email" />
      <FormHelperText>We'll never share your email.</FormHelperText>
   </FormControl>
)


export const withRadio = () => (
   <FormControl as="fieldset">
      <FormLabel as="legend">Favorite Character</FormLabel>
      <RadioGroup defaultValue="Jane">
         <HStack spacing="24px">
            <Radio value="John">John</Radio>
            <Radio value="Jane">Jane</Radio>
            <Radio value="Jack">Jack</Radio>
         </HStack>
      </RadioGroup>
      <FormHelperText>Select only if you're a fan.</FormHelperText>
   </FormControl>
)


export const Required = () => (
   <FormControl id="first-name" isRequired>
      <FormLabel>First name</FormLabel>
      <Input placeholder="First name" />
   </FormControl>
)


export const withSelect = () => (
   <FormControl id="country">
      <FormLabel>Country</FormLabel>
      <Select placeholder="Select country">
         <option>United Arab Emirates</option>
         <option>Nigeria</option>
      </Select>
   </FormControl>
)
