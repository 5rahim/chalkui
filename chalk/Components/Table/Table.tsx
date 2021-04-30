import * as React from "react"
import {
   chalk, forwardRef, HTMLChalkProps, omitThemingProps,
   StylesProvider, ThemingProps, useMultiStyleConfig, useStyles, useTheme,
} from '../../System'
import { cx }     from '../../Utils'

export interface TableProps
   extends HTMLChalkProps<"table">,
      ThemingProps<"Table"> {
}

export const Table = forwardRef<TableProps, "table">((props, ref) => {
   const theme = useTheme()
   const styles = useMultiStyleConfig("Table", props)
   const { className, ...tableProps } = omitThemingProps(props)
   
   return (
      <StylesProvider value={styles}>
         <chalk.table
            role="table"
            ref={ref}
            __css={styles.table}
            className={cx("chalk-table", className)}
            theme={theme}
            {...tableProps}
         />
      </StylesProvider>
   )
})



export interface TableCaptionProps extends HTMLChalkProps<"caption"> {
   /**
    * The placement of the table caption. This sets the `caption-side` CSS attribute.
    * @default "bottom"
    */
   placement?: "top" | "bottom"
}

export const TableCaption = forwardRef<TableCaptionProps, "caption">(
   (props, ref) => {
      const theme = useTheme()
      const { placement = "bottom", ...rest } = props
      const styles = useStyles()
      return (
         <chalk.caption
            {...rest}
            ref={ref}
            theme={theme}
            __css={{
               ...styles.caption,
               captionSide: placement,
            }}
         />
      )
   },
)



export interface TableHeadProps extends HTMLChalkProps<"thead"> {
}

export const Thead = forwardRef<TableHeadProps, "thead">((props, ref) => {
   const theme = useTheme()
   const styles = useStyles()
   return <chalk.thead {...props} ref={ref} __css={styles.thead} theme={theme} />
})

export interface TableBodyProps extends HTMLChalkProps<"tbody"> {
}

export const Tbody = forwardRef<TableBodyProps, "tbody">((props, ref) => {
   const theme = useTheme()
   const styles = useStyles()
   return <chalk.tbody {...props} ref={ref} __css={styles.tbody} theme={theme} />
})

export interface TableFooterProps extends HTMLChalkProps<"tfoot"> {
}

export const Tfoot = forwardRef<TableFooterProps, "tfoot">((props, ref) => {
   const theme = useTheme()
   const styles = useStyles()
   return <chalk.tfoot {...props} ref={ref} __css={styles.tfoot} them={theme} />
})

export interface TableColumnHeaderProps extends HTMLChalkProps<"th"> {
   /**
    * Aligns the cell content to the right
    */
   isNumeric?: boolean
}

export const Th = forwardRef<TableColumnHeaderProps, "th">(
   ({ isNumeric, ...rest }, ref) => {
      const theme = useTheme()
      const styles = useStyles()
      return (
         <chalk.th
            {...rest}
            ref={ref}
            __css={styles.th}
            data-is-numeric={isNumeric}
            theme={theme}
         />
      )
   },
)

export interface TableRowProps extends HTMLChalkProps<"tr"> {
}

export const Tr = forwardRef<TableRowProps, "tr">((props, ref) => {
   const theme = useTheme()
   const styles = useStyles()
   
   return <chalk.tr role="row" {...props} ref={ref} __css={styles.tr} theme={theme} />
})

export interface TableCellProps extends HTMLChalkProps<"td"> {
   /**
    * Aligns the cell content to the right
    */
   isNumeric?: boolean
}

export const Td = forwardRef<TableCellProps, "td">(
   ({ isNumeric, ...rest }, ref) => {
      const theme = useTheme()
      const styles = useStyles()
      
      return (
         <chalk.td
            role="gridcell"
            {...rest}
            ref={ref}
            __css={styles.td}
            data-is-numeric={isNumeric}
            theme={theme}
         />
      )
   },
)
