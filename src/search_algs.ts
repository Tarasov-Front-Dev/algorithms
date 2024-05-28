'use strict'
export const arrSearch = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const arr100Search = new Array(100)
for (let i = 0; i < arr100Search.length; i++) {
  arr100Search[i] = i + 1
}
const query = 5

/***********LinearSearch***********/

export const linearSearch = (arr: number[], query: number) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === query) return i
  }
  return -1
}

/***********BinarySearch***********/

// const binarySearch = (arr, t) => {
//   let l = 0,
//     r = arr.length - 1
//   while (l <= r) {
//     const mid = Math.floor((l + r) / 2)
//     if (arr[mid] === t) return mid
//     if (arr[mid] < t) l = mid + 1
//     else r = mid - 1
//   }
//   return -1
// }

export const binarySearch = (arr: number[], t: number) => {
  let l = 0,
    r = arr.length - 1
  while (l <= r) {
    const mid = Math.floor((l + r) / 2)
    if (arr[mid] === t) return mid
    else if (arr[mid] < t) l = mid + 1
    else r = mid - 1
  }
  return -1
}
