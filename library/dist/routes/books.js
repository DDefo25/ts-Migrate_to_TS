"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = require("../config");
var file_1 = __importDefault(require("../middleware/file"));
var lodash_1 = __importDefault(require("lodash"));
var container_1 = require("../infrastructure/container");
var types_1 = require("../db/types/types");
var errorHandler_1 = require("../handlers/errorHandler");
var router = express_1.default.Router();
var library = container_1.container.get(types_1.TYPES.BooksRepository);
var commentsRepository = container_1.container.get(types_1.TYPES.CommentsRepository);
var BOOKS_DIR = config_1.config.BOOKS_DIR || '/app';
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var books;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, library.getAll().catch(errorHandler_1.errorHandler)];
            case 1:
                books = _a.sent();
                res.render('books/index', {
                    title: 'Список книг',
                    library: books,
                });
                return [2 /*return*/];
        }
    });
}); });
var fileFields = file_1.default.fields([
    { name: 'fileBook', maxCount: 1 },
    { name: 'fileCover', maxCount: 1 },
]);
router.route('/create')
    .get(function (req, res) {
    res.render('books/create', {
        title: 'Книга | добавление',
        book: {},
    });
})
    .post(fileFields, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, _a, fileBook, fileCover;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                data = req.body;
                if (!lodash_1.default.isEmpty(req.files)) {
                    _a = req.files, fileBook = _a.fileBook, fileCover = _a.fileCover;
                    data.fileBook = fileBook[0].path;
                    data.fileName = fileBook[0].filename;
                    data.fileCover = fileCover[0].path;
                }
                return [4 /*yield*/, library.add(data).catch(errorHandler_1.errorHandler)];
            case 1:
                _b.sent();
                res.redirect('..');
                return [2 /*return*/];
        }
    });
}); });
router.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, book, comments;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, library.get(id).catch(errorHandler_1.errorHandler)];
            case 1:
                book = _a.sent();
                return [4 /*yield*/, commentsRepository.getAllByKey('bookId', id).catch(errorHandler_1.errorHandler)];
            case 2:
                comments = _a.sent();
                if (book)
                    book.incViews();
                res.render('books/view', {
                    title: 'Книга',
                    book: book,
                    comments: comments
                });
                return [2 /*return*/];
        }
    });
}); });
router.get('/:id/download/:fileType', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, fileType, book, fileName;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, id = _a.id, fileType = _a.fileType;
                return [4 /*yield*/, library.get(id).catch(errorHandler_1.errorHandler)];
            case 1:
                book = _b.sent();
                fileName = book[fileType];
                res.download("".concat(BOOKS_DIR, "/").concat(fileName), fileName);
                return [2 /*return*/];
        }
    });
}); });
router.route('/update/:id')
    .get(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, _b, _c;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                id = req.params.id;
                _b = (_a = res).render;
                _c = ['books/update'];
                _d = {
                    title: 'Книга | редактирование'
                };
                return [4 /*yield*/, library.get(id).catch(errorHandler_1.errorHandler)];
            case 1:
                _b.apply(_a, _c.concat([(_d.book = _e.sent(),
                        _d)]));
                return [2 /*return*/];
        }
    });
}); })
    .post(fileFields, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, id, _a, fileBook, fileCover;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                data = req.body;
                id = req.params.id;
                if (!lodash_1.default.isEmpty(req.files)) {
                    _a = req.files, fileBook = _a.fileBook, fileCover = _a.fileCover;
                    data.fileBook = fileBook[0].path;
                    data.fileName = fileBook[0].filename;
                    data.fileCover = fileCover[0].path;
                }
                return [4 /*yield*/, library.update(id, data).catch(errorHandler_1.errorHandler)];
            case 1:
                _b.sent();
                res.redirect('/api/books/');
                return [2 /*return*/];
        }
    });
}); });
router.get('/delete/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, library.remove(id).catch(errorHandler_1.errorHandler)];
            case 1:
                _a.sent();
                res.redirect('/api/books/');
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
