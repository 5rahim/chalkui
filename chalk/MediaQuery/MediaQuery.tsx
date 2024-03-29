import { useTheme }      from "../System"
import {
   Dict,
   memoizedGet as get,
}                        from "../Utils"
import * as React        from "react"
import { useMediaQuery } from "./use-media-query"

interface VisibilityProps {
   breakpoint: string
   hide?: boolean
   children: React.ReactNode
}

/**
 * Visibility
 *
 * React component to control the visibility of its
 * children based on the current breakpoint
 */
const Visibility: React.FC<VisibilityProps> = (props) => {
   const { breakpoint, hide, children } = props
   const [show] = useMediaQuery(breakpoint)
   const isVisible = hide ? !show : show
   
   const rendered = isVisible ? children : null
   return rendered as React.ReactElement
}

export type HideProps = ShowProps

export const Hide: React.FC<HideProps> = (props) => {
   const { children } = props
   const query = useQuery(props)
   return (
      <Visibility breakpoint={query} hide>
         {children}
      </Visibility>
   )
}



export interface ShowProps {
   breakpoint?: string
   below?: string
   above?: string
   children?: React.ReactNode
}

export const Show: React.FC<ShowProps> = (props) => {
   const { children } = props
   const query = useQuery(props)
   return <Visibility breakpoint={query}>{children}</Visibility>
}



const getBreakpoint = (theme: Dict, value: any) =>
   get(theme, `breakpoints.${value}`, value)

export interface UseQueryProps {
   breakpoint?: string
   below?: string
   above?: string
}

export function useQuery(props: UseQueryProps) {
   const { breakpoint = "", below, above } = props
   
   const theme = useTheme()
   const bpBelow = getBreakpoint(theme, below)
   const bpAbove = getBreakpoint(theme, above)
   
   let query = breakpoint
   
   if (bpBelow) {
      query = `(max-width: ${bpBelow})`
   } else if (bpAbove) {
      query = `(min-width: ${bpAbove})`
   }
   
   return query
}
