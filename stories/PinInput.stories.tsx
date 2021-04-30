import {
   PinInput,
   PinInputField,
} from "../chalk/Components/PinInput"
import { Box }      from "../chalk/Components/Layout/Box"
import {
   HStack,
   Stack,
} from "../chalk/Components/Layout/Stack"
import { Text }     from "../chalk/Components/Typography/Text"
import React        from "react"

export default {
   title: 'Forms/PinInput',
   components: [PinInput],
   subcomponents: { PinInput },
}

export const Base = () => (
   <HStack>
      <PinInput>
         <PinInputField id={'x-1'} />
         <PinInputField id={'x-2'}/>
         <PinInputField id={'x-3'}/>
         <PinInputField id={'x-4'}/>
      </PinInput>
   </HStack>
)
