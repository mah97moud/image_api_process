"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const routPath = path_1.default.resolve('./');
const cacheDir = `${routPath}/cache/images`;
function createDirection() {
    try {
        if (fs_1.default.existsSync(cacheDir) ||
            fs_1.default.mkdirSync(cacheDir, { recursive: true })) {
            console.log('Folders already exists');
        }
        else {
            fs_1.default.access(cacheDir, (error) => {
                fs_1.default.mkdir(cacheDir, { recursive: true }, (err) => {
                    if (err)
                        throw err;
                    console.log('Folders created');
                });
            });
        }
    }
    catch (error) {
        console.log(`error:- ${error}`);
    }
}
exports.default = createDirection;
