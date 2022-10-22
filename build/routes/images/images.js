'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const utility_1 = __importDefault(require('../../utilities/utility'))
const images = express_1.default.Router()
images.get('/', (req, res) => {
    const filename = req.query['filename']
    const path = req.path
    const baseurl = req.baseUrl
    const url = req.url
    const hostname = req.hostname
    const original = req.originalUrl
    res.send(`
    <center>
    <img src="G:/Desktop/image_api/image_api_process/assets/images/encenadaport.jpg" alt="No image" width="200" height="200">
    </center>
    `)
    //width="500" height="600" G:\Desktop\image_api\image_api_process\assets\images\encenadaport.jpg
    ;(0, utility_1.default)()
        .then((value) => {
            console.log(`Your Data is ${value}`)
        })
        .catch((error) => {
            console.log(`Error ${error}`)
        })
    // .then((value) => {
    //     console.log(`Success`)
    //     sharp(`assets/images/${filename}.jpg`)
    //         .resize(320, 240)
    //         .toFile(`cache/images/${filename}.jpg`, (err, info) => {})
    // })
    // .catch((error) => {
    //     console.log(`Error in Read File: ${error}`)
    // })
    // console.log(`readfile ${result}`)
})
exports.default = images
