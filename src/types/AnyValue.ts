import { AnyObject } from './AnyObject'

export type AnyValue =
  | null
  | undefined
  | number
  | string
  | boolean
  | AnyObject
  | number[]
  | string[]
  | boolean[]
  | null[]
  | undefined[]
  | AnyObject[]
