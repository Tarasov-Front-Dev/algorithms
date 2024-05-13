import { describe, expect, it } from "vitest";
import { subarraySum } from "./algorithms";

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
