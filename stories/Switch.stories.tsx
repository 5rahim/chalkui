import { Switch }      from "../chalk/Components/Switch"
import { Box }         from "../chalk/Components/Layout/Box"
import { Stack }       from "../chalk/Components/Layout/Stack"
import { Text }        from "../chalk/Components/Typography/Text"
import React           from "react"
import {
   FormControl,
   FormLabel,
} from '../chalk/Components/FormControl'

export default {
   title: 'Forms/Switch',
   components: [Switch],
   subcomponents: { Switch },
}

export const Base = () => (
   <FormControl display="flex" alignItems="center">
      <FormLabel htmlFor="email-alerts" mb="0" mr={2}>
         Enable email alerts?
      </FormLabel>
      <Switch id="email-alerts" />
   </FormControl>
)
