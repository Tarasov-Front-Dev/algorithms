/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'
import packageJson from './package.json'

const getPackageName = () => {
    return packageJson.name
}

const getPackageNameCamelCase = () => {
    try {
        return getPackageName().replace(/-./g, char => char[1].toUpperCase())
    } catch (err) {
        throw new Error('Name property in package.json is missing.')
    }
}

const fileName = {
    es: `${getPackageName()}.mjs`,
    cjs: `${getPackageName()}.cjs`,
    iife: `${getPackageName()}.iife.js`,
}

const formats = Object.keys(fileName) as Array<keyof typeof fileName>

module.exports = defineConfig({
    base: './',
    build: {
        outDir: './build/dist',
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: getPackageNameCamelCase(),
            formats,
            fileName: format => fileName[format],
        },
    },
    test: {
        watch: false,
        globals: true,
        environment: 'jsdom',
    },
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, 'src') },
            { find: '@@', replacement: path.resolve(__dirname) },
        ],
    },
})
