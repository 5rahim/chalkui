import * as React                                             from "react"
import { chalk, HTMLChalkProps, SystemStyleObject, useTheme } from '../../System'
import { isUndefined, StringOrNumber }                        from '../../Utils'
import { getProgressProps, rotate, spin } from './Progress.utils'

interface CircleProps extends HTMLChalkProps<"circle"> {}

const Circle: React.FC<CircleProps> = (props) => {
   const theme = useTheme()
   return <chalk.circle cx={50} cy={50} r={42} fill="transparent" {...props} theme={theme} />
}


interface ShapeProps extends HTMLChalkProps<"svg"> {
   size?: StringOrNumber
   isIndeterminate?: boolean
}

const Shape: React.FC<ShapeProps> = (props) => {
   const { size, isIndeterminate, ...rest } = props
   const theme = useTheme()
   return (
      <chalk.svg
         viewBox="0 0 100 100"
         __css={{
            width: size,
            height: size,
            animation: isIndeterminate ? `${rotate} 2s linear infinite` : undefined,
            borderRadius: '50%'
         }}
         theme={theme}
         {...rest}
      />
   )
}


interface CircularProgressOptions {
   /**
    * The size of the circular progress in CSS units
    */
   size?: StringOrNumber
   /**
    * Maximum value defining 100% progress made (must be higher than 'min')
    */
   max?: number
   /**
    * Minimum value defining 'no progress' (must be lower than 'max')
    */
   min?: number
   /**
    * This defines the stroke width of the svg circle.
    */
   thickness?: StringOrNumber
   /**
    * Current progress (must be between min/max)
    */
   value?: number
   /**
    * If `true`, the cap of the progress indicator will be rounded.
    */
   capIsRound?: boolean
   /**
    * The content of the circular progress bar. If passed, the content will be inside and centered in the progress bar.
    */
   children?: React.ReactNode
   /**
    * The color name of the progress track. Use a color key in the theme object
    */
   trackColor?: string
   /**
    * The color of the progress indicator. Use a color key in the theme object
    */
   color?: string
   /**
    * The desired valueText to use in place of the value
    */
   valueText?: string
   /**
    * A function that returns the desired valueText to use in place of the value
    */
   getValueText?(value: number, percent: number): string
   /**
    * If `true`, the progress will be indeterminate and the `value`
    * prop will be ignored
    */
   isIndeterminate?: boolean
}

export interface CircularProgressProps extends Omit<HTMLChalkProps<"div">, "color">, CircularProgressOptions {}

/**
 * CircularProgress is used to indicate the progress of an activity.
 * It is built using `svg` and `circle` components with support for
 * theming and `indeterminate` state
 *
 */
export const CircularProgress: React.FC<CircularProgressProps> = (props) => {
   const theme = useTheme()
   const {
      size = "48px",
      max = 100,
      min = 0,
      valueText,
      getValueText,
      value,
      capIsRound = true,
      children,
      thickness = "10px",
      color = "#0078d4",
      trackColor = "#edebe9",
      isIndeterminate,
      ...rest
   } = props
   
   const progress = getProgressProps({
      min,
      max,
      value,
      valueText,
      getValueText,
      isIndeterminate,
   })
   
   const determinant = isIndeterminate
      ? undefined
      : (progress.percent ?? 0) * 2.64
   
   const strokeDasharray = isUndefined(determinant)
      ? undefined
      : `${determinant} ${264 - determinant}`
   
   const indicatorProps = isIndeterminate
      ? {
         css: { animation: `${spin} 1.5s linear infinite` },
      }
      : {
         strokeDashoffset: 66,
         strokeDasharray,
         transition: `stroke-dasharray 0.6s ease 0s, stroke 0.6s ease`,
      }
   
   const rootStyles: SystemStyleObject = {
      display: "inline-block",
      position: "relative",
      verticalAlign: "middle",
      fontSize: size,
   }
   
   return (
      <chalk.div
         className="chalk-progress"
         {...progress.bind}
         {...rest}
         __css={rootStyles}
         theme={theme}
      >
         <Shape size={size} isIndeterminate={isIndeterminate}>
            <Circle
               stroke={trackColor}
               strokeWidth={thickness}
               className="chalk-progress__track"
            />
            <Circle
               stroke={color}
               strokeWidth={thickness}
               className="chalk-progress__indicator"
               strokeLinecap={capIsRound ? "round" : undefined}
               {...indicatorProps}
            />
         </Shape>
         {children}
      </chalk.div>
   )
}



/**
 * CircularProgress component label. In most cases it is a numeric indicator
 * of the circular progress component's value
 */
export const CircularProgressLabel = chalk("div", {
   baseStyle: {
      fontWeight: "bold",
      fontSize: "0.24em",
      top: "50%",
      left: "50%",
      width: "100%",
      textAlign: "center",
      position: "absolute",
      transform: "translate(-50%, -50%)",
   },
})


export interface CircularProgressLabelProps extends HTMLChalkProps<"div"> {}
