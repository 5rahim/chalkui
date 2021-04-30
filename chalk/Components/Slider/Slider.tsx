import {
   chalk,
   forwardRef,
   omitThemingProps,
   StylesProvider,
   SystemStyleObject,
   ThemingProps,
   useMultiStyleConfig,
   useStyles,
   HTMLChalkProps,
   useTheme,
}                        from "../../System"
import { cx }            from "../../Utils"
import { createContext } from "../ReactUtils"
import * as React        from "react"
import {
   useSlider,
   UseSliderProps,
   UseSliderReturn,
}                        from "./UseSlider"

interface SliderContext
   extends Omit<UseSliderReturn, "getInputProps" | "getRootProps"> {
}

const [SliderProvider, useSliderContext] = createContext<SliderContext>({
   name: "SliderContext",
   errorMessage:
      "useSliderContext: `context` is undefined. Seems you forgot to wrap all slider components within <Slider />",
})

export {
   SliderProvider,
   useSliderContext,
}

type Omitted = "size" | "defaultValue" | "onChange"

export interface SliderProps
   extends UseSliderProps,
      ThemingProps<"Slider">,
      Omit<HTMLChalkProps<"div">, Omitted> {
}

/**
 * The Slider is used to allow users to make selections from a range of values.
 * It provides context and functionality for all slider components
 */
export const Slider = forwardRef<SliderProps, "div">((props, ref) => {
   const styles = useMultiStyleConfig("Slider", props)
   const realProps = omitThemingProps(props)
   const theme = useTheme()
   const { getInputProps, getRootProps, ...context } = useSlider(realProps)
   
   const rootProps = getRootProps()
   const inputProps = getInputProps({}, ref)
   
   const rootStyles: SystemStyleObject = {
      display: "inline-block",
      position: "relative",
      cursor: "pointer",
      ...styles.container,
   }
   
   return (
      <SliderProvider value={context}>
         <StylesProvider value={styles}>
            <chalk.div theme={theme} {...rootProps} className="chalk-slider" __css={rootStyles}>
               {props.children}
               <input {...inputProps} />
            </chalk.div>
         </StylesProvider>
      </SliderProvider>
   )
})

Slider.defaultProps = {
   orientation: "horizontal",
}


export interface SliderThumbProps extends HTMLChalkProps<"div"> {
}

/**
 * Slider component that acts as the handle used to select predefined
 * values by dragging its handle along the track
 */
export const SliderThumb = forwardRef<SliderThumbProps, "div">((props, ref) => {
   const { getThumbProps } = useSliderContext()
   const theme = useTheme()
   const styles = useStyles()
   
   const thumbStyles: SystemStyleObject = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      outline: 0,
      ...styles.thumb,
   }
   
   const thumbProps = getThumbProps(props, ref)
   
   return (
      <chalk.div
         theme={theme}
         {...thumbProps}
         className={cx("chalk-slider__thumb", props.className)}
         __css={thumbStyles}
      />
   )
})


export interface SliderTrackProps extends HTMLChalkProps<"div"> {
}

export const SliderTrack = forwardRef<SliderTrackProps, "div">((props, ref) => {
   const { getTrackProps } = useSliderContext()
   const theme = useTheme()
   const styles = useStyles()
   const trackStyles = {
      overflow: "hidden",
      ...styles.track,
   }
   
   const trackProps = getTrackProps(props, ref)
   
   return (
      <chalk.div
         theme={theme}
         {...trackProps}
         className={cx("chalk-slider__track", props.className)}
         __css={trackStyles}
      />
   )
})


export interface SliderInnerTrackProps extends HTMLChalkProps<"div"> {
}

export const SliderFilledTrack = forwardRef<SliderInnerTrackProps, "div">(
   (props, ref) => {
      const { getInnerTrackProps } = useSliderContext()
      const theme = useTheme()
      const styles = useStyles()
      const trackStyles = {
         width: "inherit",
         height: "inherit",
         ...styles.filledTrack,
      }
      
      const trackProps = getInnerTrackProps(props, ref)
      
      return (
         <chalk.div
            theme={theme}
            {...trackProps}
            className="chalk-slider__filled-track"
            __css={trackStyles}
         />
      )
   },
)


export interface SliderMarkProps extends HTMLChalkProps<"div"> {
   value: number
}

/**
 * SliderMark is used to provide names for specific Slider
 * values by defining labels or markers along the track.
 */
export const SliderMark = forwardRef<SliderMarkProps, "div">((props, ref) => {
   const { getMarkerProps } = useSliderContext()
   const markProps = getMarkerProps(props, ref)
   const theme = useTheme()
   return (
      <chalk.div
         theme={theme}
         {...markProps}
         className={cx("chalk-slider__marker", props.className)}
      />
   )
})
