import UrlParse from 'url-parse'
import { useHistory } from 'react-router-dom'
import { AnyObject } from './types'
import { buildFromString } from './buildFromString'

export type UseEnhancedQueryValue<T = { [key: string]: any }> = {
  query: string
  object: AnyObject
  parsedQuery: { [key in keyof T]: string }
}

/**
 * Obtain url query data.
 * @returns {UseEnhancedQueryValue} - parsed query, source query, object from query.
 */
export const useEnhancedQuery = <T>(): UseEnhancedQueryValue<T> => {
  const {
    location: { search, pathname, hash }
  } = useHistory()

  const full = `${pathname}${search}${hash}`
  const parsed = UrlParse(full, true)
  const query = search.substring(1)
  const object = buildFromString(query)

  return {
    query,
    object,
    parsedQuery: parsed.query as { [key in keyof T]: string }
  }
}