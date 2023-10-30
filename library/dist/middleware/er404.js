"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLoggerMiddleware = void 0;
exports.default = (function (req, res) {
    res.status(404).render('errors/404', {
        title: 'Страница не найдена',
    });
});
var errorLoggerMiddleware = function (error, req, res, next) {
    // Log exception
    console.error("\n  ----------------------------------\n  EXCEPTION MIDDLEWARE\n  HTTP ".concat(req.method, " ").concat(req.url, "\n  ").concat(error.message, "\n  ").concat(error.stack, "\n  ----------------------------------\n  "));
    // Hide stack from client for security reasons
    var e = { error: "Internal server error" };
    res.status(500).json(e);
};
exports.errorLoggerMiddleware = errorLoggerMiddleware;
