import { Model } from "mongoose";

export type ILoginUser = {
  _id?: string | undefined;
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};
export type ISignupUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

//   export type IVerifiedLoginUser = {
//     userId: string;
//     role: ENUM_USER_ROLE;
//   };

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type IUser = {
  _id: string | undefined;
  email: string | undefined;
  password: string;
};

export type UserModel = {
  isUserExist(id: string): Promise<Pick<IUser, "_id" | "password" | "email">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
