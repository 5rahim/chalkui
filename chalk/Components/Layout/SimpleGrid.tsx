import { Grid, GridProps }                 from './Grid'
import { ResponsiveValue }                 from '../../StyledSystem'
import { forwardRef, useTheme }            from '../../System'
import { isNull, isNumber, mapResponsive } from '../../Utils'
import React                               from 'react'

interface SimpleGridOptions {
   /**
    * The width at which child elements will break into columns. Pass a number for pixel values or a string for any other valid CSS length.
    */
   minChildWidth?: GridProps["minWidth"]
   /**
    * The number of columns
    */
   columns?: ResponsiveValue<number>
   /**
    * The gap between the grid items
    */
   spacing?: GridProps["gridGap"]
   /**
    * The column gap between the grid items
    */
   spacingX?: GridProps["gridGap"]
   /**
    * The row gap between the grid items
    */
   spacingY?: GridProps["gridGap"]
}

export interface SimpleGridProps extends GridProps, SimpleGridOptions {
}

/**
 * SimpleGrid
 *
 * React component make that providers a simpler interface, and
 * make its easy to create responsive grid layouts.
 */
export const SimpleGrid = forwardRef<SimpleGridProps, "div">((props, ref) => {
   const { columns, spacingX, spacingY, spacing, minChildWidth, ...rest } = props
   
   const theme = useTheme()
   
   const templateColumns = minChildWidth ? widthToColumns(minChildWidth) : countToColumns(columns)
   
   return (
      <Grid
         // @ts-ignore
         ref={ref}
         gap={spacing}
         columnGap={spacingX}
         rowGap={spacingY}
         templateColumns={templateColumns}
         theme={theme}
         {...rest}
      />
   )
})

function toPx(n: string | number) {
   return isNumber(n) ? `${n}px` : n
}

function widthToColumns(width: any) {
   return mapResponsive(width, (value) =>
      isNull(value) ? null : `repeat(auto-fit, minmax(${toPx(value)}, 1fr))`,
   )
}

function countToColumns(count: any) {
   return mapResponsive(count, (value) =>
      isNull(value) ? null : `repeat(${value}, 1fr)`,
   )
}
