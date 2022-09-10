import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AnyObject } from './types'
import { serializeObject } from './serializeObject'

export type UseObjectListenerValue = {
  query: string
  object: AnyObject
}

export type UseObjectListenerOpts = {
  syncBehavior?: 'push' | 'replace'
}

/**
 * Initialize object listener. Basically it syncs url query string with object data.
 * @param {AnyObject} - object source object.
 * @param {UseObjectListenerOpts} opts - options.
 * @returns {UseObjectListenerValue} - processed data.
 */
export const useObjectListener = (
  object: AnyObject,
  opts?: UseObjectListenerOpts
): UseObjectListenerValue => {
  const {
    location: { search, pathname, hash },
    push,
    replace
  } = useHistory()

  const query = serializeObject(object)

  useEffect(() => {
    if (search !== `?${query}`) {
      const newUrl = `${pathname}?${query}${hash}`
      if ((opts?.syncBehavior || 'replace') === 'replace') {
        replace(newUrl)
      } else {
        push(newUrl)
      }
    }
  }, [object, search, query])

  return {
    query,
    object
  }
}