import { mode } from '../Tools'


type Dict = Record<string, any>

const parts = ["text", "icon"]

function baseStyleText(props: Dict) {
  return {
    color: mode("red.500", "red.300")(props),
    mt: 2,
    fontSize: "sm",
  }
}

function baseStyleIcon(props: Dict) {
  return {
    marginRight: "0.5em",
    color: mode("red.500", "red.300")(props),
  }
}

const baseStyle = (props: Dict) => ({
  text: baseStyleText(props),
  icon: baseStyleIcon(props),
})

export default {
  parts,
  baseStyle,
}
