import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./auth.interface";
import bcrypt from "bcrypt";
const userSchema = new Schema<IUser, UserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: 0,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isUserExist = async function (
  email: string
): Promise<IUser | null> {
  return await User.findOne({ email }, { _id: 1, password: 1, email: 1 });
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// hashing password
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 12);
  next();
});

// 3. Create a Model.
export const User = model<IUser, UserModel>("User", userSchema);
