export const compose = (...fn: ((arg: any) => any)[]) => {
  return function <T>(arg: T) {
    return fn.reduceRight((acc, fn) => fn(acc), arg)
  }
}
