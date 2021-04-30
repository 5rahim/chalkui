import { CircularProgress, CircularProgressLabel } from "../chalk/Components/Progress"
import React                                       from "react"

export default {
   title: 'Feedback/CircularProgress',
   components: [CircularProgress],
   subcomponents: { CircularProgress },
}

export const Base = () => (
   <CircularProgress value={80} />
)


export const ThicknessAndColor = () => (
   <CircularProgress value={60} color="orange.400" size="100px" thickness="4px" />
)

export const withLabel = () => (
   <CircularProgress value={40} color="green.400">
      <CircularProgressLabel>40%</CircularProgressLabel>
   </CircularProgress>
)


export const Indeterminate = () => (
   <CircularProgress isIndeterminate />
)
