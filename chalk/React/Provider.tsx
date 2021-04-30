import CSSReset          from "../CSSReset"
import { PortalManager } from "../Portal"
import {
   ColorModeProvider,
   ColorModeProviderProps,
   GlobalStyle,
   ThemeProvider,
   useColorMode,
}                        from "../System"
import defaultTheme      from "../Theme"
import { Dictionary }    from "../Utils"
import * as React        from "react"

export interface ChalkProviderProps {
   /**
    * a theme. if omitted, uses the default theme provided by chalk
    */
   theme?: Dictionary
   /**
    * Common z-index to use for `Portal`
    *
    * @default undefined
    */
   portalZIndex?: number
   /**
    * If `true`, `CSSReset` component will be mounted to help
    * you reset browser styles
    *
    * @default true
    */
   resetCSS?: boolean
   /**
    * manager to persist a users color mode preference in
    *
    * omit if you don't render server-side
    * for SSR: choose `cookieStorageManager`
    *
    * @default localStorageManager
    */
   colorModeManager?: ColorModeProviderProps["colorModeManager"]
   children?: React.ReactNode
}

/**
 * The global provider that must be added to make all Chalk components
 * work correctly
 */
export const ChalkProvider = (props: ChalkProviderProps) => {
   const {
      children,
      colorModeManager,
      portalZIndex,
      resetCSS = true,
      theme = defaultTheme,
   } = props
   
   return (
      <ThemeProvider theme={theme}>
         <ColorModeProvider colorModeManager={colorModeManager} options={theme.config}>
            
            {resetCSS && <CSSReset />}
            
            <GlobalStyle />
            
            {portalZIndex ? (
               <PortalManager zIndex={portalZIndex}>{children}</PortalManager>
            ) : (
               children
            )}
         
         </ColorModeProvider>
      </ThemeProvider>
   )
}

export const ColorModeToggleButton: React.FC<any> = () => {
   const { colorMode, toggleColorMode } = useColorMode()
   
   return (
      <div style={{ width: '100%', marginTop: '2rem' }}>
         <button onClick={toggleColorMode}>
            Toggle
            {' '}
            {colorMode === 'light' ? 'Dark' : 'Light'}
         </button>
      </div>
   )
}
