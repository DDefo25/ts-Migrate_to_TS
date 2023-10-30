"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error404Custom = void 0;
var error404Custom = function (err, req, res) {
    res.status(404).render('../views/errors/404', {
        title: err.message,
    });
};
exports.error404Custom = error404Custom;
