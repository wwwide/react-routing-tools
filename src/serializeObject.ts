import { AnyObject, AnyValue } from './types'

/**
 * Convert one value to string.
 * @param {AnyValue} value - value of any supported type.
 * @returns {string} - serialized value.
 */
const processValue = (value: AnyValue, addTypes: boolean): string => {
  let formattedValue = ''

  if (typeof value === 'undefined') {
    formattedValue = encodeURIComponent(`${addTypes ? 'o-' : ''}undefined`)
  }

  if (typeof value === 'number') {
    formattedValue = encodeURIComponent(`${addTypes ? 'n-' : ''}${value}`)
  }

  if (typeof value === 'string') {
    formattedValue = encodeURIComponent(`${addTypes ? 's-' : ''}${value}`)
  }

  if (typeof value === 'boolean') {
    formattedValue = encodeURIComponent(`${addTypes ? 'b-' : ''}${value}`)
  }

  if (!Array.isArray(value) && typeof value === 'object') {
    if (value === null) {
      formattedValue = encodeURIComponent(`${addTypes ? 'o-' : ''}null`)
    } else {
      formattedValue = encodeURIComponent(`${addTypes ? 'o-' : ''}${serializeObject(value)}`)
    }
  }

  if (Array.isArray(value)) {
    formattedValue = encodeURIComponent(
      `${addTypes ? 'a-' : ''}${value.map((i) => processValue(i, addTypes)).join(',')}`
    )
  }

  return formattedValue
}

/**
 * Build serialized key/value pair.
 * @param {string} key - key.
 * @param {AnyValue} - value of any supported type.
 * @returns serialized key/value pair
 */
const processPair = (key: string, value: AnyValue, addTypes: boolean): string =>
  `${encodeURIComponent(key)}=${processValue(value, addTypes)}`

/**
 * Serialize object to string.
 * @param {AnyObject} object - value to serialize.
 * @returns {string} - serialized value.
 */
export function serializeObject(object: AnyObject, addTypes = true): string {
  if (object === null) {
    return 'o-null'
  }

  if (typeof object === 'undefined') {
    return 'o-undefined'
  }

  const keys = Object.keys(object)

  if (!keys.length) {
    return ''
  }

  return Object.keys(object)
    .sort()
    .map((key) => processPair(key, object[key], addTypes))
    .join('&')
}
