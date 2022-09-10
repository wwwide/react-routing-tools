# react-routing-tools

**react-routing-tools** is a toolbox helping to solve some day to day routing related things.

Currently it contains some basic API:

## serializeObject

Accepts any serializable JS object as an argument and serializes it as string. Serialized string contains type signatures for each source object field, so it can be easily converted back to object without losing types. Some examples are placed below:

    serializeObject({ age: 37 })
    -> 'age=n-37'

    serializeObject({ smart: true })
    -> 'smart=b-true'

    serializeObject({ name: 'Andrey' })
    -> 'name=s-Andrey'

    serializeObject({ profile: { name: 'Andrey', age: 37 } })
    -> 'profile=o-age%3Dn-37%26name%3Ds-Andrey'  // encoded to escape special characters

    const profile = { name: 'Andrey', age: 37, address: { country: 'Russia', city: 'Penza' } }
    const data = { profiles: [profile], age: 37, name: 'Andrey', sex: true }
    serializeObject(data)
    -> 'age=n-37&name=s-Andrey&profiles=a-o-address%253Do-city%25253Ds-Penza%252526country%25253Ds-Russia%2526age%253Dn-37%2526name%253Ds-Andrey&sex=b-true'

Arrays of objects are supported, objects nesting is supported.

## buildFromString

Accept string which should contain serialized data and contructs a JS object from it.
If given string is built by **serializeObject** function it will contain types data and output object will contain fields of corresponding types, e.g:

    const s = 'acceptedTerms=s-both&deleted=s-both&emptyProfile=s-both&limit=n-10&offset=n-0&region=o-id%3Ds-%26name%3Ds-&role=s-any&term=s-'
    buildFromString(s)
    -> {
         term: '',
         offset: 0,
         limit: 10,
         region: { id: '', name: '' },
         role: 'any',
         emptyProfile: 'both',
         acceptedTerms: 'both',
         deleted: 'both'
      }

Also standart query string can be parsed, but without types data all fields will be parsed as string:

    buildFromString('name=Andrey&age=37&smart=true')
    -> { name: 'Andrey', age: '37', smart: 'true' }

## useObjectListener

This hook listens for given object updates and synchronizes query string to get it representing object structure.

    useObjectListener(filterValue)
    // ... filterValue becomes { name: 'Michael', age: 120 }
    // browser url updates to "/<pathname>?name=Michael&age=120"

Also this hook returns:

    type UseObjectListenerValue = {
      query: string // updated query string
      object: AnyObject // source JS object
    }

## useEnhancedQuery

This hook returns data related to current query string:

    export type UseEnhancedQueryValue<T = { [key: string]: any }> = {
      query: string // current query string
      object: AnyObject // JS object built from this string
      parsedQuery: { [key in keyof T]: string } // query string parsed to JS dictionary
    }

## Usage example

    import { useObjectListener, useEnhancedQuery } from 'react-routing-tools'
    import { AccountRole, BooleanFilter } from <enums>

    const InitialFilter: GetAccountsRequest = {
      term: '',
      offset: 0,
      limit: 10,
      region: { id: '', name: '' },
      role: AccountRole.Any,
      emptyProfile: BooleanFilter.Both,
      acceptedTerms: BooleanFilter.Both,
      deleted: BooleanFilter.Both
    }

    ...

    export const useYourSmartHook = () => {
      // Get current query string object to properly initialize our filter.
      const { object } = useEnhancedQuery()

      // Call some fictious hook to obtain filter form data, initialize it with
      // **InitialFilter** data merged with data read from query string
      const form = useFormData<GetAccountsRequest>({ ...InitialFilter, ...object })

      // Start listening for filter updates, page query string will be updated correspondingly.
      useObjectListener(form.config.value)

      ...
    }

## TODO

- Think over automatic updating JS objects on URL query string changes.
- Add tests for hooks.
