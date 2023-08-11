"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
// import globalErrorHandler from './app/modules/users/middleware/globalErrorHandler';
// import routes from './app/routes';
const index_1 = __importDefault(require("./app/routes/index"));
const http_status_1 = __importDefault(require("http-status"));
const app = (0, express_1.default)();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1/", index_1.default);
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "Not Found",
        errorMassages: [
            {
                path: req.originalUrl,
                message: "Api Not Found",
            },
        ],
    });
    next();
});
// global error handler
app.use(globalErrorHandler_1.default);
exports.default = app;
