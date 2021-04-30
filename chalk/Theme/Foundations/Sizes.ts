import { spacing } from './Spacing'

export const baseSizes = {
   px: '1px',
   0: '0',
   1: '0.25rem',
   2: '0.5rem',
   3: '0.75rem',
   4: '1rem',
   5: '1.25rem',
   6: '1.5rem',
   7: '1.7rem',
   8: '2rem',
   9: '2.5rem',
   10: '2.7rem',
   12: '3rem',
   14: '3.5rem',
   16: '4rem',
   18: '4.5rem',
   20: '5rem',
   22: '5.5rem',
   24: '6rem',
   26: '6.5rem',
   28: '7rem',
   30: '7.5rem',
   32: '8rem',
   34: '8.5rem',
   36: '9rem',
   38: '9.5rem',
   40: '10rem',
   42: '10.5rem',
   44: '11rem',
   46: '11.5rem',
   48: '12rem',
   50: '12.5rem',
   52: '13rem',
   54: '13.5rem',
   56: '14rem',
   58: '14.5rem',
   60: '15rem',
   62: '15.5rem',
   64: '16rem',
}

// export type BaseSizes = typeof baseSizes

const largeSizes = {
   full: '100%',
   '3xs': '14rem',
   '2xs': '16rem',
   xs: '20rem',
   sm: '24rem',
   md: '28rem',
   lg: '32rem',
   xl: '36rem',
   '2xl': '42rem',
   '3xl': '48rem',
   '4xl': '56rem',
   '5xl': '64rem',
   '6xl': '72rem',
   '7xl': '80rem',
}

const container = {
   sm: '640px',
   md: '768px',
   lg: '1024px',
   xl: '1280px',
}

const sizes: any = {
   ...baseSizes,
   ...largeSizes,
   container,
}

export type Sizes =
   typeof largeSizes & { container: typeof container }

export default sizes
