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
// const scheduler = new AssemblyLineScheduler(3)
// jobs.jobsBatches[0].forEach(job => scheduler.appendJob(job))
// scheduler.start().then(console.log) // unkomment to start the task

// ********* Palindrom ********/

export const isPalindrom = (str: string) => {
  if (!str.length) return false
  const compareFn = Intl.Collator('en', { sensitivity: 'base' }).compare
  const regexp = /[^a-z]/i
  let l = 0,
    r = str.length - 1
  while (l <= r) {
    while (regexp.test(str[l])) l++
    while (regexp.test(str[r])) r--
    if (compareFn(str[l], str[r])) return false
    l++
    r--
  }
  return true
}

// ********** GRAPH **********

type Graph = Record<Capitalize<string>, Capitalize<string>[]>

async function fetchFlightPaths(): Promise<Graph> {
  return {
    A: ['B', 'D'],
    B: ['C', 'N', 'Z'],
    D: ['E', 'F'],
    F: ['S'],
  }
}

export const findFlightPath = async (start: string, end: string) => {
  const graph = await fetchFlightPaths()
  const queue = new Set([start])
  const visited = new Set<string>()
  const previous = new Map<string, string>()

  for (const node of queue) {
    visited.add(node)
    const neigbours = getNeighbours(graph[node as keyof Graph], visited)
    for (const neigbour of neigbours) {
      if (!previous.has(neigbour)) previous.set(neigbour, node)
      if (neigbour === end) return producePath(start, end, previous)
      queue.add(neigbour)
    }
  }
  throw new Error('No way')
}

const getNeighbours = (node: string[] = [], visited: Set<string>) =>
  node.reduce((acc, v) => (visited.has(v) ? acc : acc.concat([v])), [] as string[])

const producePath = (start: string, end: string, previous: Map<string, string>) => {
  const answer = [end]
  while (start !== end) {
    answer.push((end = previous.get(end)!))
  }
  return answer.reverse()
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

export const merge = (a: number[], b: number[]) => {
  if (!Array.isArray(a) || !Array.isArray(b)) return []
  let answer = Array.from({ length: a.length + b.length - 1 }, () => 0)
  let i = 0,
    ai = 0,
    bi = 0
  while (ai < a.length && bi < b.length) {
    if (a[ai] < b[bi]) answer[i++] = a[ai++]
    else answer[i++] = b[bi++]
  }
  answer.length = i
  return answer.concat(a.slice(ai), b.slice(bi))
}
