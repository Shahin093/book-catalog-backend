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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const auth_model_1 = require("./auth.model");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    //  access to our instance methods
    const isUserExists = yield auth_model_1.User.isUserExist(email);
    // check user exits
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exits.");
    }
    // match password
    if ((isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password) &&
        !(yield auth_model_1.User.isPasswordMatched(password, isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "password do not matched!");
    }
    const { _id: userId, email: tokenEmail } = isUserExists;
    // create jwt access token
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, tokenEmail }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    // create jwt refresh token
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, tokenEmail }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_secret_in);
    console.log(refreshToken);
    return {
        accessToken,
        refreshToken,
    };
});
const signupUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield auth_model_1.User.create(payload);
    // create jwt access token
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ password, email }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    // create jwt refresh token
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ password, email }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_secret_in);
    console.log(refreshToken);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // verify token
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "invalid Refresh Token");
    }
    const { tokenEmail } = verifiedToken;
    // tmi delete hoye geso kintu tmr jhe refresh token ase
    // checking deleted user refresh token
    const isUserExist = yield auth_model_1.User.isUserExist(tokenEmail);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    // generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        _id: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id,
        email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthService = {
    loginUser,
    signupUser,
    refreshToken,
};
