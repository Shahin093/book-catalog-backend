"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
//  Create a Schema corresponding to the document interface.
const booksSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    publication_date: {
        type: String,
        required: true,
    },
    review: {
        type: String,
    },
    bookStructure: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// 3. Create a Model.
exports.Book = (0, mongoose_1.model)("Book", booksSchema);
