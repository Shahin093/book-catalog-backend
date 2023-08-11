"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_route_1 = require("../modules/books/books.route");
const auth_route_1 = require("../modules/auth/auth.route");
const reviews_route_1 = require("../modules/reviews/reviews.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/book",
        route: books_route_1.BookRoutes,
    },
    {
        path: "/users",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/reviews",
        route: reviews_route_1.ReviewRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
