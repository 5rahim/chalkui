import { Button, ButtonGroup, IconButton } from "../chalk/Components/Button"
import { HStack, Stack, VStack }           from "../chalk/Components/Layout/Stack"
import React                               from "react"
import { Wrap, WrapItem }                  from '../chalk/Components/Layout/Wrap'
import { SimpleGrid }                      from '../chalk/Components/Layout/SimpleGrid'
import { BiBell, BiCart, BiPlus }          from 'react-icons/bi'

export default {
   title: 'Forms/Button',
   components: [Button],
   subcomponents: { Button },
}

export const withShades = () => (
   <SimpleGrid gap="10px">
      <Wrap>
         <WrapItem><Button colorScheme="blue.100">Button</Button></WrapItem>
         <WrapItem><Button colorScheme="blue.200">Button</Button></WrapItem>
         <WrapItem><Button colorScheme="blue.300">Button</Button></WrapItem>
         <WrapItem><Button colorScheme="blue.400">Button</Button></WrapItem>
         <WrapItem><Button colorScheme="blue.500">Button</Button></WrapItem>
         <WrapItem><Button colorScheme="blue.600">Button</Button></WrapItem>
         <WrapItem><Button colorScheme="blue.700">Button</Button></WrapItem>
         <WrapItem><Button colorScheme="blue.800">Button</Button></WrapItem>
         <WrapItem><Button colorScheme="blue.900">Button</Button></WrapItem>
      </Wrap>
      <Wrap>
         <WrapItem><Button colorScheme="red.100">Button</Button></WrapItem>
         <WrapItem><Button colorScheme="red.200">Button</Button></WrapItem>
         <WrapItem><Button colorScheme="red.300">Button</Button></WrapItem>
         <WrapItem><Button colorScheme="red.400">Button</Button></WrapItem>
         <WrapItem><Button colorScheme="red.500">Button</Button></WrapItem>
         <WrapItem><Button colorScheme="red.600">Button</Button></WrapItem>
         <WrapItem><Button colorScheme="red.700">Button</Button></WrapItem>
         <WrapItem><Button colorScheme="red.800">Button</Button></WrapItem>
         <WrapItem><Button colorScheme="red.900">Button</Button></WrapItem>
      </Wrap>
      <Wrap>
         <WrapItem><Button colorScheme="gray.100">Button</Button></WrapItem>
         <WrapItem><Button colorScheme="gray.200">Button</Button></WrapItem>
         <WrapItem><Button colorScheme="gray.300">Button</Button></WrapItem>
         <WrapItem><Button colorScheme="gray.400">Button</Button></WrapItem>
         <WrapItem><Button colorScheme="gray.500">Button</Button></WrapItem>
         <WrapItem><Button colorScheme="gray.600">Button</Button></WrapItem>
         <WrapItem><Button colorScheme="gray.700">Button</Button></WrapItem>
         <WrapItem><Button colorScheme="gray.800">Button</Button></WrapItem>
         <WrapItem><Button colorScheme="gray.900">Button</Button></WrapItem>
      </Wrap>
   </SimpleGrid>
)


export const variantSecondary = () => (
   <SimpleGrid gap="10px">
      <Wrap>
         <WrapItem><Button variant="secondary" colorScheme="blue.100">Button</Button></WrapItem>
         <WrapItem><Button variant="secondary" colorScheme="blue.200">Button</Button></WrapItem>
         <WrapItem><Button variant="secondary" colorScheme="blue.300">Button</Button></WrapItem>
         <WrapItem><Button variant="secondary" colorScheme="blue.400">Button</Button></WrapItem>
         <WrapItem><Button variant="secondary" colorScheme="blue.500">Button</Button></WrapItem>
         <WrapItem><Button variant="secondary" colorScheme="blue.600">Button</Button></WrapItem>
         <WrapItem><Button variant="secondary" colorScheme="blue.700">Button</Button></WrapItem>
         <WrapItem><Button variant="secondary" colorScheme="blue.800">Button</Button></WrapItem>
         <WrapItem><Button variant="secondary" colorScheme="blue.900">Button</Button></WrapItem>
      </Wrap>
      <Wrap>
         <WrapItem><Button variant="secondary" colorScheme="red.100">Button</Button></WrapItem>
         <WrapItem><Button variant="secondary" colorScheme="red.200">Button</Button></WrapItem>
         <WrapItem><Button variant="secondary" colorScheme="red.300">Button</Button></WrapItem>
         <WrapItem><Button variant="secondary" colorScheme="red.400">Button</Button></WrapItem>
         <WrapItem><Button variant="secondary" colorScheme="red.500">Button</Button></WrapItem>
         <WrapItem><Button variant="secondary" colorScheme="red.600">Button</Button></WrapItem>
         <WrapItem><Button variant="secondary" colorScheme="red.700">Button</Button></WrapItem>
         <WrapItem><Button variant="secondary" colorScheme="red.800">Button</Button></WrapItem>
         <WrapItem><Button variant="secondary" colorScheme="red.900">Button</Button></WrapItem>
      </Wrap>
      <Wrap>
         <WrapItem><Button variant="secondary" colorScheme="gray.100">Button</Button></WrapItem>
         <WrapItem><Button variant="secondary" colorScheme="gray.200">Button</Button></WrapItem>
         <WrapItem><Button variant="secondary" colorScheme="gray.300">Button</Button></WrapItem>
         <WrapItem><Button variant="secondary" colorScheme="gray.400">Button</Button></WrapItem>
         <WrapItem><Button variant="secondary" colorScheme="gray.500">Button</Button></WrapItem>
         <WrapItem><Button variant="secondary" colorScheme="gray.600">Button</Button></WrapItem>
         <WrapItem><Button variant="secondary" colorScheme="gray.700">Button</Button></WrapItem>
         <WrapItem><Button variant="secondary" colorScheme="gray.800">Button</Button></WrapItem>
         <WrapItem><Button variant="secondary" colorScheme="gray.900">Button</Button></WrapItem>
      </Wrap>
   </SimpleGrid>
)

export const variantOutline = () => (
   <SimpleGrid gap="10px">
      <Wrap>
         <WrapItem><Button variant="outline" colorScheme="blue.100">Button</Button></WrapItem>
         <WrapItem><Button variant="outline" colorScheme="blue.200">Button</Button></WrapItem>
         <WrapItem><Button variant="outline" colorScheme="blue.300">Button</Button></WrapItem>
         <WrapItem><Button variant="outline" colorScheme="blue.400">Button</Button></WrapItem>
         <WrapItem><Button variant="outline" colorScheme="blue.500">Button</Button></WrapItem>
         <WrapItem><Button variant="outline" colorScheme="blue.600">Button</Button></WrapItem>
         <WrapItem><Button variant="outline" colorScheme="blue.700">Button</Button></WrapItem>
         <WrapItem><Button variant="outline" colorScheme="blue.800">Button</Button></WrapItem>
         <WrapItem><Button variant="outline" colorScheme="blue.900">Button</Button></WrapItem>
      </Wrap>
      <Wrap>
         <WrapItem><Button variant="outline" colorScheme="red.100">Button</Button></WrapItem>
         <WrapItem><Button variant="outline" colorScheme="red.200">Button</Button></WrapItem>
         <WrapItem><Button variant="outline" colorScheme="red.300">Button</Button></WrapItem>
         <WrapItem><Button variant="outline" colorScheme="red.400">Button</Button></WrapItem>
         <WrapItem><Button variant="outline" colorScheme="red.500">Button</Button></WrapItem>
         <WrapItem><Button variant="outline" colorScheme="red.600">Button</Button></WrapItem>
         <WrapItem><Button variant="outline" colorScheme="red.700">Button</Button></WrapItem>
         <WrapItem><Button variant="outline" colorScheme="red.800">Button</Button></WrapItem>
         <WrapItem><Button variant="outline" colorScheme="red.900">Button</Button></WrapItem>
      </Wrap>
      <Wrap>
         <WrapItem><Button variant="outline" colorScheme="gray.100">Button</Button></WrapItem>
         <WrapItem><Button variant="outline" colorScheme="gray.200">Button</Button></WrapItem>
         <WrapItem><Button variant="outline" colorScheme="gray.300">Button</Button></WrapItem>
         <WrapItem><Button variant="outline" colorScheme="gray.400">Button</Button></WrapItem>
         <WrapItem><Button variant="outline" colorScheme="gray.500">Button</Button></WrapItem>
         <WrapItem><Button variant="outline" colorScheme="gray.600">Button</Button></WrapItem>
         <WrapItem><Button variant="outline" colorScheme="gray.700">Button</Button></WrapItem>
         <WrapItem><Button variant="outline" colorScheme="gray.800">Button</Button></WrapItem>
         <WrapItem><Button variant="outline" colorScheme="gray.900">Button</Button></WrapItem>
      </Wrap>
   </SimpleGrid>
)

export const variantGhost = () => (
   <SimpleGrid gap="10px">
      <Wrap>
         <WrapItem><Button variant="ghost" colorScheme="blue.100">Button</Button></WrapItem>
         <WrapItem><Button variant="ghost" colorScheme="blue.200">Button</Button></WrapItem>
         <WrapItem><Button variant="ghost" colorScheme="blue.300">Button</Button></WrapItem>
         <WrapItem><Button variant="ghost" colorScheme="blue.400">Button</Button></WrapItem>
         <WrapItem><Button variant="ghost" colorScheme="blue.500">Button</Button></WrapItem>
         <WrapItem><Button variant="ghost" colorScheme="blue.600">Button</Button></WrapItem>
         <WrapItem><Button variant="ghost" colorScheme="blue.700">Button</Button></WrapItem>
         <WrapItem><Button variant="ghost" colorScheme="blue.800">Button</Button></WrapItem>
         <WrapItem><Button variant="ghost" colorScheme="blue.900">Button</Button></WrapItem>
      </Wrap>
      <Wrap>
         <WrapItem><Button variant="ghost" colorScheme="red.100">Button</Button></WrapItem>
         <WrapItem><Button variant="ghost" colorScheme="red.200">Button</Button></WrapItem>
         <WrapItem><Button variant="ghost" colorScheme="red.300">Button</Button></WrapItem>
         <WrapItem><Button variant="ghost" colorScheme="red.400">Button</Button></WrapItem>
         <WrapItem><Button variant="ghost" colorScheme="red.500">Button</Button></WrapItem>
         <WrapItem><Button variant="ghost" colorScheme="red.600">Button</Button></WrapItem>
         <WrapItem><Button variant="ghost" colorScheme="red.700">Button</Button></WrapItem>
         <WrapItem><Button variant="ghost" colorScheme="red.800">Button</Button></WrapItem>
         <WrapItem><Button variant="ghost" colorScheme="red.900">Button</Button></WrapItem>
      </Wrap>
      <Wrap>
         <WrapItem><Button variant="ghost" colorScheme="gray.100">Button</Button></WrapItem>
         <WrapItem><Button variant="ghost" colorScheme="gray.200">Button</Button></WrapItem>
         <WrapItem><Button variant="ghost" colorScheme="gray.300">Button</Button></WrapItem>
         <WrapItem><Button variant="ghost" colorScheme="gray.400">Button</Button></WrapItem>
         <WrapItem><Button variant="ghost" colorScheme="gray.500">Button</Button></WrapItem>
         <WrapItem><Button variant="ghost" colorScheme="gray.600">Button</Button></WrapItem>
         <WrapItem><Button variant="ghost" colorScheme="gray.700">Button</Button></WrapItem>
         <WrapItem><Button variant="ghost" colorScheme="gray.800">Button</Button></WrapItem>
         <WrapItem><Button variant="ghost" colorScheme="gray.900">Button</Button></WrapItem>
      </Wrap>
   </SimpleGrid>
)

export const variantLink = () => (
   <SimpleGrid gap="10px">
      <Wrap>
         <WrapItem><Button variant="link" colorScheme="blue.100">Button</Button></WrapItem>
         <WrapItem><Button variant="link" colorScheme="blue.200">Button</Button></WrapItem>
         <WrapItem><Button variant="link" colorScheme="blue.300">Button</Button></WrapItem>
         <WrapItem><Button variant="link" colorScheme="blue.400">Button</Button></WrapItem>
         <WrapItem><Button variant="link" colorScheme="blue.500">Button</Button></WrapItem>
         <WrapItem><Button variant="link" colorScheme="blue.600">Button</Button></WrapItem>
         <WrapItem><Button variant="link" colorScheme="blue.700">Button</Button></WrapItem>
         <WrapItem><Button variant="link" colorScheme="blue.800">Button</Button></WrapItem>
         <WrapItem><Button variant="link" colorScheme="blue.900">Button</Button></WrapItem>
      </Wrap>
      <Wrap>
         <WrapItem><Button variant="link" colorScheme="red.100">Button</Button></WrapItem>
         <WrapItem><Button variant="link" colorScheme="red.200">Button</Button></WrapItem>
         <WrapItem><Button variant="link" colorScheme="red.300">Button</Button></WrapItem>
         <WrapItem><Button variant="link" colorScheme="red.400">Button</Button></WrapItem>
         <WrapItem><Button variant="link" colorScheme="red.500">Button</Button></WrapItem>
         <WrapItem><Button variant="link" colorScheme="red.600">Button</Button></WrapItem>
         <WrapItem><Button variant="link" colorScheme="red.700">Button</Button></WrapItem>
         <WrapItem><Button variant="link" colorScheme="red.800">Button</Button></WrapItem>
         <WrapItem><Button variant="link" colorScheme="red.900">Button</Button></WrapItem>
      </Wrap>
      <Wrap>
         <WrapItem><Button variant="link" colorScheme="gray.100">Button</Button></WrapItem>
         <WrapItem><Button variant="link" colorScheme="gray.200">Button</Button></WrapItem>
         <WrapItem><Button variant="link" colorScheme="gray.300">Button</Button></WrapItem>
         <WrapItem><Button variant="link" colorScheme="gray.400">Button</Button></WrapItem>
         <WrapItem><Button variant="link" colorScheme="gray.500">Button</Button></WrapItem>
         <WrapItem><Button variant="link" colorScheme="gray.600">Button</Button></WrapItem>
         <WrapItem><Button variant="link" colorScheme="gray.700">Button</Button></WrapItem>
         <WrapItem><Button variant="link" colorScheme="gray.800">Button</Button></WrapItem>
         <WrapItem><Button variant="link" colorScheme="gray.900">Button</Button></WrapItem>
      </Wrap>
   </SimpleGrid>
)


export const withIcon = () => (
   <HStack>
      <Button leftIcon={<BiCart />} colorScheme="blue.500">Button</Button>
      <Button rightIcon={<BiBell />} colorScheme="#9D53D0">Button</Button>
      <Button leftIcon={<BiCart />} variant="outline" colorScheme="blue.500">Button</Button>
      <Button leftIcon={<BiCart />} variant="secondary" colorScheme="blue.500">Button</Button>
      <Button leftIcon={<BiCart />} variant="ghost" colorScheme="blue.500">Button</Button>
      <Button leftIcon={<BiCart />} variant="link" colorScheme="blue.500">Button</Button>
   
   </HStack>
)


export const Disabled = () => (
   <HStack>
      <Button colorScheme="blue.500" disabled>Button</Button>
      <Button colorScheme="red.500" disabled>Button</Button>
   </HStack>
)


export const Loading = () => (
   <HStack>
      <Button colorScheme="blue.500" isLoading>Button</Button>
      <Button colorScheme="blue.500" isLoading loadingText="Submitting...">Button</Button>
   </HStack>
)


export const Grouping = () => (
   <VStack>
      <ButtonGroup variant="outline" spacing="3">
         <Button colorScheme="blue.500">Save</Button>
         <Button>Cancel</Button>
      </ButtonGroup>
      <ButtonGroup isAttached spacing="3">
         <Button>Add</Button>
         <Button colorScheme="red.500">Remove</Button>
         <Button colorScheme="green.500">Edit</Button>
         <Button>Save</Button>
      </ButtonGroup>
      <ButtonGroup size="sm" isAttached variant="outline">
         <Button mr="-px">Save</Button>
         <IconButton aria-label="Add to friends" icon={<BiPlus />} />
      </ButtonGroup>
   </VStack>
)
