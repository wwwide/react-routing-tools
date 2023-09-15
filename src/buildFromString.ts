import { AnyObject, AnyValue } from './types'

/**
 * Convert string to an object.
 * @param {string} value - source string value.
 * @returns {AnyValue} - complied value.
 */
const processValue = (value: string): AnyValue => {
  let parsedValue: AnyValue = ''

  if (value?.startsWith('n-')) {
    parsedValue = +value.substring(2)
  } else if (value?.startsWith('b-')) {
    parsedValue = value.substring(2) === 'true'
  } else if (value?.startsWith('o-')) {
    parsedValue = buildFromString(decodeURIComponent(value.substring(2)))
  } else if (value?.startsWith('a-')) {
    parsedValue = decodeURIComponent(value.substring(2))
      .split(',')
      .map((i) => {
        // eslint-disable-next-line
        return processValue(i) as any
      })
  } else if (value?.startsWith('s-')) {
    parsedValue = decodeURIComponent(value.substring(2))
  } else {
    parsedValue = decodeURIComponent(value)
  }

  return parsedValue
}

/**
 * Build key/value pair.
 * @param {string} key - key.
 * @param {String} - value of any supported type.
 * @returns key/value pair
 */
const processPair = (key: string, value: string) => ({
  [decodeURIComponent(key)]: processValue(value)
})

/**
 * Build object from string.
 * @param {string} query - source string.
 * @returns {AnyObject} - complied object.
 */
export function buildFromString(query: string): AnyObject {
  /**
   * "o-null" when root object is null,
   * "null" when one of the object's fields is null
   */
  if (query === 'o-null' || query === 'null') {
    return null
  }

  /**
   * Same as for nulls above.
   */
  if (query === 'o-undefined' || query === 'undefined') {
    return undefined
  }

  if (!query) {
    return {}
  }

  const pairs = query.split('&')

  return pairs.reduce((p, c) => {
    const [key, value] = c.split('=')
    return { ...p, ...processPair(key, value) }
  }, {})
}
