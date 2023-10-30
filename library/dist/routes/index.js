"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var api_1 = __importDefault(require("./api"));
var router = express_1.default.Router();
router.use('/api', api_1.default);
router.get('/', function (_, res) {
    res.redirect('/api');
});
exports.default = router;
