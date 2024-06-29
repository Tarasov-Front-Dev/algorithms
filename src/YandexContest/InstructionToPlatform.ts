// ********* using Node **********
const readline = require('readline')!

const rl = readline.createInterface({
    input: process.stdin,
})

const lines: string[] = []
rl.on('line', (line: string) => {
    lines.push(line)
}).on('close', () => {
    const j = lines[0]
    const s = lines[1]
    const jew = new Map<string, number>()
    for (const jewelry of j) {
        jew.set(jewelry, 0)
    }
    for (const stone of s) {
        if (jew.has(stone)) {
            jew.set(stone, jew.get(stone)! + 1)
        }
    }
    const result = Array.from(jew.values()).reduce((acc, v) => (acc += v), 0)
    process.stdout.write(result.toString())
})

// ********* using FileSystem **********

const fs = require('fs')!
const fileContent = fs.readFileSync('input.txt', 'utf8')

const [jewelry, stones] = fileContent.toString().split('\n') as string[]
const map = new Map<string, number>()
for (const j of jewelry) {
    map.set(j, 0)
}
for (const s of stones) {
    if (map.has(s)) {
        map.set(s, map.get(s)! + 1)
    }
}
const result = Array.from(map.values()).reduce((acc, v) => (acc += v), 0)

fs.writeFileSync('output.txt', result.toString())
