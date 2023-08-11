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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const reviews_model_1 = require("./reviews.model");
// create a book
const createReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviews_model_1.Review.create(payload);
    return result;
});
const getReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviews_model_1.Review.find({ book: payload });
    return result;
});
exports.ReviewService = {
    createReview,
    getReview,
};
