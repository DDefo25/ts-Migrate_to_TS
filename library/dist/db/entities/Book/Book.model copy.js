"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
var mongoose_1 = require("mongoose");
var Book_schema_1 = require("./Book.schema");
exports.BookModel = (0, mongoose_1.model)("Book", Book_schema_1.BookSchema);
