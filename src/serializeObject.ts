import { AnyObject, AnyValue } from './types'

/**
 * Convert one value to string.
 * @param {AnyValue} value - value of any supported type.
 * @returns {string} - serialized value.
 */
const processValue = (value: AnyValue): string => {
  let formattedValue = ''

  if (typeof value === 'number') {
    formattedValue = encodeURIComponent(`n-${value}`)
  }

  if (typeof value === 'string') {
    formattedValue = encodeURIComponent(`s-${value}`)
  }

  if (typeof value === 'boolean') {
    formattedValue = encodeURIComponent(`b-${value}`)
  }

  if (!Array.isArray(value) && typeof value === 'object') {
    formattedValue = encodeURIComponent(`o-${serializeObject(value)}`)
  }

  if (Array.isArray(value)) {
    formattedValue = encodeURIComponent(`a-${value.map((i) => processValue(i)).join(',')}`)
  }

  return formattedValue
}

/**
 * Build serialized key/value pair.
 * @param {string} key - key.
 * @param {AnyValue} - value of any supported type.
 * @returns serialized key/value pair
 */
const processPair = (key: string, value: AnyValue): string => `${encodeURIComponent(key)}=${processValue(value)}`

/**
 * Serialize object to string.
 * @param {AnyObject} object - value to serialize.
 * @returns {string} - serialized value.
 */
export function serializeObject(object: AnyObject): string {
  const keys = Object.keys(object)

  if (!keys.length) {
    return ''
  }

  return Object.keys(object)
    .sort()
    .map((key) => processPair(key, object[key]))
    .join('&')
}