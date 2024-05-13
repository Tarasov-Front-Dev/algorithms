"use strict";
// ******* Prefix sums ***********

// const arr = [4, 2, 2, 1, 2, -3, 5, -8];
export function subarraySum(arr: number[], k: number) {
  if (!Array.isArray(arr))
    throw new Error("Provide a number array as an argument");
  if (!arr.length) return 0;
  const map = new Map<number, number>([[0, 1]]);
  let answer = 0,
    subarraySum = 0;
  for (const num of arr) {
    subarraySum += num;
    const diff = subarraySum - k;
    answer += map.get(diff) ?? 0;
    map.set(subarraySum, (map.get(subarraySum) ?? 0) + 1);
  }
  return answer;
}

// ************ Sliding Window *************

export const slidingWindow = (str: string) => {
  if (typeof str !== "string")
    throw new Error("Provide a string as an argument");

  const set = new Set<string>();
  let answer, left, right;
  answer = left = right = 0;
  while (right < str.length) {
    while (set.has(str[right])) set.delete(str[left++]);
    set.add(str[right++]);
    answer = Math.max(answer, right - left);
  }
  return answer;
};

// ************ Dynamic Programming ************

// [4, 11, 10, 1, 2, 8, 5]

export const dp = (arr: number[]) => {
  if (!Array.isArray(arr))
    throw new Error("Provide a number array as an argument");
  if (arr.length < 2) return arr[0] ?? 0;

  const answer = new Array(arr.length).fill(0);
  answer[0] = arr[0];
  answer[1] = Math.max(arr[0], arr[1]);
  for (let i = 2; i < arr.length; i++) {
    answer[i] = Math.max(answer[i - 2] + arr[i], answer[i - 1]);
  }
  return answer.at(-1) > 0 ? answer.at(-1) : 0;
};

// *************** Breadth-First Search ****************

export function bfs(x: number, y: number) {
  if (typeof x !== "number" || typeof y !== "number") {
    throw new Error("Provide numbers as arguments");
  }
  const target = x.toString() + y;
  let layer = 0;
  let current_layer = new Set(["00"]);
  const visited = new Set(["00"]);

  while (current_layer.size) {
    const next_layer = new Set<string>();
    for (const position of current_layer) {
      if (position === target) return layer;
      current_layer.delete(position);
      visited.add(position);
      const node = moves(position, visited);
      for (const neighbor of node) {
        if (neighbor === target) return ++layer;
        next_layer.add(neighbor);
      }
    }
    current_layer = next_layer;
    layer++;
  }
  return layer;
}

function moves(position: string, visited: Set<string>) {
  const [x, y] = position.split("");
  const possibleMoves = [
    [+x - 2, +y + 1],
    [+x - 2, +y - 1],
    [+x + 2, +y + 1],
    [+x + 2, +y - 1],
    [+x - 1, +y + 2],
    [+x + 1, +y + 2],
    [+x - 1, +y - 2],
    [+x + 1, +y - 2],
  ].map(el => el.join(""));
  return possibleMoves.reduce((acc: string[], v) => {
    if (!visited.has(v)) acc.push(v);
    return acc;
  }, []);
}

console.log(bfs(3, -3)); // 2
