import borders     from './Borders'
import breakpoints from './Breakpoints'
import colors      from './Colors'
import radii       from './Radii'
import shadows     from './Shadows'
import sizes       from './Sizes'
import transition  from './Transition'
import typography  from './Typography'
import zIndices    from './zIndices'
import { spacing } from './Spacing'

const Theme = {
   breakpoints,
   zIndices,
   radii,
   colors,
   ...typography,
   sizes,
   shadows,
   space: spacing,
   borders,
   transition,
}

export type ThemeProps = typeof Theme

export default Theme
