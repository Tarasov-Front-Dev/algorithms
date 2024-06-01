'use strict'

// 	https://www.youtube.com/watch?v=R4UHOLZ-bEk

import { composeAsync, curry } from './shared/utils'

// ******* Subarray Sum ***********
// Префиксные суммы в несортированном массиве	https://www.youtube.com/watch?v=v5Y4vQ824cI
// Find all subarray sums equal to k. Return quantity of the subarrays
// Arguments: [4, 2, 2, 1, 2, -3, 5, -8], 5 // Result: 5 (subarrays)

export function subarraySum(arr: number[], k: number) {
  if (!Array.isArray(arr)) throw new TypeError('Provide a number array as an argument')
  if (!arr.length) return 0

  const map = new Map<number, number>([[0, 1]])
  let answer = 0
  let subarraySum = 0
  for (const num of arr) {
    subarraySum += num
    const diff = subarraySum - k
    answer += map.get(diff) ?? 0
    map.set(subarraySum, (map.get(subarraySum) ?? 0) + 1)
  }
  return answer
}

// ************ Sliding Window *************
// Метод скользящего окна	https://www.youtube.com/watch?v=kzPUYPfzT9A
// Find longest substring with no repeating chars. Return a length of the substring
// Arguments: 'abcbada' // Result: 4 (longest substring)

export const slidingWindow = (str: string) => {
  if (typeof str !== 'string') throw new TypeError('Provide a string as an argument')
  const set = new Set<string>()
  let answer, l, r
  answer = l = r = 0
  while (r < str.length) {
    while (set.has(str[r])) set.delete(str[l++])
    set.add(str[r++])
    answer = Math.max(answer, r - l)
  }
  return answer
}

// ************ Dynamic Programming ************
// Грабим Дома на Собеседовании в Google	https://www.youtube.com/watch?v=VQvyqrJltcU
// Find the greatest sum of an array's elements. You can not sum neighbor element
// Arguments: [4, 11, 10, 1, 2, 8, 5] // Result: 22 (max sum sequence)

export const dp = (arr: number[]) => {
  if (!Array.isArray(arr)) throw new Error('Provide a number array as an argument')
  const answer = Array.from({ length: arr.length }, () => 0)
  answer[0] = arr[0] > 0 ? arr[0] : 0
  answer[1] = Math.max(answer[0], arr[1] ?? 0)
  for (let i = 2; i < arr.length; i++) {
    answer[i] = Math.max(answer[i - 2] + arr[i], answer[i - 1])
  }
  return answer.at(-1)
}

// *************** Breadth-First Search ****************
// Поиск в Ширину на шахматной доске	https://www.youtube.com/watch?v=tgWTBwjy--A
// ChessBoard. Count a knight moves necessary to reach curtain field
// Arguments: 2, 1 // Result: 1 (move)

export const bfs = (x: number, y: number) => {
  if (typeof x !== 'number' || typeof y !== 'number')
    throw new Error('Provide numbers as arguments')
  const target = String(x) + String(y)
  const start = '00'
  const visited = new Set<string>()
  let queue = new Set([start])
  let layer = 0

  if (target === start) return layer
  while (true) {
    const newQueue = new Set<string>()
    for (const position of queue) {
      visited.add(position)
      const moves = getMoves(position, visited)
      for (const move of moves) {
        if (move === target) return layer + 1
        newQueue.add(move)
      }
    }
    if (!newQueue.size) break
    layer++
    queue = newQueue
  }
  return -1
}

const getMoves = (position: string, visited: Set<string>) => {
  const [x, y] = position.split('').map(el => Number(el))
  const moves = [
    [x - 2, y - 1],
    [x - 2, y + 1],
    [x + 2, y + 1],
    [x + 2, y - 1],
    [x + 1, y - 2],
    [x - 1, y - 2],
    [x - 1, y + 2],
    [x + 1, y + 2],
  ].map(move => move.join(''))
  return moves.reduce((acc, move) => {
    if (!visited.has(move)) acc.push(move)
    return acc
  }, [] as string[])
}

// *********** Find the circular reference in LinkedList **************
// Поиск начала цикла в односвязном списке	https://www.youtube.com/watch?v=4KCQpH4zQPE
// The given List may containt circular reference. Find it or return null

export type List = {
  val: number
  next: List | null
}

export const list = {
  val: 1,
  next: {
    val: 4,
    next: { val: 2, next: { val: 3, next: { val: 5, next: { val: 6 } } } },
  },
} as List
// circular reference to the element with value 2
// @ts-expect-error create circular reference
list.next.next.next.next.next.next = list.next.next

export function findCircularRef(list: List) {
  let slow: List | null = list
  let fast: List | null = list
  while (fast && fast.next) {
    slow = slow?.next!
    fast = fast.next.next
    if (slow === fast) break
  }
  if (!fast || !fast.next) return null
  slow = list
  while (slow !== fast) {
    slow = slow?.next!
    fast = fast?.next!
  }
  return slow
}

// ********* 240. Search a 2D Matrix II ***********
// Поиск значения в отсортированной 2D матрице	https://www.youtube.com/watch?v=iUSxT3-d5EU
// input: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 5
// output: true

export function searchMatrix(m: number[][], target: number) {
  let row = 0,
    col = m[0].length - 1
  while (row < m.length && col >= 0) {
    if (m[row][col] === target) return true
    if (m[row][col] < target) row++
    else col--
  }
  return false
}

// ******** 937. Reorder Data in Log Files ********

// Reorder these logs so that:
// The letter-logs come before all digit-logs.
// The letter-logs are sorted lexicographically by their contents. If their contents are the same, then sort them lexicographically by their identifiers.
// The digit-logs maintain their relative ordering.
// Return the final order of the logs.

// input: ["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"]
// output: ["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]

export function reorderLogFiles(logs: string[]) {
  const compare = (a: string, b: string) => {
    const compareFn = new Intl.Collator('en').compare
    const n = compareFn(body(a), body(b))
    return Boolean(n) ? n : compareFn(a, b)
  }
  const isNum = (str: string) => /\d/.test(str[0])
  const body = (str: string) => str.slice(str.indexOf(' ') + 1)

  const digitLogs = []
  const letterLogs = []
  for (const log of logs) {
    if (isNum(body(log))) digitLogs.push(log)
    else letterLogs.push(log)
  }

  return letterLogs.sort(compare).concat(digitLogs)
}

// ******** 994. Rotting Oranges *********

// input: [[2,1,1],[1,1,0],[0,1,1]]
// output: 4

export function orangesRotting(oranges: number[][]) {
  let queue = new Set<string>()
  const unvisited = new Set<string>()
  let layer = 0

  oranges.forEach((row, i) =>
    row.forEach((col, j) => {
      if (col === 2) queue.add(`${i}${j}`)
      if (col === 1) unvisited.add(`${i}${j}`)
    })
  )
  while (queue.size) {
    const newQueue = new Set<string>()
    for (const node of queue) {
      const moves = getMoves2(node, unvisited)
      for (const neighbour of moves) {
        unvisited.delete(neighbour)
        newQueue.add(neighbour)
      }
    }
    queue = newQueue
    if (newQueue.size) {
      layer++
    }
  }

  if (unvisited.size) return -1
  return layer
}

function getMoves2(position: string, unvisited: Set<string>) {
  const [x, y] = position.split('').map(el => Number(el))
  const newMoves = [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ].map(pos => pos.join(''))
  return newMoves.reduce((acc, pos) => {
    if (unvisited.has(pos)) acc.push(pos)
    return acc
  }, [] as string[])
}

// ********* 429. N-ary Tree Level Order Traversal *********

interface Node {
  val: number
  children: Node[]
}

// input: {val: 1,children: [{val: 3,children: [{ val: 5, children: [] },{ val: 6, children: [] },],},{ val: 2, children: [] },{ val: 4, children: [] },],}
// output: [[1],[3,2,4],[5,6]]

export const levelOrder = function (root: Node | null) {
  if (!root) {
    return []
  }
  const tree: [[Node, number]] = [[root, 0]]
  const answer: number[][] = []

  for (const row of tree) {
    const [elem, level] = row
    if (answer[level]) {
      answer[level].push(elem.val)
    } else {
      answer.push([elem.val])
    }

    for (const child of elem.children) {
      tree.push([child, level + 1])
    }
  }
  return answer
}

// ******* DFS in Binary tree *******
// Поиск максимальной суммы в бинарном дереве	https://www.youtube.com/watch?v=R4UHOLZ-bEk
// Find max sum path in the tree from the root
// input: { val:1, left:{ val:4, left:{ val:2 }, right:{ val:3,left:{ val:2 }}}, right:{ val:7, left:{ val:5 }, right:{ val:4 }}}

export interface BinaryTree {
  val: number
  left?: BinaryTree
  right?: BinaryTree
}

export function maxSumPath(root?: BinaryTree): number {
  if (!root || !root.val) {
    return 0
  }
  const left = maxSumPath(root.left)
  const right = maxSumPath(root.right)
  return Math.max(left, right) + root.val
}

// Find max sum path in the tree

export const maxSumPathAnyPosition = function (root?: BinaryTree) {
  let max = Number.NEGATIVE_INFINITY
  getMaxSum(root)
  return max

  function getMaxSum(node?: BinaryTree): number {
    if (!node) {
      return 0
    }
    const leftSum = getMaxSum(node.left)
    const rightSum = getMaxSum(node.right)
    max = Math.max(max, node.val + leftSum + rightSum)
    return Math.max(0, node.val + leftSum, node.val + rightSum)
  }
}

// ********* Fetching Pokemon + Promisification *********

type Pokemon = { sprites: { front_default: string } }
type PokemonShort = { name: string; url: string }

const _url = new URL('https://pokeapi.co/api/v2/pokemon/')
async function fetchPokemon(name: string): Promise<string | void> {
  if (!name) throw new Error("Must provide a pokemon's name")
  const url = new URL(_url.href)
  url.pathname += name
  try {
    const res = await fetch(url)
    const pokemon: Pokemon = await res.json()
    if (!pokemon?.sprites?.front_default)
      throw new Error('No front image for the pokemon')
    else return pokemon.sprites.front_default
  } catch (error) {
    console.log(error)
  }
}

async function imgCreationPromisified(
  cb: (err?: Error, data?: HTMLImageElement) => void,
  src: string | undefined
) {
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      imgCreation((err, data) => {
        if (err) rej(err)
        if (data) res(data)
      }, src)
    })
    cb(undefined, img)
    return img
  } catch (err) {
    if (err instanceof Error) return cb(err)
    console.log(err)
  }
}

function imgCreation(
  cb: (err?: Error, data?: HTMLImageElement) => void,
  src: string | undefined
): HTMLImageElement | undefined {
  if (!src) return
  const img = document.createElement('img')
  img.src = src
  img.style.position = 'absolute'
  img.style.top = '60px'
  img.onerror = () => cb(new Error('Loading pokemon image failed'))
  img.onload = () => cb(undefined, img)
  return img
}

function imgCreationHandler(
  onError: (err: Error) => void,
  onSuccess: (img: HTMLImageElement) => void,
  err?: Error,
  img?: HTMLImageElement
) {
  if (err) onError(err)
  if (img) onSuccess(img)
}

function imgCreationOnError(err: Error) {
  console.log(err)
}

function imgCreationOnSuccess(img: HTMLImageElement) {
  document.body.prepend(img)
}

const handeImgCreation = curry(imgCreationHandler)(
  imgCreationOnError,
  imgCreationOnSuccess
)
const createImg = curry(imgCreationPromisified)(handeImgCreation)
const fetchPokemonAndCreateImg = composeAsync(createImg, fetchPokemon)

let img: HTMLImageElement | null

async function placeInputToShowPokemon() {
  const form = document.createElement('form')
  form.id = 'fetchPokemon'
  form.addEventListener('submit', ev => submitHandler<typeof form>(ev, 'pokemonName'))

  const input = document.createElement('input')
  input.name = 'pokemonName'
  input.setAttribute('list', 'pokemonsList')
  input.autocomplete = 'off'

  const total = await getPokemonsQty()
  total.sort((a: PokemonShort, b: PokemonShort) => a.name.localeCompare(b.name))
  const options = total.map(({ name }: PokemonShort) => {
    const option = document.createElement('option')
    option.value = name
    return option
  })

  const datalist = document.createElement('datalist')
  datalist.id = 'pokemonsList'
  datalist.prepend(...options)

  form.prepend(input)
  input.after(datalist)
  document.body.prepend(form)

  async function submitHandler<T extends HTMLFormElement>(
    ev: SubmitEvent,
    input: keyof T
  ) {
    ev.preventDefault()
    if (img && 'remove' in img) img.remove()
    const form = ev.currentTarget as T
    const pokemonName = form[input].value
    img = await fetchPokemonAndCreateImg(pokemonName)
  }

  async function getPokemonsQty() {
    const url = new URL(_url.href)
    const response = await fetch(url)
    const data = await response.json()

    url.searchParams.set('limit', data.count)
    const responseTotal = await fetch(url)
    const total = await responseTotal.json()
    return total.results
  }
}
placeInputToShowPokemon()

// ****** 140. Word Break II ******

// Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.
// Note that the same word in the dictionary may be reused multiple times in the segmentation.

// Input: s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
// Output: ["cats and dog","cat sand dog"]

export function wordBreak(s: string, wordDict: string[]) {
  const dict = new Set(wordDict)
  const dp = Array.from({ length: s.length + 1 }, () => [] as string[])
  dp[0] = ['']
  for (let r = 1; r < s.length + 1; r++) {
    const temp = []
    for (let l = 0; l < r; l++) {
      const prefix = s.slice(l, r)
      if (dict.has(prefix)) {
        for (const substr of dp[l]) {
          temp.push(`${substr} ${prefix}`.trim())
        }
      }
    }
    dp[r] = temp
  }
  return dp.at(-1)?.reverse()
}

// ******* 739. Daily Temperatures *******
// Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.

// Input: temperatures = [73,74,75,71,69,72,76,73]
// Output: [1,1,4,2,1,1,0,0]

export const dailyTemperatures = function (t: number[]) {
  const n = t.length
  const answer = new Array(n).fill(0)
  const stack = []
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length && t[i] >= t[stack.at(-1)!]) stack.pop()
    answer[i] = (stack.at(-1) ?? i) - i
    stack.push(i)
  }
  return answer
}

// ******* 347. Top K Frequent Elements *******
// Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]

export function topKFrequent(nums: number[], k: number) {
  const answer = Array.from({ length: k }, () => [null, null])
  const map = new Map()
  for (const num of nums) {
    map.set(num, (map.get(num) ?? 0) + 1)
  }
  for (const [num, qty] of map.entries()) {
    const idx = answer.findIndex(([_, _qty]) => (_qty ?? -Infinity) < qty)
    if (~idx) {
      for (let i = k - 1; i > idx; i--) {
        answer[i] = answer[i - 1]
      }
      answer[idx] = [num, qty]
    }
  }
  return answer.map(([num]) => num)
}

// ********* Graphs *********

// const graph = {
//   A: { B: 2, C: 1 },
//   B: { F: 7 },
//   C: { D: 5, E: 2 },
//   D: { F: 2 },
//   E: { F: 1 },
//   F: { G: 1 },
//   G: {},
// }

type Graph = { [x: string]: { [y: string]: number } }

export const dejkstra = (graph: Graph, start: string, end: string) => {
  const queue = [start]
  const previous = new Map<string, { node: string; dist: number }>()
  previous.set(start, { node: '', dist: 0 })

  for (const node of queue) {
    const nodeDist = previous.get(node)!.dist
    for (const [neighbour, dist] of Object.entries(graph[node])) {
      const prevDist = previous.get(neighbour)?.dist ?? Infinity
      const newDist = nodeDist + dist
      if (prevDist > newDist) {
        previous.set(neighbour, { node, dist: newDist })
      }
      queue.push(neighbour)
    }
  }
  return producePath(previous, end)
}

function producePath(previous: Map<string, { node: string; dist: number }>, end: string) {
  const answer = [] as [string, number][]
  while (end) {
    answer.push([end, previous.get(end)!.dist])
    end = previous.get(end)!.node
  }
  return { path: answer.reverse(), ditances: previous }
}

// const breadthSearch = (graph, start, end) => {
//   const queue = [start]
//   const unique = new Set(start)
//   for (let i = 0; i < queue.length; i++) {
//     const node = graph[queue[i]]
//     for (const neighbor in node) {
//       if (neighbor === end) return true
//       if (!unique.has(neighbor)) {
//         unique.add(neighbor)
//         queue.push(neighbor)
//       }
//     }
//   }
//   return false
// }

// console.log(breadthSearch(graph, 'a', 'g'))

// ******* Tree *******

// const tree = [
//   {
//     v: 5,
//     c: [
//       {
//         v: 10,
//         c: [
//           {
//             v: 11,
//           },
//         ],
//       },
//       {
//         v: 7,
//         c: [
//           {
//             v: 5,
//             c: [
//               {
//                 v: 1,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     v: 5,
//     c: [
//       {
//         v: 10,
//       },
//       {
//         v: 15,
//       },
//     ],
//   },
// ]

// function sumTreeValuseIter(tree) {
//   if (!tree.length) return 0
//   const stack = [...tree]
//   let sum = 0
//   while (stack.length) {
//     const node = stack.pop()
//     console.log('node.v:', node.v)
//     sum += node.v ?? 0
//     if (node.c) stack.push(...node.c)
//   }
//   return sum
// }

// console.log('sumTreeValuseIter:', sumTreeValuseIter(tree))

// ******* Binary Tree *******

// class BinaryTree {
//   constructor() {
//     this.root = null
//   }

//   add(value) {
//     if (!this.root) {
//       this.root = new TreeNode(value)
//     } else {
//       let node = this.root
//       let newNode = new TreeNode(value)
//       while (node) {
//         if (value > node.value) {
//           if (!node.right) {
//             break
//           }
//           node = node.right
//         } else {
//           if (!node.left) {
//             break
//           }
//           node = node.left
//         }
//       }
//       if (value > node.value) {
//         node.right = newNode
//       } else {
//         node.left = newNode
//       }
//     }
//   }

//   print(root = this.root) {
//     if (!root) {
//       return true
//     }
//     console.log(root.value)
//     this.print(root.left)
//     this.print(root.right)
//   }
// }

// class TreeNode {
//   constructor(value) {
//     this.value = value
//     this.left = null
//     this.right = null
//   }
// }

// const tree = new BinaryTree()
// tree.add(5)
// tree.add(2)
// tree.add(6)
// tree.add(2)
// tree.add(1)
// tree.print()

// console.log(tree)

// ******* Amazon. Find the best answer (+ - / *) *******
// Problem: given an array with numbers apply to them operands in any order to get the biggest answer
// input: [1, -3, 0.1, -5]
// output: 150

export const findMax = (nums: number[]) => {
  if (!nums.length) return 0
  let max, min
  max = min = nums[0]

  for (const num of nums.slice(1)) {
    const mins = Array.from({ length: 4 }, () => 0)
    const maxs = Array.from({ length: 4 }, () => 0)

    mins[0] = min + num
    maxs[0] = max + num

    mins[1] = min - num
    maxs[1] = max - num

    mins[2] = min * num
    maxs[2] = max * num

    if (num) {
      mins[3] = min / num
      maxs[3] = max / num
    }

    min = Math.min(...mins, ...maxs)
    max = Math.max(...mins, ...maxs)
  }
  return max
}

// ******* 53. Maximum Subarray *******

export const maxSubArray = (nums: number[]) => {
  if (!nums.length) return 0
  let max, curr
  max = curr = nums[0]
  for (const num of nums.slice(1)) {
    curr = Math.max(num, num + curr)
    max = Math.max(max, curr)
  }
  return max
}

// ******* 5. Longest Palindromic Substring *******

export const longestPalindrome = (s: string) => {
  let longest = ''
  for (let i = 0; i < s.length; i++) {
    check(i, i)
    check(i, i + 1)
  }
  function check(l: number, r: number) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      const newStr = s.slice(l, r + 1)
      if (longest.length < newStr.length) longest = newStr
      l--
      r++
    }
  }
  return longest
}

// ******* 22. Generate Parentheses *******

// input: 3
// output: ["((()))","(()())","(())()","()(())","()()()"]

export const generateParenthesis = function (n: number) {
  let ans = [] as string[]
  backtracks()
  return ans

  function backtracks(s = '', left = 0, right = 0): void | number {
    if (s.length === n * 2) return ans.push(s)
    if (left < n) backtracks(s + '(', left + 1, right)
    if (right < left) backtracks(s + ')', left, right + 1)
  }
}

// ******* 463. Island Perimeter *******

export function islandPerimeter(grid: number[][]) {
  let perimeter = 0
  grid.forEach((row, i) =>
    row.forEach((col, j) => {
      if (col) {
        if (!grid[i - 1]?.[j]) perimeter++
        if (!grid[i + 1]?.[j]) perimeter++
        if (!grid[i]?.[j - 1]) perimeter++
        if (!grid[i]?.[j + 1]) perimeter++
      }
    })
  )
  return perimeter
}
