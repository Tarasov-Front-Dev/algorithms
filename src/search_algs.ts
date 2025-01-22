'use strict'
export const arrSearch = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const arr100Search = new Array(100)
for (let i = 0; i < arr100Search.length; i++) {
    arr100Search[i] = i + 1
}

/***********LinearSearch***********/

export const linearSearch = (arr: number[], query: number) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === query) return i
    }
    return -1
}

/***********BinarySearch***********/

export const binarySearch = (arr: any[], query: any) => {
    let l = 0,
        r = arr.length - 1

    while (l <= r) {
        const mid = Math.floor(l + (r - l) / 2)

        if (arr[mid] === query) return mid

        if (arr[mid] < query) {
            l = mid + 1
        } else {
            r = mid - 1
        }
    }

    return -1
}
