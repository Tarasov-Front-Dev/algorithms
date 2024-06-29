import { describe, expect, it } from 'vitest'

import {
    all,
    decodeStringFromArr,
    flattenList,
    getIntervals,
    getPriceList,
    getRoute,
    getValues,
    promises,
    promisesWithError,
    recursiveFlat,
    reduce,
    returnSumNestElement,
} from './sberIt'

describe('Flatten List Function', () => {
    it('should flatten the list correctly', () => {
        expect(
            flattenList([
                1,
                'any [complex] string',
                null,
                [1, 2, [3, '4', [5]], 0],
                [],
                { a: 1 },
            ])
        ).toStrictEqual([1, 'any [complex] string', null, 1, 2, 3, '4', 5, 0, { a: 1 }])
    })
})

describe('Flatten List Recursive Function', () => {
    it('should flatten the list correctly', () => {
        expect(
            recursiveFlat([
                1,
                'any [complex] string',
                null,
                [1, 2, [3, '4', [5]], 0],
                [],
                { a: 1 },
            ])
        ).toStrictEqual([1, 'any [complex] string', null, 1, 2, 3, '4', 5, 0, { a: 1 }])
    })
})

describe('SumSublings', () => {
    it('Should sub siblings correctly', () => {
        expect(returnSumNestElement([0, 1, 2, 3, 4, 5])).toStrictEqual([1, 2, 4, 6, 8, 4])
        expect(returnSumNestElement([0, 2, 3, 4, 5, 6])).toStrictEqual([
            2, 3, 6, 8, 10, 5,
        ])
        expect(returnSumNestElement([2])).toStrictEqual([2])
        expect(returnSumNestElement([2, 5])).toStrictEqual([5, 2])
        expect(returnSumNestElement([9, 2, 3])).toStrictEqual([2, 12, 2])
    })
})

describe('getPriceList', () => {
    it('should return correct price', () => {
        expect(getPriceList(10)).toEqual(1)
        expect(getPriceList('14')).toEqual(3)
        expect(getPriceList(30)).toEqual(5)
        expect(getPriceList('35')).toEqual(9)
        expect(getPriceList(100)).toEqual(10)
        expect(getPriceList(0)).toBeFalsy()
        expect(getPriceList('abc')).toBeFalsy()
        expect(getPriceList('123a')).toBeFalsy()
    })
})

describe('reduce', () => {
    it('should reduce array correctly with initial value', () => {
        expect(reduce(['a', 'b', 'c', 'd'], (acc, item) => acc + item, '')).toEqual(
            'abcd'
        )
        expect(reduce([75, 25, 15, 35], (acc, item) => acc + item, 0)).toEqual(150)
        expect(reduce([1, 2, 3, 4], (acc, item) => [...acc, item * 2], [])).toStrictEqual(
            [2, 4, 6, 8]
        )
    })

    it('should reduce array without initial value correctly', () => {
        expect(reduce([75, 25, 15, 35], (acc, item) => acc + item)).toEqual(150)
        expect(reduce(['a', 'b', 'c', 'd'], (acc, item) => acc + item)).toEqual('abcd')
        expect(
            reduce([[1, 2], [3], [4, 5, 6]], (acc, item) => [...acc, ...item])
        ).toStrictEqual([1, 2, 3, 4, 5, 6])
    })
})

// describe('all() function', () => {
//   it('should resolve all the promises and return their values', async () => {
//     const expectedResult = [0, '1', 'a', 'b', 'c', 'd']
//     const result = await all(promises)
//     expect(result).toStrictEqual(expectedResult)
//   })

//   it('should handle errors from promises and rethrow them', async () => {
//     const err = await all(promisesWithError).catch(e => e)
//     expect(err).toBe('error')
//   })
// })

describe('getIntervals', () => {
    it('should handle simple array with no intervals', () => {
        expect(getIntervals([])).toBe('')
    })

    it('should handle single element array', () => {
        expect(getIntervals([1])).toBe('1')
    })

    it('should handle array with multiple consecutive numbers', () => {
        expect(getIntervals([1, 2, 3])).toBe('1-3')
    })

    it('should handle array with mixed non-consecutive numbers', () => {
        expect(getIntervals([1, 3, 2, 14, 6, 11, 5, 13, 12])).toBe('1-3, 5, 6, 11-14')
    })

    it('should handle array with negative numbers', () => {
        expect(getIntervals([-77, -78, -79, -10, -40, 0, -1, -2])).toBe(
            '-79--77, -40, -10, -2-0'
        )
    })
})

describe('getValues', () => {
    it('should return an array containing the values of all nodes', () => {
        const data = {
            value: 1,
            next: {
                value: 2,
                next: {
                    value: 3,
                    next: {
                        value: 4,
                        next: {
                            value: 5,
                            next: {
                                value: 6,
                            },
                        },
                    },
                },
            },
        }
        expect(getValues(data)).toStrictEqual([1, 2, 3, 4, 5, 6])
    })
})

describe('decodeStringFromArr', () => {
    it('should decode the string correctly', () => {
        const input = [
            { value: 'te j j', order: 4, expired: false },
            { value: 'ss  i', order: 2, expired: true },
            { value: 'ff kciuq', order: 1, expired: false },
            { value: 'xooff', order: 3, expired: false },
        ]
        expect(decodeStringFromArr(input)).toBe('quick foxjet')
    })

    it('should handle different inputs', () => {
        const input = [
            { value: '13331ds', order: 1, expired: false },
            { value: 'sshhjkhlvm', order: 2, expired: true },
            { value: '25524', order: 3, expired: false },
            { value: ';jl;jl', order: 4, expired: false },
        ]
        expect(decodeStringFromArr(input)).toBe('sd13425lj;')
    })

    it('should handle more complex cases', () => {
        const input = [
            { value: 'adfad ', order: 11, expired: false },
            { value: 'afa;pitn', order: 6, expired: true },
            { value: 'lllgf;dsd`6', order: 2, expired: false },
            { value: '54454543345 k', order: 8, expired: false },
        ]
        expect(decodeStringFromArr(input)).toBe('6`ds;fglk 543a')
    })
})

describe('getRoute', () => {
    it('should sort the routes correctly', () => {
        const routes = [
            { from: 'London', to: 'Moscow' },
            { from: 'NY', to: 'London' },
            { from: 'Portugal', to: 'NY' },
            { from: 'Moscow', to: 'SPb' },
            { from: 'SPb', to: 'Kairo' },
        ]
        const expectedRoutes = [
            { from: 'Portugal', to: 'NY' },
            { from: 'NY', to: 'London' },
            { from: 'London', to: 'Moscow' },
            { from: 'Moscow', to: 'SPb' },
            { from: 'SPb', to: 'Kairo' },
        ]
        expect(getRoute(routes)).toStrictEqual(expectedRoutes)
    })
})
