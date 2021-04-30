import React, { useState }                                     from 'react'
import { AnimatePresence, motion, AnimationProps, Transition } from 'framer-motion'
import VisibilitySensor                                        from 'react-visibility-sensor'
import { mergeProps }                                          from '../../Utils'
import { Box }                                                 from '../Layout/Box'


interface OnScrollProps {
   offset?: { top?: number; bottom?: number }
}

export interface AnimationComponentProps extends AnimationProps {
   /**
    * Is inline
    */
   isInline?: boolean
   /**
    * Styling
    */
   sx?: any
   /**
    * Children
    */
   children?: React.ReactNode
}

interface FramerAnimationProps {
   transition?: any
   withTrigger?: any
   item?: any
   onScroll?: OnScrollProps
}

interface MotionFunctionProps extends AnimationProps {
   /**
    * If `true`, the element is inline
    */
   isInline?: boolean
   /**
    * Styling
    */
   sx?: any
   
   transition?: Transition
   
   flag?: any
   
   children?: React.ReactNode
   
   onAnimationComplete?: () => void
   
   layout?: boolean
}

export const framerAnimation: any = (props: FramerAnimationProps) => {
   const { withTrigger, item, onScroll } = props
   
   const MotionWithTrigger: React.FC<MotionFunctionProps> = (cprops) => {
      const { isInline = false, flag, children, sx, onAnimationComplete, ...motionProps } = cprops
      
      const { initial = 'visible', ...rest } = withTrigger
      // The component transition props will overwrite the default transition props
      const finalProps = mergeProps(rest, motionProps)
      
      return (
         <AnimatePresence>
            <Box as="span" sx={sx}>
               <motion.span
                  initial={initial}
                  style={{ display: isInline ? 'inline-block' : 'block' }}
                  animate={flag ? 'visible' : 'hidden'}
                  onAnimationComplete={onAnimationComplete}
                  {...finalProps}
               >
                  {children}
               </motion.span>
            </Box>
         </AnimatePresence>
      )
   }
   
   const MotionItem: React.FC<MotionFunctionProps> = (cprops) => {
      const { isInline = false, flag, children, sx, ...motionProps } = cprops
      
      const finalProps = mergeProps(motionProps, item)
      
      return (
         <Box as="span" sx={sx}>
            <motion.span
               style={{ display: isInline ? 'inline-block' : 'block' }}
               // layout
               {...finalProps}
            >
               {children}
            </motion.span>
         </Box>
      )
   }
   
   const MotionOnScroll: React.FC<MotionFunctionProps> = (cprops) => {
      const [isActive, setActive] = useState<boolean>(true)
      
      const { isInline = false, flag, children, sx, ...motionProps } = cprops
      
      const { initial = 'visible', ...rest } = withTrigger
      
      const finalProps = mergeProps(rest, motionProps)
      
      return (
         <VisibilitySensor delayedCall active={isActive} onChange={(isVisible) => setActive(!isVisible)} {...onScroll}>
            {({ isVisible }) => (
               <Box as="span" sx={sx}>
                  <motion.span
                     initial={initial}
                     style={{ display: isInline ? 'inline-block' : 'block' }}
                     animate={!isVisible ? 'visible' : 'hidden'}
                     {...finalProps}
                  >
                     {children}
                  </motion.span>
               </Box>
            )}
         </VisibilitySensor>
      )
   }
   
   return [MotionWithTrigger, MotionItem, MotionOnScroll]
}
