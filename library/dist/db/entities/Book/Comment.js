"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var commentSchema = new mongoose_1.Schema({
    bookId: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Number,
        require: true,
    }
});
exports.default = (0, mongoose_1.model)('Comment', commentSchema);
