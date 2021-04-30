import { CloseButton } from "../chalk/Components/CloseButton"
import React           from "react"
import { Stack }       from '../chalk/Components/Layout/Stack'

export default {
   title: 'Forms/CloseButton',
   components: [CloseButton],
   subcomponents: { CloseButton },
}

export const Base = () => (
   <CloseButton />
)

export const Sizes = () => (
   <Stack direction="row" spacing={6}>
      <CloseButton size="sm" />
      <CloseButton size="md" />
      <CloseButton size="lg" />
   </Stack>
)
