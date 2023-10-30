"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        var filePath = path_1.default.join("./books/".concat(Date.now()));
        fs_1.default.mkdir(filePath, { recursive: true }, function (err, path) {
            if (err)
                throw err;
            else if (path)
                callback(null, path);
        });
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    },
});
exports.default = (0, multer_1.default)({ storage: storage });
