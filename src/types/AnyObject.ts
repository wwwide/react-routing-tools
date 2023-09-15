import { AnyValue } from './AnyValue'

export type AnyObject =
  | {
      [key: string]: AnyValue
    }
  | null
  | undefined
