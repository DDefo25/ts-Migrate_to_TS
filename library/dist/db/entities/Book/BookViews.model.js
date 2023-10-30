"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookViewsModel = void 0;
var mongoose_1 = require("mongoose");
var BookViews_schema_1 = require("./BookViews.schema");
exports.BookViewsModel = (0, mongoose_1.model)("Book", BookViews_schema_1.BookViewsSchema);
