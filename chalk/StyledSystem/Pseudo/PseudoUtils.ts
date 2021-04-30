import {
   Dictionary,
   isObject,
   isFunction,
} from "../../Utils"
import { pseudoSelectors } from "./PseudoSelectors"

export function parsePseudo(props: Dictionary) {
   const next: Dictionary = {}
   
   Object.keys(props).forEach((prop: string) => {
      const propValue = props[prop]
      const propName = prop in pseudoSelectors ? pseudoSelectors[prop] : prop
      
      if (isObject(propValue) && !isFunction(propValue)) {
         next[propName] = parsePseudo(propValue)
      } else {
         next[propName] = propValue
      }
   })
   
   return next
}
