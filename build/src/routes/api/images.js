"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utility_1 = __importDefault(require("../../utilities/utility"));
const images = express_1.default.Router();
const routPath = path_1.default.resolve('./');
images.get('/images', (req, res) => {
    var _a, _b, _c;
    const q = {
        filename: req.query['filename'],
        width: parseInt((_a = req.query['width']) !== null && _a !== void 0 ? _a : '100'),
        height: parseInt((_b = req.query['height']) !== null && _b !== void 0 ? _b : '100'),
    };
    const fileLocation = `${routPath}/assets/images/${q.filename}.jpg`;
    const cacheLocation = `${routPath}/cache/images/${q.filename}`;
    if (q.filename === undefined) {
        res.status(400).send('please enter a valide url like https://localhost.com:3000/api/images?filename=imagename&width=100&height=100');
        return;
    }
    if (q.width < 0) {
        (_c = res.errored) === null || _c === void 0 ? void 0 : _c.message;
        res.send('please enter a valide width ');
        return;
    }
    if (q.height < 0) {
        res.send('please enter a valide height ');
        return;
    }
    (0, utility_1.default)();
    fs_1.default.access(fileLocation, fs_1.default.constants.F_OK, (err) => {
        if (err) {
            res.status(400).send('File not found');
            return;
        }
        else {
            fs_1.default.access(`${cacheLocation}${q.width}x${q.height}.jpg`, fs_1.default.constants.F_OK, (err) => {
                if (err) {
                    console.log('Not Caching image');
                    console.log(`file location ${fileLocation}`);
                    (0, sharp_1.default)(fileLocation)
                        .resize(q.width, q.height)
                        .toFile(`${cacheLocation}${q.width}x${q.height}.jpg`, (err, info) => {
                        if (err) {
                            res.status(400).send(err);
                            console.log(err);
                        }
                        else {
                            res.sendFile(`${cacheLocation}${q.width}x${q.height}.jpg`);
                        }
                    });
                    return;
                }
                else {
                    console.log('Caching image');
                    res.sendFile(`${cacheLocation}${q.width}x${q.height}.jpg`);
                }
            });
        }
    });
});
exports.default = images;
