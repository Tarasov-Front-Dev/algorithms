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
