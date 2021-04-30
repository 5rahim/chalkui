import { useImage, UseImageProps }                                 from './UseImage'
import { omit }                                                              from '../../Utils'
import { chalk, forwardRef, HTMLChalkProps, PropsOf, SystemProps, useTheme } from '../../System'
import React                                                                 from 'react'

interface NativeImageOptions {
   /**
    * The native HTML `width` attribute to the passed to the `img`
    */
   htmlWidth?: string | number
   /**
    * The native HTML `height` attribute to the passed to the `img`
    */
   htmlHeight?: string | number
}

interface NativeImageProps extends PropsOf<"img">, NativeImageOptions {
}

const NativeImage = React.forwardRef(
   (props: NativeImageProps, ref: React.Ref<any>) => {
      const { htmlWidth, htmlHeight, alt, ...rest } = props
      return (
         <img
            width={htmlWidth}
            height={htmlHeight}
            ref={ref}
            alt={alt}
            {...rest}
         />
      )
   },
)

interface ImageOptions extends NativeImageOptions {
   /**
    * Fallback image `src` to show if image is loading or image fails.
    *
    * Note 🚨: We recommend you use a local image
    */
   fallbackSrc?: string
   /**
    * Fallback element to show if image is loading or image fails.
    * @type React.ReactElement
    */
   fallback?: React.ReactElement
   /**
    * Defines loading strategy
    */
   loading?: "eager" | "lazy"
   /**
    * How the image to fit within its bounds.
    * It maps to css `object-fit` property.
    * @type SystemProps["objectFit"]
    */
   fit?: SystemProps["objectFit"]
   /**
    * How to align the image within its bounds.
    * It maps to css `object-position` property.
    * @type SystemProps["objectPosition"]
    */
   align?: SystemProps["objectPosition"]
   /**
    * If `true`, opt out of the `fallbackSrc` logic and use as `img`
    */
   ignoreFallback?: boolean
}

export interface ImageProps
   extends UseImageProps,
      Omit<HTMLChalkProps<"img">, keyof UseImageProps>,
      ImageOptions {
}

/**
 * React component that renders an image with support
 * for fallbacks
 *
 * @see Docs https://chalk-ui.com/docs/data-display/image
 */
export const Image = forwardRef<ImageProps, "img">((props, ref) => {
   const theme = useTheme()
   const {
      fallbackSrc,
      fallback,
      src,
      align,
      fit,
      loading,
      ignoreFallback,
      crossOrigin,
      ...rest
   } = props
   
   /**
    * Defer to native `img` tag if `loading` prop is passed
    */
   const shouldIgnore = loading != null || ignoreFallback
   
   const status = useImage({
      ...props,
      ignoreFallback: shouldIgnore,
   })
   
   const shared = {
      ref,
      objectFit: fit,
      objectPosition: align,
      ...(shouldIgnore ? rest : omit(rest, ["onError", "onLoad"])),
   }
   
   if (status !== "loaded") {
      /**
       * If user passed a custom fallback component,
       * let's render it here.
       */
      if (fallback) return fallback
      
      return (
         <chalk.img
            theme={theme}
            as={NativeImage}
            className="chalk-image__placeholder"
            src={fallbackSrc}
            {...shared}
         />
      )
   }
   
   return (
      <chalk.img
         theme={theme}
         as={NativeImage}
         src={src}
         crossOrigin={crossOrigin}
         loading={loading}
         className="chalk-image"
         {...shared}
      />
   )
})

export interface ImgProps extends HTMLChalkProps<"img">, NativeImageOptions {
}

/**
 * Fallback component for most SSR users who want to use the native `img` with
 * support for chalk props
 */
export const Img = forwardRef<ImgProps, "img">((props, ref) => (
   <chalk.img ref={ref} as={NativeImage} className="chalk-image" {...props} />
))
