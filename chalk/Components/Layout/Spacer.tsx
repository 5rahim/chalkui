import { chalk, HTMLChalkProps } from '../../System'

export interface SpacerProps extends HTMLChalkProps<"div"> {}

/**
 * A flexible flex spacer that expands along the major axis of its containing flex layout.
 * It renders a `div` by default, and takes up any available space.
 */
export const Spacer = chalk("div", {
   baseStyle: {
      flex: 1,
      justifySelf: "stretch",
      alignSelf: "stretch",
   },
})
