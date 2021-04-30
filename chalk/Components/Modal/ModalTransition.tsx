import { HTMLMotionProps, motion }          from "framer-motion"
import * as React                           from "react"
import { chalk, ChalkProps }                from '../../System'
import { scaleFadeConfig, slideFadeConfig } from '../Transition'
import theme                                from '../../Theme'

export interface ModalTransitionProps
   extends Omit<HTMLMotionProps<"section">, "color" | "transition">,
      ChalkProps {
   preset: "slideInBottom" | "slideInRight" | "scale" | "none"
}

const transitions = {
   slideInBottom: {
      ...slideFadeConfig,
      custom: { offsetY: 16, reverse: true },
   },
   slideInRight: {
      ...slideFadeConfig,
      custom: { offsetX: 16, reverse: true },
   },
   scale: {
      ...scaleFadeConfig,
      custom: { initialScale: 0.95, reverse: true },
   },
   none: {},
}


const Motion = chalk(motion.section)

export const ModalTransition = React.forwardRef(
   (props: ModalTransitionProps, ref: React.Ref<any>) => {
      const { preset, ...rest } = props
      const motionProps = transitions[preset]
      return <Motion ref={ref} {...(motionProps as ChalkProps)} theme={theme} {...rest} />
   },
)
