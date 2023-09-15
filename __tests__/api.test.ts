import { buildFromString, serializeObject } from '../src'

describe('object2query / query2object test cases', () => {
  test('empty string conversions', () => {
    const serialized = serializeObject({})
    expect(serialized).toEqual('')
    const object = buildFromString(serialized)
    expect(object).toEqual({})
  })

  test('simple numbers serialization', () => {
    const data1 = { age: 37 }
    const serialized1 = serializeObject(data1)
    expect(serialized1).toEqual('age=n-37')
    const object1 = buildFromString(serialized1)
    expect(object1).toEqual(data1)

    const data2 = { age: 37, sex: 1 }
    const serialized2 = serializeObject(data2)
    expect(serialized2).toEqual('age=n-37&sex=n-1')
    const object2 = buildFromString(serialized2)
    expect(object2).toEqual(data2)
  })

  test('simple strings serialization', () => {
    const data1 = { name: 'Andrey' }
    const serialized1 = serializeObject(data1)
    expect(serialized1).toEqual('name=s-Andrey')
    const object1 = buildFromString(serialized1)
    expect(object1).toEqual(data1)

    const data2 = { name: 'Андрей' }
    const serialized2 = serializeObject(data2)
    expect(serialized2).toEqual(`name=s-${encodeURIComponent('Андрей')}`)
    const object2 = buildFromString(serialized2)
    expect(object2).toEqual(data2)
  })

  test('simple boolean serialization', () => {
    const data1 = { accepted: true }
    const serialized1 = serializeObject(data1)
    expect(serialized1).toEqual('accepted=b-true')
    const object1 = buildFromString(serialized1)
    expect(object1).toEqual(data1)

    const data2 = { accepted: false }
    const serialized2 = serializeObject(data2)
    expect(serialized2).toEqual('accepted=b-false')
    const object2 = buildFromString(serialized2)
    expect(object2).toEqual(data2)
  })

  test('object serialization', () => {
    const profile1 = { name: 'Andrey', age: 37 }
    const data1 = { profile: profile1 }
    const serialized1 = serializeObject(data1)

    expect(serialized1).toEqual(`profile=o-${encodeURIComponent(serializeObject(profile1))}`)
    const object1 = buildFromString(serialized1)
    expect(object1).toEqual(data1)

    const profile2 = { name: 'Andrey', age: 37, address: { country: 'Russia', city: 'Penza' } }
    const data2 = { profile: profile2 }
    const serialized2 = serializeObject(data2)
    expect(serialized2).toEqual(`profile=o-${encodeURIComponent(serializeObject(profile2))}`)
    const object2 = buildFromString(serialized2)
    expect(object2).toEqual(data2)

    const profile3 = null
    const serialized3 = serializeObject(profile3)
    expect(serialized3).toEqual('o-null')
    const object3 = buildFromString(serialized3)
    expect(object3).toEqual(profile3)

    const profile4 = undefined
    const serialized4 = serializeObject(profile4)
    expect(serialized4).toEqual('o-undefined')
    const object4 = buildFromString(serialized4)
    expect(object4).toEqual(profile4)

    const profile5 = { name: null }
    const serialized5 = serializeObject(profile5)
    expect(serialized5).toEqual('name=o-null')
    const object5 = buildFromString(serialized5)
    expect(object5).toEqual(profile5)

    const profile6 = { name: undefined }
    const serialized6 = serializeObject(profile6)
    expect(serialized6).toEqual('name=o-undefined')
    const object6 = buildFromString(serialized6)
    expect(object6).toEqual(profile6)
  })

  test('array serialization', () => {
    const data1 = { array: [1, 2, 3, 4, 5] }
    const serialized1 = serializeObject(data1)
    expect(serialized1).toEqual(`array=a-${encodeURIComponent('n-1,n-2,n-3,n-4,n-5')}`)
    const object1 = buildFromString(serialized1)
    expect(object1).toEqual(data1)

    const data2 = { array: ['golang', 'c++', 'аджна'] }
    const serialized2 = serializeObject(data2)
    expect(serialized2).toEqual(
      `array=a-${encodeURIComponent(`s-golang,s-${encodeURIComponent('c++')},s-${encodeURIComponent('аджна')}`)}`
    )
    const object2 = buildFromString(serialized2)
    expect(object2).toEqual(data2)

    const data3 = { array: [true, false] }
    const serialized3 = serializeObject(data3)
    expect(serialized3).toEqual(`array=a-${encodeURIComponent('b-true,b-false')}`)
    const object3 = buildFromString(serialized3)
    expect(object3).toEqual(data3)

    const profile = { name: 'Andrey', age: 37, address: { country: 'Russia', city: 'Penza' } }
    const data4 = { profiles: [profile], age: 37, name: 'Andrey', sex: true }
    const serializedProfile = encodeURIComponent(serializeObject(profile))
    const serialized4 = serializeObject(data4)
    expect(serialized4).toEqual(
      `age=n-37&name=s-Andrey&profiles=a-o-${encodeURIComponent(serializedProfile)}&sex=b-true`
    )
    const object4 = buildFromString(serialized4)
    expect(object4).toEqual(data4)
  })

  test('default query string values (without types data) parsed as string', () => {
    const query = 'name=Andrey&age=37&smart=true'
    const data = { name: 'Andrey', age: '37', smart: 'true' }
    const object = buildFromString(query)
    expect(object).toEqual(data)
  })
})
