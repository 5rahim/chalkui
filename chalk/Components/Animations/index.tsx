import React                                        from 'react'
import { motion }                                   from 'framer-motion'
import { AnimationComponentProps, framerAnimation } from './Animations'
import { Box }                                      from '../Layout/Box'

export const [FadeOut, FadeOutItem, FadeOutOnScroll] = framerAnimation({
   transition: {
      ease: 'easeOut',
      duration: 0.5,
   },
   withTrigger: {
      variants: {
         visible: { opacity: 1 },
         hidden: {
            opacity: 0,
            transitionEnd: {
               display: 'none',
            },
         },
      },
   },
   item: {
      animate: { opacity: 1 },
      exit: { opacity: 0 },
   },
})

export const [SlideUp, SlideUpItem, SlideUpOnScroll] = framerAnimation({
   transition: {
      ease: 'linear',
      duration: 0.5,
   },
   withTrigger: {
      variants: {
         visible: { opacity: 1, y: 0 },
         hidden: {
            opacity: 0,
            y: -30,
            transitionEnd: {
               display: 'none',
            },
         },
      },
   },
   item: {
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -30 },
   },
   onScroll: {
      offset: { bottom: 30 },
   },
})

export const [SlideDown, SlideDownItem, SlideDownOnScroll] = framerAnimation({
   transition: {
      ease: 'linear',
      duration: 0.5,
   },
   withTrigger: {
      variants: {
         visible: { opacity: 1, y: 0 },
         hidden: {
            opacity: 0,
            y: 30,
            transitionEnd: {
               display: 'none',
            },
         },
      },
   },
   item: {
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 30 },
   },
})

export const [ZoomOut, ZoomOutItem, ZoomOutOnScroll] = framerAnimation({
   transition: {
      ease: 'linear',
      duration: 0.5,
   },
   withTrigger: {
      variants: {
         visible: {
            opacity: 1, scale: 1,
         },
         hidden: {
            opacity: 0,
            scale: 0,
            transitionEnd: {
               display: 'none',
            },
         },
      },
   },
   item: {
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0 },
   },
})

export const Animation: React.FC<AnimationComponentProps> = (props: AnimationComponentProps) => {
   const { isInline = false, sx, children, ...rest } = props
   
   return (
      <Box as="span" sx={sx}>
         <motion.span
            style={{ display: isInline ? 'inline-block' : 'block' }}
            {...rest}
         >
            {children}
         </motion.span>
      </Box>
   )
}
