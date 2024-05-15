import { compose } from './shared/utils'

// ************* Yandex **************

interface Fabric {
  linesCount: number
  jobsBatches: Job[][]
}

interface Job {
  id: string
  priority: number
  time?: number
  execute: () => Promise<any>
}

type JobLine = { qcPassed: number; qcFailed: number; jobIds: string[]; timeSpent: number }

export class AssemblyLineScheduler {
  n: number
  newJobs: Job[] = []
  constructor(n: number) {
    this.n = n
  }
  appendJob(job: Job) {
    this.newJobs.push(job)
  }
  start(): Promise<JobLine[]> {
    const jobLines = Array.from({ length: this.n }, () => ({
      qcPassed: 0,
      qcFailed: 0,
      jobIds: [],
      timeSpent: 0,
    })) as unknown as JobLine[]
    const currentJobs = this.newJobs.sort((a, b) => b.priority - a.priority)
    this.newJobs = []

    let currentJob = 0
    let processedJobs = 0
    return new Promise(res => {
      for (let i = 0; i < jobLines.length; i++) {
        ~(function performJob() {
          const jobLine = jobLines[i]
          const job = currentJobs[currentJob++]
          const time = Date.now()
          job
            .execute()
            .then(() => processResult(true))
            .catch(() => processResult(false))
            .then(() => {
              if (currentJob < currentJobs.length) return performJob()
            })
            .then(() => {
              if (processedJobs >= currentJobs.length) res(jobLines)
            })

          function processResult(successOrNot: boolean) {
            jobLine[successOrNot ? 'qcPassed' : 'qcFailed']++
            jobLine['jobIds'].push(job.id)
            jobLine['timeSpent'] += Date.now() - time
            processedJobs++
          }
        })()
      }
    })
  }
}

export const jobs: Fabric = {
  linesCount: 3,
  jobsBatches: [
    [
      {
        id: '1',
        priority: 344327634,
        execute() {
          return new Promise<void>((_, reject) => setTimeout(reject, 69))
        },
      },
      {
        id: '2',
        priority: 439182113,
        execute() {
          return new Promise<void>((_, reject) => setTimeout(reject, 68))
        },
      },
      {
        id: '3',
        priority: 267746535,
        execute() {
          return new Promise<void>(resolve => setTimeout(resolve, 83))
        },
      },
      {
        id: '4',
        priority: 412201989,
        execute() {
          return new Promise<void>(resolve => setTimeout(resolve, 61))
        },
      },
      {
        id: '5',
        priority: 211178799,
        execute() {
          return new Promise<void>(resolve => setTimeout(resolve, 94))
        },
      },
    ],
  ],
}
const scheduler = new AssemblyLineScheduler(3)
jobs.jobsBatches[0].forEach(job => scheduler.appendJob(job))
scheduler.start().then(console.log) // unkomment to start the task

// ********* Palindrom ********/

export function isPalindrom(str: string) {
  if (!str.length) {
    return false
  }
  const regexp = /[^a-z]/i
  let left = 0
  let right = str.length - 1

  while (left <= right) {
    while (regexp.test(str[left])) {
      ++left
    }
    while (regexp.test(str[right])) {
      --right
    }
    if (str[left++].toLowerCase() !== str[right--].toLowerCase()) {
      return false
    }
  }
  return true
}

// ********** GRAPH **********

type Graph = Record<Capitalize<string>, Capitalize<string>[]>
type Previous = Record<Capitalize<string>, keyof Graph>

async function fetchFlightPaths(): Promise<Graph> {
  return {
    A: ['B', 'D'],
    B: ['C', 'N', 'Z'],
    D: ['E', 'F'],
    F: ['S'],
  }
}

function checkPathInGraph({
  start,
  end,
  graph,
}: {
  start: keyof Graph
  end: Capitalize<string>
  graph: Graph
}) {
  const queue = [start]
  const unique = new Set(start)
  const previous: Previous = {} as Previous

  for (let i = 0; i < queue.length; i++) {
    const node = graph[queue[i] as keyof Graph] as Capitalize<string>[]
    if (!node) {
      continue
    }

    let neighbor: (typeof node)[number]
    for (neighbor of node) {
      if (!unique.has(neighbor)) {
        unique.add(neighbor)
        queue.push(neighbor)
        previous[neighbor] = queue[i]
        if (neighbor === end) {
          return { start, end, previous }
        }
      }
    }
  }
  return { start, end, previous: undefined }
}

function producePath({
  start,
  end,
  previous,
}: {
  start: keyof Graph
  end: Capitalize<string>
  previous: Previous | undefined
}) {
  if (!previous) {
    return
  }
  const path: Capitalize<string>[] = [end]
  while (end !== start) {
    path.push(previous[end])
    end = previous[end]
  }
  return path.reverse()
}

const checkPath = compose(producePath, checkPathInGraph)

export async function findFlightPath(start: keyof Graph, end: Capitalize<string>) {
  const graph = await fetchFlightPaths()
  const path = checkPath({ start, end, graph })
  if (path) {
    return path
  } else {
    throw new Error('No way')
  }
}

// ************ Proxy ************

let user = {
  name: 'Tolya',
  _id: '3rfff3-r3r23-fdsf3',
}

type Keys<T> = keyof T

user = new Proxy(user, {
  get(target, prop: Keys<typeof user>) {
    if (prop in target && !prop.startsWith('_')) {
      return target[prop]
    }
    return undefined
  },
  set(target, prop, value) {
    if (typeof Number(prop) === 'number') {
      target[prop as Keys<typeof target>] = value
      return true
    }
    return false
  },
  ownKeys(target) {
    return Object.keys(target).filter(key => !key.startsWith('_'))
  },
})

// console.log(user._id);
// user[123] = 456

// for (const key in user) {
// console.log(key, user[key as Keys<typeof user>]);
// }

// console.log(Object.getOwnPropertyDescriptors(user));

// ********** merge **********

// const a = [1, 2]
// const b = [2, 3, 4]
export function merge(a: number[], b: number[]) {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    return []
  }
  const result = Array.from({ length: a.length + b.length }).fill(0)
  let i, j, r
  i = j = r = 0
  while (i < a.length && j < b.length) {
    let num
    if (a[i] < b[j]) {
      num = a[i++]
    } else {
      num = b[j++]
    }
    result[r++] = num
  }
  result.length = r
  return result.concat(a.slice(i), b.slice(j))
}
