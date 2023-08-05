import httpStatus from "http-status";

import Jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import bcrypt from "bcrypt";
import ApiError from "../../../errors/ApiError";
import { User } from "./auth.model";
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
  ISignupUserResponse,
} from "./auth.interface";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  //  access to our instance methods
  const isUserExists = await User.isUserExist(email);

  // check user exits
  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exits.");
  }

  // match password
  if (
    isUserExists?.password &&
    !(await User.isPasswordMatched(password, isUserExists?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "password do not matched!");
  }
  const { _id: userId, email: tokenEmail } = isUserExists;
  // create jwt access token
  const accessToken = jwtHelpers.createToken(
    { userId, tokenEmail },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  // create jwt refresh token
  const refreshToken = jwtHelpers.createToken(
    { userId, tokenEmail },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_secret_in as string
  );
  console.log(refreshToken);

  return {
    accessToken,
    refreshToken,
  };
};
const signupUser = async (
  payload: ILoginUser
): Promise<ISignupUserResponse> => {
  const { email, password } = payload;
  const user = await User.create(payload);

  // create jwt access token
  const accessToken = jwtHelpers.createToken(
    { password, email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  // create jwt refresh token
  const refreshToken = jwtHelpers.createToken(
    { password, email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_secret_in as string
  );
  console.log(refreshToken);

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "invalid Refresh Token");
  }
  const { tokenEmail } = verifiedToken;

  // tmi delete hoye geso kintu tmr jhe refresh token ase
  // checking deleted user refresh token
  const isUserExist = await User.isUserExist(tokenEmail);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }
  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      _id: isUserExist?._id,
      email: isUserExist?.email,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  signupUser,
  refreshToken,
};
