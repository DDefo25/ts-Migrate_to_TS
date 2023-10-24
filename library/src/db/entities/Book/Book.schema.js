"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookSchema = void 0;
var mongoose_1 = require("mongoose");
exports.BookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    authors: {
        type: String,
        required: true,
    },
    favorite: {
        type: String,
        default: '',
    },
    fileCover: {
        type: String,
        default: '',
    },
    fileName: {
        type: String,
        default: '',
    },
    fileBook: {
        type: String,
        default: '',
    },
});
