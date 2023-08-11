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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const books_model_1 = require("./books.model");
const PaginationHelper_1 = require("../../../helpers/PaginationHelper");
const books_constant_1 = require("./books.constant");
// create a book
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_model_1.Book.create(payload);
    return result;
});
// get all books
const getAllBooks = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: books_constant_1.bookSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = PaginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = (andCondition === null || andCondition === void 0 ? void 0 : andCondition.length) > 0 ? { $and: andCondition } : {};
    const result = yield books_model_1.Book.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield books_model_1.Book.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// update a book
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_model_1.Book.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
// updateBookStatus
const updateBookStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_model_1.Book.findOneAndUpdate({ _id: id }, { status: true }, {
        new: true,
    });
    return result;
});
// delete a book
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_model_1.Book.findByIdAndDelete(id);
    return result;
});
// book details
const bookDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_model_1.Book.findById(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Book is Not found!");
    }
    return result;
});
// get book
const getBooks = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_model_1.Book.find({ user: id });
    // console.log(result);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Books is Not found!");
    }
    return result;
});
exports.BookService = {
    createBook,
    getAllBooks,
    updateBook,
    deleteBook,
    bookDetails,
    getBooks,
    updateBookStatus,
};
