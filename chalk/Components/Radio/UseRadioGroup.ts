import * as React                       from "react"
import { isInputEvent, StringOrNumber } from '../../Utils'
import { useControllableProp, useId } from '../../Hooks'
import { mergeRefs, PropGetter }      from '../ReactUtils'

type EventOrValue = React.ChangeEvent<HTMLInputElement> | StringOrNumber

export interface UseRadioGroupProps {
  /**
   * The value of the radio to be `checked`
   * (in controlled mode)
   */
  value?: StringOrNumber
  /**
   * The value of the radio to be `checked`
   * initially (in uncontrolled mode)
   */
  defaultValue?: StringOrNumber
  /**
   * Function called once a radio is checked
   * @param nextValue the value of the checked radio
   */
  onChange?(nextValue: string): void
  /**
   * The `name` attribute forwarded to each `radio` element
   */
  name?: string
  /**
   * If `true`, input elements will receive
   * `checked` attribute instead of `isChecked`.
   *
   * This assumes, you're using native radio inputs
   */
  isNative?: boolean
}

type RadioPropGetter = PropGetter<
  HTMLInputElement,
  { onChange?: (e: EventOrValue) => void; value?: StringOrNumber } & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "size" | "value"
  >
>

/**
 * React hook to manage a group of radio inputs
 */
export function useRadioGroup(props: UseRadioGroupProps = {}) {
  const {
    onChange: onChangeProp,
    value: valueProp,
    defaultValue,
    name: nameProp,
    isNative,
    ...htmlProps
  } = props

  const [valueState, setValue] = React.useState<StringOrNumber>(
    defaultValue || "",
  )
  const [isControlled, value] = useControllableProp(valueProp, valueState)

  const ref = React.useRef<any>(null)

  const focus = React.useCallback(() => {
    const rootNode = ref.current
    if (!rootNode) return

    let query = `input:not(:disabled):checked`

    const firstEnabledAndCheckedInput = rootNode.querySelector(
      query,
    ) as HTMLElement

    if (firstEnabledAndCheckedInput) {
      firstEnabledAndCheckedInput.focus()
      return
    }

    query = `input:not(:disabled)`

    const firstEnabledInput = rootNode.querySelector(query) as HTMLElement
    firstEnabledInput?.focus()
  }, [])

  /**
   * All radio options must use the same name
   */
  const fallbackName = useId(undefined, `radio`)
  const name = nameProp || fallbackName

  const onChange = React.useCallback(
    (eventOrValue: EventOrValue) => {
      const nextValue = isInputEvent(eventOrValue)
        ? eventOrValue.target.value
        : eventOrValue

      if (!isControlled) {
        setValue(nextValue)
      }

      onChangeProp?.(String(nextValue))
    },
    [onChangeProp, isControlled],
  )

  const getRootProps: PropGetter = React.useCallback(
    (props = {}, forwardedRef = null) => ({
      ...props,
      ref: mergeRefs(forwardedRef, ref),
      role: "radiogroup",
    }),
    [],
  )

  const getRadioProps: RadioPropGetter = React.useCallback(
    (props = {}, ref = null) => {
      const checkedKey = isNative ? "checked" : "isChecked"
      return {
        ...props,
        ref,
        name,
        [checkedKey]: value != null ? props.value === value : undefined,
        onChange,
      }
    },
    [isNative, name, onChange, value],
  )

  return {
    getRootProps,
    getRadioProps,
    name,
    ref,
    focus,
    setValue,
    value,
    onChange,
    htmlProps,
  }
}

export type UseRadioGroupReturn = ReturnType<typeof useRadioGroup>
