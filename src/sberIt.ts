'use strict'

/**********CustomFlat (no recursive)***********/

/*
Description
Данные остальных типов должны остаться без изменений.
Решение должно учитывать любую вложенность элементов (т.е. не должно содержать рекурсивные вызовы).
Использовать метод Array.prototype.flat() запрещено.
Task
*/

export function flattenList(arr: any[]) {
  const flattened = []
  const stack: any[] = []
  for (let i = arr.length - 1; i >= 0; i--) {
    while (stack.length) {
      if (Array.isArray(stack.at(-1))) stack.push(...stack.pop())
      else flattened.push(stack.pop())
    }
    if (Array.isArray(arr[i])) stack.push(arr[i])
    else flattened.push(arr[i])
  }
  return flattened.reverse()
}

/********CustomFlat (recursive)********/

export const recursiveFlat = (arr: any[]) => {
  const flattened: any[] = []
  arr.forEach(el => {
    if (Array.isArray(el)) flattened.push(...recursiveFlat(el))
    else flattened.push(el)
  })
  return flattened
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

export const returnSumNestElement = (arr: number[]) => {
  if (arr.length === 1) return arr
  let prev = 0
  for (let i = 0; i < arr.length; i++) {
    const sum = prev + (arr[i + 1] ?? 0)
    prev = arr[i]
    arr[i] = sum
  }
  return arr
}

/*********Get Price************/

const priceList = {
  '1-10': 1,
  '11-20': 3,
  '21-30': 5,
  '31-40': 9,
  '41-Infinity': 10,
}

type Key = keyof typeof priceList

export const getPriceList = (cost: number | string) => {
  if (!Number(cost) || Number(cost) === 0) return false

  const partial = Math.ceil(+cost / 10) - 1
  const key1 = `${partial ? partial : ''}1-${partial + 1}0` as Key
  const key2 = Object.keys(priceList).at(-1) as Key
  return priceList[key1] ?? priceList[key2]
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

export function reduce(
  arr: any[],
  cb: (acc: any, el: any, idx: any, arr: any[]) => any,
  init?: any
) {
  let i = 0
  let acc = init ?? arr[i++]
  while (i < arr.length) {
    acc = cb(acc, arr[i], i, arr)
    i++
  }
  return acc
}

/**********Async Timeout***********/

/*
Description
Дописать функцию в которой элементы массива будут последовательно выводиться в консоль спустя промежуток времени указанный в атрибуте timeout
*/

// const ARRAY = [
//   { name: "first", timeout: 2000 },
//   { name: "second", timeout: 1500 },
//   { name: "third", timeout: 1000 },
//   { name: "fourth" },
// ];

// function run(arr, i = 0) {
//   if (!arr.length) return;
//   if (!Array.isArray(arr)) return;

//   const { name, timeout = 0 } = arr[i];
//   if (!name) return;
//   setTimeout(() => {
//     console.log(name);
//     i++;
//     if (i < arr.length) return run(arr, i);
//   }, timeout);
// }

// run(ARRAY);

/**********OddOrEven***********/

// Реализовать функцию, которая возвращает либо четное, либо нечетное число из переданного в нее массива.
// Функция принимает на вход массив из [четных чисел с одним нечетным] или массив [нечетных чисел с одним четным]

// const evenOdd = (arr) => {
//   const even = arr.filter(num => num % 2 === 0)
//   const odd = arr.filter(num => num % 2 !== 0)
//   return even.length === 1 ? even[0] : odd[0]
// }

// console.log(evenOdd([1, 3, 5, 7, 8, 9]) === 8);
// console.log(evenOdd([2, 4, 6, 8, 9]) === 9);
// console.log(evenOdd([1]) === 1);

/********Custom Promise.all()******/

export const promises = [
  0,
  '1',
  Promise.resolve('a'),
  Promise.resolve('b'),
  new Promise(resolve => setTimeout(() => resolve('c'), 1000)),
  new Promise(resolve => setTimeout(() => resolve('d'), 100)),
]

export const promisesWithError = [
  '0',
  1,
  Promise.resolve('c'),
  new Promise((_, reject) => setTimeout(() => reject('error'), 200)),
]

export async function all(promises: any[]) {
  const result = []
  let fullfield = 0
  for (let i = 0; i < promises.length; i++) {
    try {
      const response = await Promise.resolve(promises[i])
      result[i] = response
      fullfield++
      if (fullfield === promises.length) return result
    } catch (error) {
      throw error
    }
  }
}

/**********getIntervals***********/

/* 
Написать функцию getIntervals, которая принимает массив и возвращает строку интервалов через запятую. Если с инкрементом идут 3 и более числа подряд, то крайние числа нужно склеить через "-".

В случае, если передан не массив — возвращаем пустую строку
*/

export function getIntervals(arr: number[]) {
  if (!Array.isArray(arr)) return ''
  const sortedArr = arr.toSorted((a, b) => a - b)
  const result = []

  for (let i = 0; i < sortedArr.length; i++) {
    const start = sortedArr[i]
    while (i < sortedArr.length && sortedArr[i] + 1 === sortedArr[i + 1]) i++
    const end = sortedArr[i]

    if (start === end) result.push(start)
    if (start + 1 === end) result.push(`${start}, ${end}`)
    if (start + 1 < end) result.push(`${start}-${end}`)
  }

  return result.join(', ')
}

/**********Linked List***********/

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

export function getValues(list: any) {
  const result = []

  while (list) {
    result.push(list.value ?? null)
    list = list.next
  }

  return result
}

/**********Custom Carry***********/

// function curry(fn) {
//   return function curried() {
//     if (arguments.length === fn.length) return fn(...arguments);
//     return (...newArgs) => {
//       return curried.call(this, ...arguments, ...newArgs);
//     };
//   };
// }

// const user = {
//   name: 'Tolya',
//   age: 34,
//   skills: ['React', 'Typescript', 'HTML+CSS'],
// }

// function curry(fn) {
//   return function curried(...args) {
//     const argsCloned = structuredClone(args)
//     if (argsCloned.length === fn.length) return fn.apply(this, argsCloned)
//     return (...newArgs) => {
//       const target = argsCloned.indexOf(user)
//       if (~target) argsCloned[target].skills.push('Redux')
//       return curried.apply(this, argsCloned.concat(newArgs))
//     }
//   }
// }

// const sum = (a, w, d, x, v, z) => a + d + x + v + z
// const curriedSum = curry(sum)

// console.log(curriedSum()(1)(user)(2, 3)(2)(3), 11)
// console.log(user)

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

type encodeString = {
  value: string
  order: number
  expired: boolean
}

export function decodeStringFromArr(arr: encodeString[]) {
  return [
    ...new Set(
      arr
        .filter(item => !item.expired)
        .sort((a, b) => a.order - b.order)
        .reduce((acc, item) => {
          acc.push(...item.value.split('').reverse())
          return acc
        }, [] as string[])
    ),
  ].join('')
}

/**********routeOrder***********/

/*
  У нас есть набор билетов вида:
  // const tickets = [
  //   {from: 'London',to: 'Moscow'},
  //   {from: 'NY',to: 'London'},
  //   {from: 'Portugal',to: 'NY'},
  //   {from: 'Moscow',to: 'SPb'},
  //   {from: 'SPb',to: 'Kairo'}
  // ];

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

export function getRoute(routes: Route[]) {
  return routes.toSorted((a, b) => (a.to.localeCompare(b.from) ? 0 : -1))
}
