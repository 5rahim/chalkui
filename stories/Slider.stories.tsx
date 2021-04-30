import {
   Slider,
   SliderFilledTrack,
   SliderThumb,
   SliderTrack,
}                   from "../chalk/Components/Slider"
import { Box }      from "../chalk/Components/Layout/Box"
import { Stack }    from "../chalk/Components/Layout/Stack"
import { Text }     from "../chalk/Components/Typography/Text"
import React        from "react"
import { BiVolume } from 'react-icons/all'

export default {
   title: 'Forms/Slider',
   components: [Slider],
   subcomponents: { Slider },
}

export const Base = () => (
   <Slider aria-label="slider-ex-1" defaultValue={30}>
      <SliderTrack>
         <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
   </Slider>
)

export const Vertical = () => (
   <Slider
      aria-label="slider-ex-3"
      defaultValue={30}
      orientation="vertical"
      minH="32"
   >
      <SliderTrack>
         <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
   </Slider>
)


export const Custom = () => (
   <Slider aria-label="slider-ex-4" defaultValue={30}>
      <SliderTrack bg="red.100">
         <SliderFilledTrack bg="tomato" />
      </SliderTrack>
      <SliderThumb boxSize={6}>
         <Box color="tomato" as={BiVolume} />
      </SliderThumb>
   </Slider>
)


export const Step = () => (
   <Slider defaultValue={60} min={0} max={300} step={30}>
      <SliderTrack bg="red.100">
         <Box position="relative" right={10} />
         <SliderFilledTrack bg="tomato" />
      </SliderTrack>
      <SliderThumb boxSize={6} />
   </Slider>
)
