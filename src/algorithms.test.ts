import { describe, expect, it } from 'vitest'

import {
  List,
  bfs,
  dailyTemperatures,
  dp,
  findCircularRef,
  levelOrder,
  maxSumPath,
  orangesRotting,
  reorderLogFiles,
  searchMatrix,
  slidingWindow,
  subarraySum,
  topKFrequent,
  wordBreak,
} from './algorithms'

describe('subarraySum', () => {
  describe('should throw an error', () => {
    it('should throw an error if the first argument is not an array', () => {
      expect(() => subarraySum(null as unknown as number[], 5)).toThrowError(
        'Provide a number array as an argument'
      )
      expect(() => subarraySum(undefined as unknown as number[], 5)).toThrowError(
        'Provide a number array as an argument'
      )
      expect(() => subarraySum('string' as unknown as number[], 5)).toThrowError(
        'Provide a number array as an argument'
      )
    })
  })

  describe('should return 0 in corner cases', () => {
    it('should return 0 if the array is empty', () => {
      expect(subarraySum([], 5)).toBe(0)
    })
    it('should return 0 if the array has one element', () => {
      expect(subarraySum([3], 5)).toBe(0)
    })
    it('should return 0 if the array has exactly the one target element', () => {
      expect(subarraySum([5], 5)).toBe(1)
    })
  })

  describe('should return correct answer', () => {
    it('should return the correct count of subarrays with sum equal to k', () => {
      const arr = [4, 2, 2, 1, 2, -3, 5, -8]
      expect(subarraySum(arr, 5)).toBe(5)
    })

    it('should return 0 if no subarray with sum equal to k exists', () => {
      const arr = [1, 2, 3, 4, 5]
      expect(subarraySum(arr, 10)).toBe(1)
    })

    it('should handle negative numbers correctly', () => {
      const arr = [-1, -2, -3, -4, -5]
      expect(subarraySum(arr, -3)).toBe(2)
    })
  })
})

describe('slidingWindow', () => {
  describe('should throw an error', () => {
    it('should throw an error if the argument is not a string', () => {
      expect(() => slidingWindow(null as unknown as string)).toThrowError(
        'Provide a string as an argument'
      )
      expect(() => slidingWindow(undefined as unknown as string)).toThrowError(
        'Provide a string as an argument'
      )
      expect(() => slidingWindow(123 as unknown as string)).toThrowError(
        'Provide a string as an argument'
      )
    })
  })

  describe('should return correct answer', () => {
    it('should return the length of the string if all characters are unique', () => {
      expect(slidingWindow('abcdefg')).toBe(7)
    })

    it('should return the length of the longest substring without repeating characters', () => {
      expect(slidingWindow('abcbada')).toBe(4)
      expect(slidingWindow('axbxcxd')).toBe(3)
    })

    it('should return 1 if all characters are the same', () => {
      expect(slidingWindow('aaaaaaa')).toBe(1)
    })

    it('should return 0 if the string is empty', () => {
      expect(slidingWindow('')).toBe(0)
    })
  })
})

describe('dp', () => {
  describe('should throw an error', () => {
    it('should throw an error if the first argument is not an array', () => {
      expect(() => dp(null as unknown as number[])).toThrowError(
        'Provide a number array as an argument'
      )
      expect(() => dp(undefined as unknown as number[])).toThrowError(
        'Provide a number array as an argument'
      )
      expect(() => dp('string' as unknown as number[])).toThrowError(
        'Provide a number array as an argument'
      )
    })
  })

  describe('should return correct answer', () => {
    it('should return the correct maximum sum of non-adjacent elements', () => {
      const arr = [4, 11, 10, 1, 2, 8, 5]
      expect(dp(arr)).toBe(22)
    })

    it('should return 0 if the array is empty', () => {
      expect(dp([])).toBe(0)
    })

    it('should return the single element if the array has one element', () => {
      expect(dp([3])).toBe(3)
    })

    it('should handle negative numbers correctly', () => {
      const arr = [-1, -2, -3, -4, -5]
      expect(dp(arr)).toBe(0)
    })
  })
})

describe('bfs', () => {
  describe('should throw an error', () => {
    it('should throw an error if the arguments are not numbers', () => {
      expect(() => bfs(null as unknown as number, 5)).toThrowError(
        'Provide numbers as arguments'
      )
      expect(() => bfs(undefined as unknown as number, 5)).toThrowError(
        'Provide numbers as arguments'
      )
      expect(() => bfs('string' as unknown as number, 5)).toThrowError(
        'Provide numbers as arguments'
      )
    })
  })

  describe('should return correct answer', () => {
    it('should return the correct number of moves', () => {
      expect(bfs(2, 1)).toBe(1)
      expect(bfs(3, 3)).toBe(2)
      expect(bfs(4, 5)).toBe(3)
      expect(bfs(6, 6)).toBe(4)
      expect(bfs(8, 7)).toBe(5)
    })

    it('should return 0 if the target is the starting position', () => {
      expect(bfs(0, 0)).toBe(0)
    })

    it('should handle negative numbers correctly', () => {
      expect(bfs(-1, -2)).toBe(1)
    })
  })
})

describe('findCircularRef', () => {
  describe('should return correct answer', () => {
    it('should return the node where the cycle begins', () => {
      const list = {
        val: 1,
        next: {
          val: 2,
          next: { val: 3, next: { val: 4, next: { val: 5, next: { val: 6 } } } },
        },
      } as List
      // @ts-expect-error create circular reference
      list.next.next.next.next.next.next = list.next.next
      const result = findCircularRef(list)
      expect(result).toBe(list.next!.next)
    })

    it('should return the node if list is a full circle', () => {
      const list = {
        val: 1,
        next: {
          val: 2,
          next: { val: 3, next: { val: 4 } },
        },
      } as List
      // @ts-expect-error create circular reference
      list.next.next.next.next = list
      const result = findCircularRef(list)
      expect(result).toBe(list)
    })

    it('should return null if there is no cycle', () => {
      const list: List = {
        val: 1,
        next: {
          val: 2,
          next: {
            val: 3,
            next: { val: 4, next: { val: 5, next: { val: 6, next: null } } },
          },
        },
      } as List
      const result = findCircularRef(list)
      expect(result).toBe(null)
    })

    it('should handle single node list correctly', () => {
      const list: List = { val: 1, next: null } as List
      const result = findCircularRef(list)
      expect(result).toBe(null)
    })
  })
})

describe('searchMatrix', () => {
  it('should find the target in a sorted matrix', () => {
    const matrix = [
      [1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30],
    ]
    const target = 15
    expect(searchMatrix(matrix, target)).toBeTruthy()
  })

  it('should not find the target when it is not in the matrix', () => {
    const matrix = [
      [1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30],
    ]
    const target = 25
    expect(searchMatrix(matrix, target)).toBeFalsy()
  })
})

describe('reorderLogFiles', () => {
  it('should sort the logs correctly', () => {
    const logs = [
      'dig1 8 1 5 1',
      'let1 art can',
      'dig2 3 6',
      'let2 own kit dig',
      'let3 art zero',
    ]
    const expectedResult = [
      'let1 art can',
      'let3 art zero',
      'let2 own kit dig',
      'dig1 8 1 5 1',
      'dig2 3 6',
    ]
    expect(reorderLogFiles(logs)).toEqual(expectedResult)
  })
})

describe('orangesRotting', () => {
  it('should return 4', () => {
    expect(
      orangesRotting([
        [2, 1, 1],
        [1, 1, 0],
        [0, 1, 1],
      ])
    ).toBe(4)
  })
  it('should return 2', () => {
    expect(
      orangesRotting([
        [2, 1, 1],
        [1, 1, 0],
        [0, 1, 2],
      ])
    ).toBe(2)
  })

  it('should return -1 when there are still good oranges left', () => {
    expect(
      orangesRotting([
        [2, 1, 1],
        [0, 1, 1],
        [1, 0, 1],
      ])
    ).toBe(-1)
  })

  it('should return 0 when there is no good oranges was at the beginning', () => {
    expect(orangesRotting([[0, 2]])).toBe(0)
  })
  it('should return 0 when there is no oranges at all', () => {
    expect(orangesRotting([[0]])).toBe(0)
  })
})

describe('levelOrder', () => {
  it('should return an empty array when the root is null', () => {
    expect(levelOrder(null)).toEqual([])
  })

  it('should return a single value for a leaf node', () => {
    const root = { val: 1, children: [] }
    expect(levelOrder(root)).toEqual([[1]])
  })

  it('should handle multiple levels correctly', () => {
    const root = {
      val: 1,
      children: [
        {
          val: 3,
          children: [
            { val: 5, children: [] },
            { val: 6, children: [] },
          ],
        },
        { val: 2, children: [] },
        { val: 4, children: [] },
      ],
    }
    expect(levelOrder(root)).toStrictEqual([[1], [3, 2, 4], [5, 6]])
  })
})

describe('dfs', () => {
  it('should return 0 when the tree is undefined', () => {
    expect(maxSumPath()).toBe(0) // null represents an empty tree
  })

  it('should return the max path sum in a single node tree', () => {
    const singleNodeTree = { val: 1 }
    expect(maxSumPath(singleNodeTree)).toBe(1)
  })

  it('should return the max path sum of a binary tree', () => {
    const testTree = {
      val: 1,
      left: { val: 4, left: { val: 2 }, right: { val: 3, left: { val: 2 } } },
      right: { val: 7, left: { val: 5 }, right: { val: 4 } },
    }
    expect(maxSumPath(testTree)).toBe(13)
  })

  it('should return the max path sum of a binary tree with negative values', () => {
    const testTree = {
      val: 1,
      left: { val: 4, left: { val: 2 }, right: { val: 3, left: { val: 2 } } },
      right: { val: -7, left: { val: 5 }, right: { val: 4 } },
    }
    expect(maxSumPath(testTree)).toBe(10)
  })
})

describe('140. Word Break II', () => {
  it('should return proper strings from the dict', () => {
    expect(wordBreak('catsanddog', ['cat', 'cats', 'and', 'sand', 'dog'])).toStrictEqual([
      'cats and dog',
      'cat sand dog',
    ])
    expect(
      wordBreak('pineapplepenapple', ['apple', 'pen', 'applepen', 'pine', 'pineapple'])
    ).toStrictEqual([
      'pine apple pen apple',
      'pineapple pen apple',
      'pine applepen apple',
    ])
  })
})

describe('dailyTemperatures', () => {
  it('should return correct result for example input', () => {
    const temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
    const expectedResult = [1, 1, 4, 2, 1, 1, 0, 0]
    const actualResult = dailyTemperatures(temperatures)
    expect(actualResult).toEqual(expectedResult)
  })
  it('should return correct result for example input', () => {
    const temperatures = [30, 40, 50, 60]
    const expectedResult = [1, 1, 1, 0]
    const actualResult = dailyTemperatures(temperatures)
    expect(actualResult).toEqual(expectedResult)
  })
  it('should return correct result for example input', () => {
    const temperatures = [30, 60, 90]
    const expectedResult = [1, 1, 0]
    const actualResult = dailyTemperatures(temperatures)
    expect(actualResult).toEqual(expectedResult)
  })
})

describe('topKFrequent', () => {
  it('should return the correct result when given an array with duplicates and k equals to the frequency of some elements', () => {
    const nums = [1, 1, 1, 2, 2, 3]
    const k = 2
    const expectedResult = [1, 2]
    const actualResult = topKFrequent(nums, k)

    expect(actualResult).toStrictEqual(expectedResult)
  })

  it('should return the correct result when given an array without duplicates and k is less than the total number of unique elements', () => {
    const nums = [1, 2, 3, 4, 5]
    const k = 2
    const expectedResult = [1, 2]
    const actualResult = topKFrequent(nums, k)
    expect(actualResult).toStrictEqual(expectedResult)
  })

  it('should return the correct result when given an array without duplicates and k is equal to the total number of unique elements', () => {
    const nums = [1, 2, 3, 4, 5]
    const k = 5
    const expectedResult = [1, 2, 3, 4, 5]
    const actualResult = topKFrequent(nums, k)
    expect(actualResult).toStrictEqual(expectedResult)
  })
  it('should return the correct result when given an array without duplicates and k is equal to the total number of unique elements', () => {
    const nums = [1]
    const k = 1
    const expectedResult = [1]
    const actualResult = topKFrequent(nums, k)
    expect(actualResult).toStrictEqual(expectedResult)
  })
  it('should return the correct result when given an array without duplicates and k is equal to the total number of unique elements', () => {
    const nums = [5, -3, 9, 1, 7, 7, 9, 10, 2, 2, 10, 10, 3, -1, 3, 7, -9, -1, 3, 3]
    const k = 3
    const expectedResult = [3, 7, 10]
    const actualResult = topKFrequent(nums, k)
    expect(actualResult).toStrictEqual(expectedResult)
  })
  it('should return the correct result when given an array without duplicates and k is equal to the total number of unique elements', () => {
    const nums = [-1, 1, 4, -4, 3, 5, 4, -2, 3, -1]
    const k = 3
    const expectedResult = [-1, 4, 3]
    const actualResult = topKFrequent(nums, k)
    expect(actualResult).toStrictEqual(expectedResult)
  })
})
