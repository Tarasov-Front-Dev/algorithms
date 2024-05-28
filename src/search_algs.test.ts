import { describe, expect, it } from 'vitest'

import { arrSearch, binarySearch, linearSearch } from './search_algs'

describe('LinearSearch', () => {
  it('should return an index of a target', () => {
    expect(linearSearch(arrSearch, 1)).toBe(0)
  })
  it('should return an index of a target', () => {
    expect(linearSearch(arrSearch, 5)).toBe(4)
  })
  it('should return an index of a target', () => {
    expect(linearSearch(arrSearch, 9)).toBe(8)
  })
  it('should return -1 when target is not in an array', () => {
    expect(linearSearch(arrSearch, 0)).toBe(-1)
  })
  it('should return -1 when target is not in an array', () => {
    expect(linearSearch(arrSearch, 11)).toBe(-1)
  })
})

describe('BinarySearch', () => {
  it('should return an index of a target', () => {
    expect(binarySearch(arrSearch, 1)).toBe(0)
  })
  it('should return an index of a target', () => {
    expect(binarySearch(arrSearch, 5)).toBe(4)
  })
  it('should return an index of a target', () => {
    expect(binarySearch(arrSearch, 9)).toBe(8)
  })
  it('should return -1 when target is not in an array', () => {
    expect(binarySearch(arrSearch, 0)).toBe(-1)
  })
  it('should return -1 when target is not in an array', () => {
    expect(binarySearch(arrSearch, 11)).toBe(-1)
  })
})
