import { Textarea } from "../chalk/Components/Textarea"
import { Box }      from "../chalk/Components/Layout/Box"
import { Stack }    from "../chalk/Components/Layout/Stack"
import { Text }     from "../chalk/Components/Typography/Text"
import React        from "react"

export default {
   title: 'Forms/Textarea',
   components: [Textarea],
   subcomponents: { Textarea },
}

export const Base = () => {
   let [value, setValue] = React.useState("")
   
   let handleInputChange = (e: any) => {
      let inputValue = e.target.value
      setValue(inputValue)
   }
   return (
      <>
         <Text mb="8px">Value: {value}</Text>
         <Textarea
            value={value}
            onChange={handleInputChange}
            placeholder="Here is a sample placeholder"
            size="sm"
         />
      </>
   )
}
