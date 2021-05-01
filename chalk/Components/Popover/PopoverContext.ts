import { createContext }    from "../ReactUtils"
import { UsePopoverReturn } from "./UsePopover"

export const [
   PopoverProvider,
   usePopoverContext,
] = createContext<UsePopoverReturn>({
   name: "PopoverContext",
   errorMessage:
      "usePopoverContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Popover />`",
})
