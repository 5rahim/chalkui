import {
   PinInput,
   PinInputField,
}               from "../chalk/Components/PinInput"
import {
   HStack,
}               from "../chalk/Components/Layout/Stack"
import React    from "react"

export default {
   title: 'Forms/PinInput',
   components: [PinInput],
   subcomponents: { PinInput },
}

export const Base = () => (
   <HStack>
      <PinInput>
         <PinInputField />
         <PinInputField />
         <PinInputField />
         <PinInputField />
      </PinInput>
   </HStack>
)
