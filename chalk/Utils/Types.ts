export type Merge<T, P> = P & Omit<T, keyof P>

export type UnionStringArray<T extends Readonly<string[]>> = T[number]

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type LiteralUnion<T extends U, U extends any = string> =
   | T
   | (U & { _?: never })

export type AnyFunction<T = any> = (...args: T[]) => any

export type FunctionArguments<T extends Function> = T extends (
   ...args: infer R
   ) => any
   ? R
   : never

export type Dict<T = any> = Record<string, T>

export type Booleanish = boolean | "true" | "false"
export type StringOrNumber = string | number

export type EventKeys =
   | "ArrowDown"
   | "ArrowUp"
   | "ArrowLeft"
   | "ArrowRight"
   | "Enter"
   | "Space"
   | "Tab"
   | "Backspace"
   | "Control"
   | "Meta"
   | "Home"
   | "End"
   | "PageDown"
   | "PageUp"
   | "Delete"
   | "Escape"
   | " "
   | "Shift"

// import * as React from 'react'
//
// export type Merge<T, P> = P & Omit<T, keyof P>
//
// export type UnionStringArray<T extends Readonly<string[]>> = T[number]
//
// export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
//
// export type LiteralUnion<T extends U, U extends any = string> =
//    | T
//    | (U & { _?: never })
//
// export type AnyFunction<T = any> = (...args: T[]) => any
//
// export type FunctionArguments<T extends Function> = T extends (...args: infer R) => any
//    ? R
//    : never
//
export type Dictionary<T = any> = Record<string, T>
//
// export type MaybeRenderProp<P> =
//    | React.ReactNode
//    | ((props: P) => React.ReactNode)
//
// export type Booleanish = boolean | 'true' | 'false'
//
// export type StringOrNumber = string | number
//
// export type HTMLProps<T = any> = Omit<React.HTMLAttributes<T>, 'color' | 'width' | 'height'> &
//    React.RefAttributes<T>
//
// export type PropGetter<T extends HTMLElement = any, P = {}> = (
//    props?: Merge<HTMLProps<T>, P>,
//    ref?: React.Ref<any> | React.RefObject<any>,
// ) => Merge<HTMLProps<T>, P>
//
// export type EventKeys =
//    | 'ArrowDown'
//    | 'ArrowUp'
//    | 'ArrowLeft'
//    | 'ArrowRight'
//    | 'Enter'
//    | 'Space'
//    | 'MenuItem'
//    | 'Backspace'
//    | 'Control'
//    | 'Meta'
//    | 'Home'
//    | 'End'
//    | 'PageDown'
//    | 'PageUp'
//    | 'Delete'
//    | 'Escape'
//    | ' '
//    | 'Shift'
//
// export type EventKeyMap = Partial<Record<EventKeys, React.KeyboardEventHandler>>
