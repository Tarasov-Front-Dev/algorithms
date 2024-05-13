import { describe, expect, it } from "vitest";

import { dp, slidingWindow, subarraySum } from "./algorithms";

describe("prefixSums", () => {
  describe("should throw an error", () => {
    it("should throw an error if the first argument is not an array", () => {
      expect(() => subarraySum(null as unknown as number[], 5)).toThrowError(
        "Provide a number array as an argument"
      );
      expect(() =>
        subarraySum(undefined as unknown as number[], 5)
      ).toThrowError("Provide a number array as an argument");
      expect(() =>
        subarraySum("string" as unknown as number[], 5)
      ).toThrowError("Provide a number array as an argument");
    });
  });

  describe("should return 0 in corner cases", () => {
    it("should return 0 if the array is empty", () => {
      expect(subarraySum([], 5)).toBe(0);
    });
    it("should return 0 if the array has one element", () => {
      expect(subarraySum([3], 5)).toBe(0);
    });
    it("should return 0 if the array has exactly the one target element", () => {
      expect(subarraySum([5], 5)).toBe(1);
    });
  });

  describe("should return correct answer", () => {
    it("should return the correct count of subarrays with sum equal to k", () => {
      const arr = [4, 2, 2, 1, 2, -3, 5, -8];
      expect(subarraySum(arr, 5)).toBe(5);
    });

    it("should return 0 if no subarray with sum equal to k exists", () => {
      const arr = [1, 2, 3, 4, 5];
      expect(subarraySum(arr, 10)).toBe(1);
    });

    it("should handle negative numbers correctly", () => {
      const arr = [-1, -2, -3, -4, -5];
      expect(subarraySum(arr, -3)).toBe(2);
    });
  });
});

describe("slidingWindow", () => {
  describe("should throw an error", () => {
    it("should throw an error if the argument is not a string", () => {
      expect(() => slidingWindow(null as unknown as string)).toThrowError(
        "Provide a string as an argument"
      );
      expect(() => slidingWindow(undefined as unknown as string)).toThrowError(
        "Provide a string as an argument"
      );
      expect(() => slidingWindow(123 as unknown as string)).toThrowError(
        "Provide a string as an argument"
      );
    });
  });

  describe("should return correct answer", () => {
    it("should return the length of the string if all characters are unique", () => {
      expect(slidingWindow("abcdefg")).toBe(7);
    });

    it("should return the length of the longest substring without repeating characters", () => {
      expect(slidingWindow("abcbada")).toBe(4);
      expect(slidingWindow("axbxcxd")).toBe(3);
    });

    it("should return 1 if all characters are the same", () => {
      expect(slidingWindow("aaaaaaa")).toBe(1);
    });

    it("should return 0 if the string is empty", () => {
      expect(slidingWindow("")).toBe(0);
    });
  });
});

describe("dp", () => {
  describe("should throw an error", () => {
    it("should throw an error if the first argument is not an array", () => {
      expect(() => dp(null as unknown as number[])).toThrowError(
        "Provide a number array as an argument"
      );
      expect(() => dp(undefined as unknown as number[])).toThrowError(
        "Provide a number array as an argument"
      );
      expect(() => dp("string" as unknown as number[])).toThrowError(
        "Provide a number array as an argument"
      );
    });
  });

  describe("should return correct answer", () => {
    it("should return the correct maximum sum of non-adjacent elements", () => {
      const arr = [4, 11, 10, 1, 2, 8, 5];
      expect(dp(arr)).toBe(22);
    });

    it("should return 0 if the array is empty", () => {
      expect(dp([])).toBe(0);
    });

    it("should return the single element if the array has one element", () => {
      expect(dp([3])).toBe(3);
    });

    it("should handle negative numbers correctly", () => {
      const arr = [-1, -2, -3, -4, -5];
      expect(dp(arr)).toBe(0);
    });
  });
});
