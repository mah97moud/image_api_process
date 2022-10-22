'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const images_1 = __importDefault(require('./images/images'))
const routes = express_1.default.Router()
routes.get('/api', (req, res) => {
    res.send('Read File')
})
routes.use('/images', images_1.default)
exports.default = routes
