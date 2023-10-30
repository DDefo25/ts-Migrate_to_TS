"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookViewsSchema = void 0;
var mongoose_1 = require("mongoose");
exports.BookViewsSchema = new mongoose_1.Schema({
    bookId: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        required: true,
        default: 0,
    }
});
