import * as React    from "react"
import {
   useEditable,
   UseEditableProps,
   UseEditableReturn,
}                    from "./UseEditable"
import {
   createContext,
   MaybeRenderProp,
}                    from '../ReactUtils'
import {
   chalk,
   forwardRef,
   HTMLChalkProps,
   omitThemingProps,
   StylesProvider,
   SystemStyleObject,
   ThemingProps,
   useMultiStyleConfig,
   useStyles,
   useTheme,
} from '../../System'
import {
   cx,
   runIfFn,
}                    from '../../Utils'
import { ReactNode } from 'react'

type EditableContext = Omit<UseEditableReturn, "htmlProps">

const [EditableProvider, useEditableContext] = createContext<EditableContext>({
   name: "EditableContext",
   errorMessage:
      "useEditableContext: context is undefined. Seems you forgot to wrap the editable components in `<Editable />`",
})

type RenderProps = Pick<UseEditableReturn,
   "isEditing" | "onSubmit" | "onCancel" | "onEdit">

interface BaseEditableProps
   extends Omit<HTMLChalkProps<"div">,
      "onChange" | "value" | "defaultValue" | "onSubmit"> {
}

export interface EditableProps
   extends UseEditableProps,
      BaseEditableProps,
      ThemingProps<"Editable"> {
   children?: MaybeRenderProp<RenderProps>
}


/**
 * Editable
 *
 * The wrapper that provides context and logic for all editable
 * components. It renders a `div`
 */
export const Editable = forwardRef<EditableProps, "div">((props, ref) => {
   const styles = useMultiStyleConfig("Editable", props)
   const theme = useTheme()
   const ownProps = omitThemingProps(props)
   const { htmlProps, ...context } = useEditable(ownProps)
   
   const { isEditing, onSubmit, onCancel, onEdit } = context
   
   const _className = cx("chalk-editable", props.className)
   
   const children = runIfFn(props.children, {
      isEditing,
      onSubmit,
      onCancel,
      onEdit,
   })
   
   return (
      <EditableProvider value={context}>
         <StylesProvider value={styles}>
            <chalk.div
               ref={ref}
               theme={theme}
               {...(htmlProps as HTMLChalkProps<"div">)}
               className={_className}
            >
               {children}
            </chalk.div>
         </StylesProvider>
      </EditableProvider>
   )
})


const commonStyles: SystemStyleObject = {
   fontSize: "inherit",
   fontWeight: "inherit",
   textAlign: "inherit",
   bg: "transparent",
}

export interface EditablePreviewProps extends HTMLChalkProps<"div"> {
}

/**
 * EditablePreview
 *
 * The `span` used to display the final value, in the `preview` mode
 */
export const EditablePreview = forwardRef<EditablePreviewProps, "span">(
   (props, ref) => {
      const { getPreviewProps } = useEditableContext()
      const styles = useStyles()
      const theme = useTheme()
      const previewProps = getPreviewProps(props, ref) as HTMLChalkProps<"span">
      const _className = cx("chalk-editable__preview", props.className)
      
      return (
         <chalk.span
            {...previewProps}
            theme={theme}
            __css={{
               cursor: "text",
               display: "inline-block",
               ...commonStyles,
               ...styles.preview,
            }}
            className={_className}
         />
      )
   },
)


export interface EditableInputProps extends HTMLChalkProps<"input"> {
}

/**
 * EditableInput
 *
 * The input used in the `edit` mode
 */
export const EditableInput = forwardRef<EditableInputProps, "input">(
   (props, ref) => {
      const { getInputProps } = useEditableContext()
      const styles = useStyles()
      const theme = useTheme()
      const inputProps = getInputProps(props, ref) as HTMLChalkProps<"input">
      const _className = cx("chalk-editable__input", props.className)
      
      return (
         <chalk.input
            theme={theme}
            {...inputProps}
            __css={{
               outline: 0,
               ...commonStyles,
               ...styles.input,
            }}
            className={_className}
         />
      )
   },
)


/**
 * React hook use to gain access to the editable state and actions.
 */
export function useEditableState() {
   const {
      isEditing,
      onSubmit,
      onCancel,
      onEdit,
      isDisabled,
   } = useEditableContext()
   
   return {
      isEditing,
      onSubmit,
      onCancel,
      onEdit,
      isDisabled,
   }
}

/**
 * React hook use to create controls for the editable component
 */
export function useEditableControls(): Pick<EditableContext,
   | "isEditing"
   | "getEditButtonProps"
   | "getCancelButtonProps"
   | "getSubmitButtonProps"> {
   const {
      isEditing,
      getEditButtonProps,
      getCancelButtonProps,
      getSubmitButtonProps,
   } = useEditableContext()
   
   return {
      isEditing,
      getEditButtonProps,
      getCancelButtonProps,
      getSubmitButtonProps,
   }
}
