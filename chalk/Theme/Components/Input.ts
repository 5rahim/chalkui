import {
  getColor,
  mode,
} from '../Tools'


const parts = ["field", "addon"]

const baseStyle = {
  field: {
    width: "100%",
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    transition: "all 0.2s",
  },
}

const size = {
  lg: {
    fontSize: "lg",
    px: 3,
    h: 12,
    borderRadius: "md",
  },

  md: {
    fontSize: "md",
    px: 3,
    h: 10,
    borderRadius: "md",
  },

  sm: {
    fontSize: "sm",
    px: 3,
    h: 8,
    borderRadius: "md",
  },

  xs: {
    fontSize: "xs",
    px: 2,
    h: 6,
    borderRadius: "md",
  },
}

const sizes = {
  lg: {
    field: size.lg,
    addon: size.lg,
  },
  md: {
    field: size.md,
    addon: size.md,
  },
  sm: {
    field: size.sm,
    addon: size.sm,
  },
  xs: {
    field: size.xs,
    addon: size.xs,
  },
}

function getDefaults(props: Record<string, any>) {
  const { focusBorderColor: fc, errorBorderColor: ec } = props
  return {
    focusBorderColor: fc || mode("messenger.500", "messenger.300")(props),
    errorBorderColor: ec || mode("red.500", "red.300")(props),
  }
}

function variantOutline(props: Record<string, any>) {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    field: {
      border: "1px solid",
      borderColor: "inherit",
      bg: "inherit",
      _hover: {
        borderColor: mode("gray.300", "whiteAlpha.400")(props),
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
      _invalid: {
        borderColor: getColor(theme, ec),
        boxShadow: `0 0 0 1px ${getColor(theme, ec)}`,
      },
      _focus: {
        zIndex: 1,
        borderColor: getColor(theme, fc),
        boxShadow: `0 0 0 1px ${getColor(theme, fc)}`,
      },
    },
    addon: {
      border: "1px solid",
      borderColor: mode("inherit", "whiteAlpha.50")(props),
      // bg: mode("gray.100", "whiteAlpha.300")(props),
      bg: 'transparent'
    },
  }
}

function variantFilled(props: Record<string, any>) {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    field: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props),
      _hover: {
        bg: mode("gray.200", "whiteAlpha.100")(props),
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
      _invalid: {
        borderColor: getColor(theme, ec),
      },
      _focus: {
        bg: "transparent",
        borderColor: getColor(theme, fc),
      },
    },
    addon: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props),
    },
  }
}

function variantFlushed(props: Record<string, any>) {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    field: {
      borderBottom: "1px solid",
      borderColor: "inherit",
      borderRadius: 0,
      px: 0,
      bg: "transparent",
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _invalid: {
        borderColor: getColor(theme, ec),
        boxShadow: `0px 1px 0px 0px ${getColor(theme, ec)}`,
      },
      _focus: {
        borderColor: getColor(theme, fc),
        boxShadow: `0px 1px 0px 0px ${getColor(theme, fc)}`,
      },
    },
    addon: {
      borderBottom: "1px solid",
      borderColor: "inherit",
      borderRadius: 0,
      // px: 0,
      bg: "transparent",
    },
  }
}

const variantUnstyled = {
  field: {
    bg: "transparent",
    px: 0,
    height: "auto",
  },
  addon: {
    bg: "transparent",
    px: 0,
    height: "auto",
  },
}

const variants = {
  outline: variantOutline,
  filled: variantFilled,
  flushed: variantFlushed,
  unstyled: variantUnstyled,
}

const defaultProps = {
  size: "md",
  variant: "outline",
}

export default {
  parts,
  baseStyle,
  sizes,
  variants,
  defaultProps,
}
