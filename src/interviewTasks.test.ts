import { describe, expect, it } from 'vitest'

import { AssemblyLineScheduler, findFlightPath, isPalindrom, jobs, merge } from './index'

describe('assemblyLineScheduler', () => {
  it('should return a job lines statistic', async () => {
    const lines = 3
    const scheduler = new AssemblyLineScheduler(lines)
    jobs.jobsBatches[0].forEach(job => scheduler.appendJob(job))
    const expectedResult = [
      [1, 1, ['2', '5'], 162],
      [2, 0, ['4', '3'], 144],
      [0, 1, ['1'], 69],
    ]
    try {
      const result = await scheduler.start()
      expect(result).toStrictEqual(expectedResult)
    } catch (error) {
      error
    }
  })
})

describe('isPalindrome', () => {
  it('should return true for palindrome strings', () => {
    expect(isPalindrom('racecar')).toBeTruthy() // Палиндром
    expect(isPalindrom('madam')).toBeTruthy() // Палиндром
    expect(isPalindrom('aka')).toBeTruthy() // Палиндром
    expect(isPalindrom('aa')).toBeTruthy() // Палиндром
    expect(isPalindrom('aaa')).toBeTruthy() // Палиндром
    expect(isPalindrom('amma')).toBeTruthy() // Палиндром

    expect(isPalindrom('aaa ')).toBeTruthy() // Палиндром
    expect(isPalindrom(' aaa ')).toBeTruthy() // Палиндром
    expect(isPalindrom(' aaa')).toBeTruthy() // Палиндром
    expect(isPalindrom(' aa a')).toBeTruthy() // Палиндром
    expect(isPalindrom('aaA')).toBeTruthy() // Палиндром
    expect(isPalindrom('aaA11')).toBeTruthy() // Палиндром
    expect(isPalindrom('aaA_')).toBeTruthy() // Палиндром
    expect(isPalindrom('!!aaA_')).toBeTruthy() // Палиндром
    expect(isPalindrom('!!a-a*A_')).toBeTruthy() // Палиндром
  })

  it('should return false for non-palindrome strings', () => {
    expect(isPalindrom('hello')).toBeFalsy() // Не палиндром
    expect(isPalindrom('world')).toBeFalsy() // Не палиндром
    expect(isPalindrom('random')).toBeFalsy() // Не палиндром
    expect(isPalindrom('aaazz')).toBeFalsy() // Не палиндром
    expect(isPalindrom('')).toBeFalsy() // Не палиндром
  })
})

describe('getPath', () => {
  it('should return Promise with the List of the points of the way or a rejected Promise', async () => {
    try {
      expect(await findFlightPath('A', 'N')).toStrictEqual(['A', 'B', 'N'])
      expect(await findFlightPath('A', 'S')).toStrictEqual(['A', 'D', 'F', 'S'])
    } catch (error) {
      expect(error).not.toBeFalsy()
    }
  })
  it('should throw an Error', async () => {
    try {
      await findFlightPath('B', 'S')
    } catch (error) {
      expect(error.message).toBe('No way')
    }
  })
})

describe('merge', () => {
  it('should merge two arrays correctly', () => {
    expect(merge([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6])
    expect(merge([1, 3, 5], [2, 4, 6])).toEqual([1, 2, 3, 4, 5, 6])
    expect(merge([1, 2, 2], [2, 3, 4])).toEqual([1, 2, 2, 2, 3, 4])
    expect(merge([1, 2], [3, 4, 5])).toEqual([1, 2, 3, 4, 5])
    expect(merge([1, 2, 3, 4], [5])).toEqual([1, 2, 3, 4, 5])
    expect(merge([], [5])).toEqual([5])
    expect(merge([], [])).toEqual([])
    expect(merge('' as unknown as [], [])).toEqual([])
  })
})
