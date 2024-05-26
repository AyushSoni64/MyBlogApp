import { Model, model } from "mongoose";
import { IUser } from "./IUser";
import { userSchema } from "./UserSchema";

const User: Model<IUser> = model<IUser>("User", userSchema);

export { User, IUser };
