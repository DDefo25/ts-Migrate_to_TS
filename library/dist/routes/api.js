"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var books_1 = __importDefault(require("./books"));
var user_1 = __importDefault(require("./user"));
var router = express_1.default.Router();
router.use('/books', books_1.default);
router.use('/user', user_1.default);
router.get('/', function (_, res) {
    res.render('index', {
        title: 'Главная',
    });
});
exports.default = router;
