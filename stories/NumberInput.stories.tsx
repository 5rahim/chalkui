import {
   NumberDecrementStepper,
   NumberIncrementStepper,
   NumberInput,
   NumberInputField,
   NumberInputStepper,
   useNumberInput,
}                 from "../chalk/Components/NumberInput"
import { Box }    from "../chalk/Components/Layout/Box"
import {
   HStack,
   Stack,
}                 from "../chalk/Components/Layout/Stack"
import { Text }   from "../chalk/Components/Typography/Text"
import React      from "react"
import { Button } from '../chalk/Components/Button'
import { Input }  from '../chalk/Components/Input'

export default {
   title: 'Forms/NumberInput',
   components: [NumberInput],
   subcomponents: { NumberInput },
}

export const Base = () => (
   <NumberInput allowMouseWheel>
      <NumberInputField />
      <NumberInputStepper>
         <NumberIncrementStepper />
         <NumberDecrementStepper />
      </NumberInputStepper>
   </NumberInput>
)

export const MaxAndMin = () => (
   <NumberInput defaultValue={15} min={10} max={20}>
      <NumberInputField />
      <NumberInputStepper>
         <NumberIncrementStepper />
         <NumberDecrementStepper />
      </NumberInputStepper>
   </NumberInput>
)

export const Step = () => (
   <NumberInput step={5} defaultValue={15} min={10} max={30}>
      <NumberInputField />
      <NumberInputStepper>
         <NumberIncrementStepper />
         <NumberDecrementStepper />
      </NumberInputStepper>
   </NumberInput>
)


export const Precision = () => (
   <NumberInput defaultValue={15} precision={2} step={0.2}>
      <NumberInputField />
      <NumberInputStepper>
         <NumberIncrementStepper />
         <NumberDecrementStepper />
      </NumberInputStepper>
   </NumberInput>
)


export const DontClamp = () => (
   <NumberInput defaultValue={15} max={30} clampValueOnBlur={false}>
      <NumberInputField />
      <NumberInputStepper>
         <NumberIncrementStepper />
         <NumberDecrementStepper />
      </NumberInputStepper>
   </NumberInput>
)

export const AllowOutOfRange = () => (
   <NumberInput
      defaultValue={15}
      max={10}
      keepWithinRange={false}
      clampValueOnBlur={false}
   >
      <NumberInputField />
      <NumberInputStepper>
         <NumberIncrementStepper />
         <NumberDecrementStepper />
      </NumberInputStepper>
   </NumberInput>
)


export const Formatting = () => {
   const format = (val: any) => `$` + val
   const parse = (val: any) => val.replace(/^\$/, "")
   
   const [value, setValue] = React.useState("1.53")
   
   return (
      <NumberInput
         onChange={(valueString) => setValue(parse(valueString))}
         value={format(value)}
         max={50}
      >
         <NumberInputField />
         <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
         </NumberInputStepper>
      </NumberInput>
   )
}


export const Mobile = () => {
   const {
      getInputProps,
      getIncrementButtonProps,
      getDecrementButtonProps,
   } = useNumberInput({
      step: 0.01,
      defaultValue: 1.53,
      min: 1,
      max: 6,
      precision: 2,
   })
   
   const inc = getIncrementButtonProps()
   const dec = getDecrementButtonProps()
   // @ts-ignore
   const input = getInputProps({ isReadOnly: true })
   
   return (
      <HStack maxW="320px">
         <Button variant="secondary" {...inc}>+</Button>
         <Input {...input} />
         <Button variant="secondary" {...dec}>-</Button>
      </HStack>
   )
}
