import { Types } from "mongoose";

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  likedBlogs: Types.ObjectId[];
}
