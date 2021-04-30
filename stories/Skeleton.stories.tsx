import { Skeleton, SkeletonCircle, SkeletonText } from "../chalk/Components/Skeleton"
import { Box }                                    from "../chalk/Components/Layout/Box"
import { Stack }                                  from "../chalk/Components/Layout/Stack"
import { Text }            from "../chalk/Components/Typography/Text"
import React, { useState } from "react"
import { Button }          from '../chalk/Components/Button'

export default {
   title: 'Feedback/Skeleton',
   components: [Skeleton],
   subcomponents: { Skeleton },
}

export const Base = () => (
   <Stack>
      <Skeleton height="10px" />
      <Skeleton height="10px" />
      <Skeleton height="10px" />
      <Skeleton height="10px" />
      <Skeleton height="10px" />
      <Skeleton height="10px" />
   </Stack>
)


export const HiddenText = () => {
   const [isLoaded, setIsLoaded] = useState(false)
   return (
      <>
         <Skeleton isLoaded={true}>
            <div>Contents wrapped</div>
            <div>Won't be visible</div>
         </Skeleton>
      </>
   )
}


export const CircleAndText = () => (
   <Box padding="6" boxShadow="sm" bg="white">
      <SkeletonCircle size="10" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" />
   </Box>
)


export const Color = () => (
   <Skeleton startColor="pink.500" endColor="orange.500" height="10px" />
)
