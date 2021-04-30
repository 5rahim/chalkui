import { Image, Img } from "../chalk/Components/Image"
import { Box }        from "../chalk/Components/Layout/Box"
import React     from "react"

export default {
   title: 'Components/Image',
   components: [Image],
   subcomponents: { Image },
}

export const Base = () => (
   <Box width="400px">
      <Image src="https://imgur.com/cUVOUXz.png" fallbackSrc={'https://via.placeholder.com/400'}  alt="Bojack Horseman" />
   </Box>
)

export const withFallback = () => (
   <Box width="400px">
      <Image src="unknown.png" fallbackSrc={'https://via.placeholder.com/150'} alt="Bojack Horseman" />
   </Box>
)

export const withSSR = () => (
   <Box width="400px">
      <Img src="https://imgur.com/cUVOUXz.png" alt="Bojack Horseman" />
   </Box>
)
