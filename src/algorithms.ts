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
  let slow: List | null = list,
    fast: List | null = list
  while (fast !== null && fast.next !== null) {
    slow = slow!.next
    fast = fast.next.next
    if (slow === fast) break
  }
  if (fast === null || fast.next === null) return null
  slow = list
  while (slow !== fast) {
    slow = slow!.next
    fast = fast!.next
  }
  return slow
}

// ********* Search in 2D Matrix ***********
// Поиск значения в отсортированной 2D матрице	https://www.youtube.com/watch?v=iUSxT3-d5EU
// input: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]
// output: 5

export function searchMatrix(m: number[][], target: number) {
  let row = 0,
    col = m[0].length
  while (row < m.length && col >= 0) {
    if (m[row][col] === target) return true
    else if (m[row][col] < target) row++
    else col--
  }
  return false
}

// ******** 937. Reorder Data in Log Files ********

// input: ["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"]
// output: ["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]

// export const reorderLogFiles = function (logs: string[]) {
//   const body = (s: string) => s.slice(s.indexOf(' ') + 1) // get the body after indentifier
//   const isNum = (s: string) => /\d/.test(s)

//   // if body same then compare identifier
//   const compare = (a: string, b: string) => {
//     const n = body(a).localeCompare(body(b))
//     if (n !== 0) {
//       return n
//     }
//     return a.localeCompare(b)
//   }

//   const digitLogs = []
//   const letterLogs = []
//   for (const log of logs) {
//     if (isNum(body(log))) {
//       digitLogs.push(log)
//     } else {
//       letterLogs.push(log)
//     }
//   }

//   return letterLogs.sort(compare).concat(digitLogs)
// }

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
  const goodOranges = new Set<string>()
  let currLayer = new Set<string>(
    oranges.reduce((acc, row, rowIdx) => {
      acc.push(
        ...row.reduce((acc, v, col) => {
          if (v === 2) {
            acc.push(`${rowIdx}${col}`)
          }
          if (v === 1) {
            goodOranges.add(`${rowIdx}${col}`)
          }
          return acc
        }, [] as string[])
      )
      return acc
    }, [] as string[])
  )
  let minute = 0

  while (currLayer.size) {
    const newLayer = new Set<string>()
    for (const position of currLayer) {
      currLayer.delete(position)
      const moves = getMoves(position)
      for (const move of moves) {
        if (goodOranges.has(move)) {
          goodOranges.delete(move)
          newLayer.add(move)
        }
      }
    }
    if (newLayer.size) {
      minute++
    }
    currLayer = newLayer
  }

  if (goodOranges.size) {
    return -1
  }
  return minute

  function getMoves(position: string) {
    const [x, y] = position.split('').map(el => Number(el))
    const moves = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ].map(el => `${el[0]}${el[1]}`)
    return moves
  }
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
async function fetchPokemon(name: string): Promise<string | undefined> {
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
