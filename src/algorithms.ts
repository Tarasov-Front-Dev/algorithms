'use strict'
// ******* Subarray Sum ***********
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
// Find longest substring with no repeating chars. Return a length of the substring
// Arguments: 'abcbada' // Result: 4 (longest substring)

export function slidingWindow(str: string) {
  if (typeof str !== 'string') throw new TypeError('Provide a string as an argument')

  const unique = new Set()
  let answer, left, right
  answer = left = right = 0
  while (right < str.length) {
    while (unique.has(str[right])) {
      unique.delete(str[left++])
    }
    unique.add(str[right++])
    answer = Math.max(answer, right - left)
  }
  return answer
}

// ************ Dynamic Programming ************
// Find the greatest sum of an array's elements. You can not sum neighbor element
// Arguments: [4, 11, 10, 1, 2, 8, 5] // Result: 22 (max sum sequence)

export function dp(arr: number[]) {
  if (!Array.isArray(arr)) throw new TypeError('Provide a number array as an argument')
  if (arr.length < 2) return arr[0] > 0 ? arr[0] : 0

  const answer = Array.from({ length: arr.length }, () => 0)
  answer[0] = arr[0] > 0 ? arr[0] : 0
  answer[1] = Math.max(answer[0], arr[1])
  for (let i = 2; i < arr.length; i++) {
    answer[i] = Math.max(answer[i - 2] + arr[i], answer[i - 1])
  }
  return answer.at(-1)
}

// *************** Breadth-First Search ****************
// ChessBoard. Count a knight moves necessary to reach curtain field
// Arguments: 2, 1 // Result: 1 (move)

export function bfs(x: number, y: number) {
  if (typeof x !== 'number' || typeof y !== 'number')
    throw new TypeError('Provide numbers as arguments')

  let layer = 0
  const target = `${x}${y}`
  let currentLayer = new Set<string>(['00']) // knight's start position
  const visited = new Set<string>()

  while (currentLayer.size) {
    const newLayer = new Set<string>()
    for (const position of currentLayer) {
      if (position === target) {
        return layer
      }
      currentLayer.delete(position)
      visited.add(position)
      const node = getMoves(position, visited)
      for (const neighbor of node) {
        if (neighbor === target) {
          return layer + 1
        }
        newLayer.add(neighbor)
      }
    }
    ++layer
    currentLayer = newLayer
  }
  return -1
}

function getMoves(position: string, visited: Set<string>) {
  const [x, y] = position.split('').map(el => Number.parseInt(el))
  const moves = [
    [x + 2, y + 1],
    [x + 2, y - 1],
    [x - 2, y + 1],
    [x - 2, y - 1],
    [x + 1, y + 2],
    [x - 1, y + 2],
    [x + 1, y - 2],
    [x - 1, y - 2],
  ].map(move => move.join(''))

  return moves.reduce((acc, move) => {
    if (!visited.has(move)) {
      acc.push(move)
    }
    return acc
  }, [] as string[])
}
