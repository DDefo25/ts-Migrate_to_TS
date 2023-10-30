"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
var mongoose_1 = require("mongoose");
var Comment_schema_1 = require("./Comment.schema");
exports.CommentModel = (0, mongoose_1.model)("Comment", Comment_schema_1.CommentSchema);
