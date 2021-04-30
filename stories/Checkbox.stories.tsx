import {
   Checkbox,
   CheckboxGroup,
} from "../chalk/Components/Checkbox"
import { Box }      from "../chalk/Components/Layout/Box"
import {
   HStack,
   Stack,
}                   from "../chalk/Components/Layout/Stack"
import { Text }     from "../chalk/Components/Typography/Text"
import React        from "react"
import { Icon }     from '../chalk/Components/Icon'

export default {
   title: 'Forms/Checkbox',
   components: [Checkbox],
   subcomponents: { Checkbox },
}

export const Base = () => (
   <Checkbox defaultIsChecked>Checkbox</Checkbox>
)


export const Disabled = () => (
   <Stack spacing={10} direction="row">
      <Checkbox isDisabled>Checkbox</Checkbox>
      <Checkbox isDisabled defaultIsChecked>
         Checkbox
      </Checkbox>
   </Stack>
)


export const SizesAndColors = () => (
   <HStack spacing={10} direction="row">
      <Checkbox size="sm" colorScheme="red">
         Checkbox
      </Checkbox>
      <Checkbox size="md" colorScheme="green" defaultIsChecked>
         Checkbox
      </Checkbox>
      <Checkbox size="lg" colorScheme="orange" defaultIsChecked>
         Checkbox
      </Checkbox>
   </HStack>
)

export const Invalid = () => (
   <Checkbox isInvalid>Checkbox</Checkbox>
)


export const Spacing = () => (
   <Checkbox spacing="1rem">Option</Checkbox>
)


export const IconColorAndSize = () => (
   <Checkbox iconColor="blue.500" iconSize="1rem">
      Option
   </Checkbox>
)


export const Tree = () => {
   const [checkedItems, setCheckedItems] = React.useState([false, false])
   
   const allChecked = checkedItems.every(Boolean)
   const isIndeterminate = checkedItems.some(Boolean) && !allChecked
   
   return (
      <>
         <Checkbox
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
         >
            Parent Checkbox
         </Checkbox>
         <Stack pl={6} mt={1} spacing={1}>
            <Checkbox
               isChecked={checkedItems[0]}
               onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
            >
               Child Checkbox 1
            </Checkbox>
            <Checkbox
               isChecked={checkedItems[1]}
               onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
            >
               Child Checkbox 2
            </Checkbox>
         </Stack>
      </>
   )
}


export const CustomIcon = () => {
   /**
    * 1. Create a custom icon that accepts 2 props: `isIndeterminate` and `isChecked`
    */
   function CustomIcon(props: any) {
      const { isIndeterminate, isChecked, ...rest } = props
      
      const d = isIndeterminate
         ? "M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.917,1,1,0,1,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.255a1,1,0,1,1-2,0,4,4,0,1,1,5.6,3.666Z"
         : "M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z"
      
      return (
         <Icon viewBox="0 0 24 24" {...rest}>
            <path fill="currentColor" d={d} />
         </Icon>
      )
   }
   
   function CustomCheckbox() {
      return (
         <Checkbox icon={<CustomIcon />} colorScheme="cyan">
            Hello world
         </Checkbox>
      )
   }
   
   return <CustomCheckbox />
}

export const Group = () => (
   <CheckboxGroup colorScheme="green" defaultValue={["naruto", "kakashi"]}>
      <HStack>
         <Checkbox value="naruto">Naruto</Checkbox>
         <Checkbox value="sasuke">Sasuke</Checkbox>
         <Checkbox value="kakashi">kakashi</Checkbox>
      </HStack>
   </CheckboxGroup>
)
