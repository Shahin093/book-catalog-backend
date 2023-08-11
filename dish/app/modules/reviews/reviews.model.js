"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
//  Create a Schema corresponding to the document interface.
const reviewsSchema = new mongoose_1.Schema({
    review: {
        type: String,
        required: true,
    },
    book: {
        type: mongoose_1.Types.ObjectId,
        ref: "Book",
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// 3. Create a Model.
exports.Review = (0, mongoose_1.model)("Review", reviewsSchema);
