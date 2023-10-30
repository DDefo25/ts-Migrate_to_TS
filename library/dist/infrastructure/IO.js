"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIOServer = void 0;
var socket_io_1 = require("socket.io");
var commentaryHandler_1 = __importDefault(require("../handlers/commentaryHandler"));
function getIOServer(server) {
    var io = new socket_io_1.Server(server);
    io.on('connection', function (socket) {
        console.log('a user connected ' + socket.id);
        var bookId = socket.handshake.query.bookId;
        if (bookId)
            socket.join(bookId);
        (0, commentaryHandler_1.default)(socket);
    });
    return io;
}
exports.getIOServer = getIOServer;
