export function compose<T>(...fns: ((arg: any) => any)[]) {
    return function (this: any, arg: T) {
        return fns.reduceRight((v, fn) => fn.call(this, v), arg)
    }
}

export function composeAsync(...fns: ((arg: any) => any)[]) {
    return function (this: any, arg: any) {
        return fns.reduceRight(async (v, fn) => {
            return await fn.call(this, await v)
        }, arg)
    }
}

export function curry(fn: (...args: any[]) => any) {
    return function curried(this: any, ...args: unknown[]) {
        if (args.length === fn.length) return fn.apply(this, args)
        else return (...newArgs: unknown[]) => fn.apply(this, args.concat(newArgs))
    }
}

export function partial<T extends Array<any>, R>(
    ...args: [(...args: any[]) => R, ...args: any[]]
) {
    const [fn, ...fnArgs] = args
    return function (this: any, ...newArgs: T) {
        return fn.apply(this, fnArgs.concat(newArgs))
    }
}
