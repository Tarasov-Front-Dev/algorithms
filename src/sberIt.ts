'use strict'

/**********CustomFlat (no recursive)***********/

/*
Description
Данные остальных типов должны остаться без изменений.
Решение должно учитывать любую вложенность элементов (т.е. не должно содержать рекурсивные вызовы).
Использовать метод Array.prototype.flat() запрещено.
Task
*/

export const flattenList = (arr: any[]): any[] => {
    const flatten = [] as any[]
    const stack = [] as any[]

    for (let i = arr.length - 1; i >= 0; i--) {
        while (stack.length) {
            if (Array.isArray(stack.at(-1))) {
                stack.push(...stack.pop())
            } else {
                flatten.push(stack.pop())
            }
        }

        if (Array.isArray(arr[i])) {
            stack.push(...arr[i])
        } else {
            flatten.push(arr[i])
        }
    }

    return flatten.reverse()
}

/********CustomFlat (recursive)********/

export const recursiveFlat = (arr: any[]) => {
    const answer: any[] = []

    for (const val of arr) {
        if (Array.isArray(val)) answer.push(...recursiveFlat(val))
        else answer.push(val)
    }

    return answer
}

/*********Console.log Sequence**********/

// setTimeout(() => console.log(a, b, c), 0)

// const promise = new Promise(resolve => {
//   // @ts-expect-error should throw an error because 'a' indentifier isn't initialized yet
//   a++
//   // @ts-expect-error should throw an error coz no argument provided
//   resolve()
// })

// const a = 1

// promise
//   .then(() => console.log(a))
//   .catch(() => console.log(b--))
//   .catch(() => console.log(0))

// let b = 2

// // @ts-expect-error should throw an error coz 'c' identifier initialized later
// console.log(c)

// // eslint-disable-next-line no-var
// var c = 3

/**********Console.log Sequence***********/

// Promise.reject('a')
//   .then(p => p + 'b')
//   .catch(p => p + 'c')
//   .then(p => p + 'd')
//   .catch(p => p + 'e')
//   .then(p => p + 'f')
//   .then(console.log)
//   .finally(console.log)

/**********SumSublings**********/

/*
Реализовать функцию которая,
получив на вход массив целых чисел,
для каждого элемента этого списка вычисляет сумму двух его соседей.

Дополнительная сложность!
Перезаписывать элементы в существующем массиве по промежуточным результатам без его клонирования/копирования
*/

// input [0, 1, 2, 3, 4, 5]
// output [1, 2, 4, 6, 8, 4]

export const returnSumNestElement = (nums: number[]) => {
    let prev = 0

    for (let i = 0; i < nums.length; i++) {
        const sum = prev + (nums[i + 1] ?? 0)
        prev = nums[i]

        nums[i] = sum
    }

    return nums
}

/*********Get Price************/

const priceList = {
    '1-10': 1,
    '11-20': 3,
    '21-30': 5,
    '31-40': 9,
    '41-Infinity': 10,
}

export const getPriceList = (cost: number) => {
    const part1 = Math.ceil(cost / 10) - 1
    const key1 = `${part1 || ''}1-${part1 + 1}0` as keyof typeof priceList
    const key2 = Object.keys(priceList).at(-1) as keyof typeof priceList

    return priceList[key1] ?? priceList[key2 ?? '0']
}

/**********CustomReducer***********/

/*
Description
Написать функцию reduce

// Пример использования
const sum = (a, b) => a + b;
reduce([75, 25, 15, 35], sum, 0); // => 150
reduce(["a", "b", "c", "d"], sum, ""); // => abcd
*/

export const reduce = <T, U>(arr: T[], cb: (prev: T | NonNullable<U>, item: T, idx: number, arr: T[]) => T | NonNullable<U>, init?: U) => {
    let i = 0
    let prev = init ?? arr[i++]

    while (i < arr.length) {
        prev = cb(prev, arr[i], i, arr)

        i++
    }

    return prev
}

/**********Async Timeout***********/

/*
Description
Дописать функцию в которой элементы массива будут последовательно выводиться в консоль спустя промежуток времени указанный в атрибуте timeout
*/

// const timeouts = [
//     { name: 'first', timeout: 2000 },
//     { name: 'second', timeout: 1500 },
//     { name: 'third', timeout: 1000 },
//     { name: 'fourth' },
// ]
// type Timeouts = typeof timeouts

// export const run = (timeouts: Timeouts, i = 0) => {
//     if (i >= timeouts.length) return

//     setTimeout(() => {
//         console.log(timeouts[i].name)
//         run(timeouts, i + 1)
//     }, timeouts[i].timeout ?? 0);
// }

/**********OddOrEven***********/

// Реализовать функцию, которая возвращает либо четное, либо нечетное число из переданного в нее массива.
// Функция принимает на вход массив из [четных чисел с одним нечетным] или массив [нечетных чисел с одним четным]

// const evenOdd = (nums: number[]) => {
//     if (nums.length === 1) return nums[0]

//     let even = 0, odd = 0
//     let evenNum = 0, oddNum = 0

//     for (const num of nums) {
//         const isEven = num % 2 === 0

//         if (isEven) {
//             even++
//             evenNum = num
//         } else {
//             odd++
//             oddNum = num
//         }
//     }

//     if (even > 1 && odd === 1) return oddNum
//     if (odd > 1 && even === 1) return evenNum
// }

// console.log(evenOdd([1, 3, 5, 7, 8, 9]) === 8)
// console.log(evenOdd([2, 3, 4, 6, 8]) === 3)
// console.log(evenOdd([1]) === 1)
// console.log(evenOdd([1, 3]) === undefined)
// console.log(evenOdd([1, 3, 4, 6]) === undefined)
// console.log(evenOdd([]) === undefined)

/********Custom Promise.all()******/

export const promises = [
    0,
    '1',
    Promise.resolve('a'),
    Promise.resolve('b'),
    new Promise(resolve => {
        setTimeout(() => resolve('c'), 5_000)
    }),
    new Promise(resolve => {
        setTimeout(() => resolve('d'), 2_000)
    }),
]

export const promisesWithError = ['0', 1, Promise.resolve('c'), new Promise((_, reject) => setTimeout(() => reject('error'), 200))]

// const all = async (promises: (Promise<unknown> | string | number)[]) => {
//     const answer = new Array(promises.length).fill(null)

//     for (let i = 0; i < promises.length; i++) {
//         const data = await Promise.resolve(promises[i])
//         answer[i] = data
//     }

//     return answer
// }

// export const all = async(promises: Promise<unknown>[] | any[]) => {
//     const n = promises.length
//     const answer = new Array(n).fill(null)
//     let resolvedPromises = promises.length

//     return new Promise((res, rej) => {
//         for (let i = 0; i < promises.length; i++) {
//             Promise.resolve(promises[i])
//                 .then(data => {
//                     answer[i] = data
//                     resolvedPromises--

//                     if (!resolvedPromises) return res(answer)
//                 }).catch(e => rej(e))
//         }
//     })
// }

// all(promises).then(console.log).catch(console.log) // [0, '1', 'a', 'b', 'c', 'd']
// all(promisesWithError).then(console.log).catch(console.log) // 'error'

/**********getIntervals***********/

/* 
Написать функцию getIntervals, которая принимает массив и возвращает строку интервалов через запятую. Если с инкрементом идут 3 и более числа подряд, то крайние числа нужно склеить через "-".

В случае, если передан не массив — возвращаем пустую строку
*/

// input: [1, 3, 2, 14, 6, 11, 5, 13, 12]
// output: '1-3, 5, 6, 11-14'

export function getIntervals(arr: number[]) {
    const answer = [] as (number | string)[]
    const copied = arr.slice().sort((a, b) => a - b)
    for (let i = 0; i < copied.length; i++) {
        const start = copied[i]
        while (i < copied.length && copied[i] + 1 === copied[i + 1]) i++
        const end = copied[i]

        if (start === end) answer.push(start)
        else if (start + 1 === end) answer.push(start, end)
        else answer.push(`${start}-${end}`)
    }
    return answer.join(', ')
}

/**********Linked List***********/

export function getValues(list: any) {
    const answer = [] as number[]
    while (list) {
        if (list.value) answer.push(list.value)
        list = list.next
    }
    return answer
}

/**********Custom Carry***********/

// const curry = (cb: (...args: any[]) => any) =>
//     function curried(...args: any[]) {
//         if (args.length === cb.length) return cb(...args)

//         return (...newArgs: any[]) => curried.call(this, ...args, ...newArgs)
//     }

// const sum = (a: number, b: number, c: number, d: number, e: number) => a + b + c + d + e
// const curriedSum = curry(sum)

// console.log(curriedSum()(1)()(2, 3)(2)(3), 11)

/**********decodeStringFromArr***********/

/*
Функция преобразует массив объектов в строку. Требования к строке:
  - собирается из значений value, написанных в обратном порядке букв
  - не содержит одинаковых символов
  - использует не просроченные записи (expired: false)
  - собирается в порядке возрастания order

input = [
  { value: 'ss  i', order: 2, expired: true },
  { value: 'evol', order: 3, expired: true },
  { value: 'ff kciuq', order: 1, expired: false },
  { value: 'te j j', order: 5, expired: false },
  { value: 'xooff', order: 4, expired: false },
];

output = 'quick foxjet'
*/

type EncodeString = {
    value: string
    order: number
    expired: boolean
}

export function decodeStringFromArr(arr: EncodeString[]) {
    return [
        ...new Set(
            arr
                .filter(el => !el.expired)
                .toSorted((a, b) => a.order - b.order)
                .reduce((acc, el) => acc.concat(el.value.split('').reverse()), [] as string[])
        ),
    ].join('')
}

/**********routeOrder***********/

/*
  У нас есть набор билетов вида:
  const tickets = [
    {from: 'London',to: 'Moscow'},
    {from: 'NY',to: 'London'},
    {from: 'Portugal',to: 'NY'},
    {from: 'Moscow',to: 'SPb'},
    {from: 'SPb',to: 'Kairo'}
  ];

  Из этих билетов можно построить единственный, неразрывный маршрут.
  Петель и повторов в маршруте нет.

  Нужно написать программу, которая возвращает список билетов
  в порядке следования по маршруту.

  Нужно решить за O( n )
*/

type Route = {
    from: string
    to: string
}

export const getRoute = (routes: Route[]) => routes.toSorted((a, b) => (a.to === b.from ? -1 : 0))

/**********UnZip a String***********/

export function lcr(s: string) {
    s = decodeSingleChars(s)
    s = decodeChunks(s)

    return s
}

function decodeSingleChars(s: string) {
    const regexp = /(\d+)([A-Z])/g
    const replacer = (_: string, mult: string, char: string) => char.repeat(Number(mult))

    s = s.replace(regexp, replacer)

    return s
}

function decodeChunks(s: string) {
    const regexp = /(\d+)\(([A-Z]+)\)/g
    const replacer = (_: string, mult: string, chunk: string) => chunk.repeat(Number(mult))

    while (regexp.test(s)) {
        s = s.replace(regexp, replacer)
    }

    return s
}

// result = '3AB2(C3(KA)Z)2B3(KA)'

/**********Sum sizes of the files***********/

export const calcTotalSize = (root: object, path?: string) => {
    const rootDir = findRootDir(root, path)
    return rootDir && calcSizeOfTree(rootDir)
}

function findRootDir(root: object, path = '/') {
    const chunks = path.split('/').filter(Boolean)
    let target: object | number | undefined = root

    for (const chunk of chunks) {
        target = dfs(root, chunk)
    }

    return target

    function dfs(root: object, chunk: string): object {
        if (chunk in root) return { val: root[chunk as keyof typeof root] } // when returns a number wrap it with object

        for (const neigh of Object.values(root)) {
            if (typeof neigh === 'object') {
                const found = dfs(neigh, chunk)

                if (found) return found
            }
        }

        return {}
    }
}

function calcSizeOfTree(root: object) {
    let totalSize = 0

    for (const val of Object.values(root)) {
        if (typeof val === 'object') {
            totalSize += calcSizeOfTree(val)
        } else {
            totalSize += val
        }
    }

    return totalSize
}
