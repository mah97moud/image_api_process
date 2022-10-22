'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const fs_1 = require('fs')
function readLocaleFile(filename) {
    return fs_1.promises.readFile(`assets/images/${filename}.jpg`)
}
const read = readLocaleFile
exports.default = read
