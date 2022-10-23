"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const images = express_1.default.Router();
images.get('', (req, res) => {
    var _a, _b;
    const q = {
        filename: req.query['filename'],
        width: parseInt((_a = req.query['width']) !== null && _a !== void 0 ? _a : '100'),
        height: parseInt((_b = req.query['height']) !== null && _b !== void 0 ? _b : '100'),
    };
    (0, sharp_1.default)(`assets/images/${q.filename}.jpg`)
        .resize(q.width, q.height)
        .toFile(`cache/images/${q.filename}.jpg`, (err, info) => {
        console.log(`File info ${info}`);
        if (err) {
            console.log(`Has Error ${err}`);
            res.status(404).send(`
        <center>
        <h3>The following error has occurred ${err.message}</h3>
        <h3>please enter the following url form : http://localhost:3000/api/images?filename=imagename&width=200&height=200</h3>
          
        </center>
        `);
            return;
        }
        res.send(`
    <center>
    <h3> your new image with width ${q.width} and height ${q.height}</h3>
        <img src="http://localhost:3000/${q.filename}.jpg" />
    </center>
    `);
    });
    // res.sendFile(`${__dirname}/assets/index.html`)
    // if (filename == undefined) {
    //     fs.access(`cache/images/${filename}.jpg`, fs.constants.F_OK, (err) => {
    //         if (err) {
    //             res.send(`The following error occurred: File missing `)
    //             return
    //         }
    //     })
    // }
});
exports.default = images;
