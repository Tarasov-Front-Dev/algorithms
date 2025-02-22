// "use strict";

/********Constants*******/
export const arr100WithRepeats = [
    95, 38, 51, 84, 4, 45, 26, 69, 63, 66, 85, 21, 86, 18, 93, 28, 36, 49, 48, 5, 42, 12, 43, 54, 64, 1, 47, 55, 91, 90, 80, 61, 87, 70, 6,
    24, 1, 25, 20, 74, 29, 11, 78, 73, 77, 10, 62, 68, 60, 37, 9, 88, 46, 81, 8, 89, 16, 50, 95, 94, 27, 83, 82, 15, 2, 17, 32, 31, 33, 53,
    13, 92, 56, 52, 57, 14, 72, 30, 39, 41, 65, 67, 40, 19, 3, 23, 34, 95, 58, 75, 95, 35, 79, 44, 59, 22, 76, 71, 7, 1,
]
// const createVeryBigArr = () => {
//   const arr = new Array(1e6).fill(null)
//   for (let i = 0; i < 1e6; i++) {
//     arr[i] = Math.random() * 1e6
//   }
//   return arr
// }
// const step = 0

// class Sort {
//     sortFn: (arr: any[]) => any[]
//     sortedArr: any[] = []

//     constructor(sortFn: (arr: any[]) => any[]) {
//         this.sortFn = sortFn
//     }

//     sort(arr: any[]): any[] {
//         this.sortedArr = arr

//         this.sortedArr = this.sortFn(this.sortedArr)

//         return this.sortedArr
//     }

//     checkPerfomanceInSeconds(arr: any[]) {
//         //Heating
//         for (let i = 0; i < 1_000_000; i++) {
//             this.sortFn(arr)
//         }
//         //Execute perfomance check
//         const start = performance.now()
//         for (let i = 0; i < 1_000_000; i++) {
//             this.sortFn(arr)
//         }
//         return ((performance.now() - start) / 1000).toFixed(3)
//     }
// }

// /***********BubbleSort***********/

// export const bubbleSort = (arr: number[]) => {
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 1; j < arr.length - i; j++) {
//             if (arr[j - 1] > arr[j]) [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
//         }
//     }

//     return arr
// }

export const bubbleSort = (nums: number[]) => {
    const n = nums.length
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i; j++) {
            if (nums[j] > nums[j + 1]) {
                ;[nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
            }
        }
    }

    return nums
}

// const bubbleSorter = new Sort(bubbleSort)
// const bubbleSortedArr = bubbleSorter.sort(arr100WithRepeats)

// console.log('bubbleSort:', bubbleSortedArr, `length: ${bubbleSortedArr.length}`)
// console.log('step:', step)

// // perfomance check
// console.log(
//   "perfomance bubbleSort:",
//   bubbleSorter.checkPerfomanceInSeconds(arr100WithRepeats),
//   "seconds"
// );
// step = 0;

// /***********SelectedSort***********/

export const selectedSort = (nums: number[]) => {
    const n = nums.length

    for (let i = 0; i < n; i++) {
        let min = i

        for (let j = i + 1; j < n; j++) {
            if (nums[j] < nums[i]) {
                min = j
            }
        }

        // eslint-disable-next-line no-extra-semi
        ;[nums[i], nums[min]] = [nums[min], nums[i]]
    }

    return nums
}

// const selectedSorter = new Sort(selectedSort)
// const selectedSortedArr = selectedSorter.sort(arr100WithRepeats)

// console.log('selectedSort:', selectedSortedArr, `length: ${selectedSortedArr.length}`)
// console.log('step:', step)

// perfomance check
// console.log(
//   'perfomance selectedSort:',
//   selectedSorter.checkPerfomanceInSeconds(arr100WithRepeats),
//   'seconds'
// )
// step = 0

// /***********QuickSort***********/

export const quickSort = (nums: number[]): number[] => {
    if (nums.length < 2) return nums

    const pivot = nums[0]
    const left = [] as number[]
    const right = [] as number[]
    const middle = [] as number[]

    for (const num of nums) {
        if (num < pivot) left.push(num)
        if (num > pivot) right.push(num)
        if (num === pivot) middle.push(num)
    }

    return quickSort(left).concat(middle, quickSort(right))
}

// step = 0
// const quickSorter = new Sort(quickSort)
// const quickSortedArr = quickSorter.sort(arr100WithRepeats)

// console.log('quickSort:', quickSortedArr, `length: ${quickSortedArr.length}`)
// console.log('step:', step)

// // perfomance check
// console.log(
//   "perfomance quickSort:",
//   quickSorter.checkPerfomanceInSeconds(arr100WithRepeats),
//   "seconds"
// );
// step = 0;

// /***********MergeSort***********/

// // faster;
// const merge = (left, right) => {
//   const sorted = [];
//   while (left.length && right.length) {
//     step++;
//     if (left.at(-1) < right.at(-1)) sorted.push(left.pop());
//     else sorted.push(right.pop());
//   }
//   return sorted.concat(left.reverse(), right.reverse());
// };

// const mergeSort = (arr) => {
//   if (arr.length < 2) return arr;
//   const mid = Math.floor(arr.length / 2);
//   const left = mergeSort(arr.slice(0, mid)).reverse();
//   const right = mergeSort(arr.slice(mid)).reverse();
//   return merge(left, right);
// };

// const mergeSorter = new Sort(mergeSort)
// const mergeSortedArr = mergeSorter.sort(arr100WithRepeats)

// console.log('mergeSort:', mergeSortedArr, `length: ${mergeSortedArr.length}`)
// console.log(`mergeSortedArr length: ${mergeSortedArr.length}`)
// console.log('step:', step)

// /*****************Merge Sort By Index********************/

export const mergeSortByIndex = (nums: number[]): number[] => {
    if (nums.length < 2) return nums

    const mid = Math.floor(nums.length / 2)
    const left = mergeSortByIndex(nums.slice(0, mid))
    const right = mergeSortByIndex(nums.slice(mid))

    return merge(left, right)
}

export const merge = <T extends number[]>(left: T, right: T) => {
    const sorted = [] as number[]
    let l = 0,
        r = 0

    while (l < left.length || r < right.length) {
        if (left[l] < (right[r] ?? Infinity)) {
            sorted.push(left[l++])
        } else {
            sorted.push(right[r++])
        }
    }

    return sorted
}

// step = 0
// const mergeSorterByIndex = new Sort(mergeSortByIndex)
// const mergeSortedByIndexArr = mergeSorterByIndex.sort(arr100WithRepeats)
// console.log(
//     'mergeSortedByIndexArr:',
//     mergeSortedByIndexArr,
//     `length: ${mergeSortedByIndexArr.length}`
// )
// console.log(`mergeSortedByIndexArr length: ${mergeSortedByIndexArr.length}`)
// console.log('step:', step)

// // perfomance check
// console.log(
//   "perfomance mergeSort:",
//   mergeSorter.checkPerfomanceInSeconds(arr100WithRepeats),
//   "seconds"
// );

// // perfomance check
// console.log(
//   "perfomance mergeSortByIndex:",
//   mergeSorterByIndex.checkPerfomanceInSeconds(arr100WithRepeats),
//   "seconds"
// );
// step = 0;
