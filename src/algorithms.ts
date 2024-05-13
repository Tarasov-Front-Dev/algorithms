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
// console.log(subarraySum(arr, 5));
