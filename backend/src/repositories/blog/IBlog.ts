import { Types } from "mongoose";

export interface IBlog extends Document {
  title: string;
  picture: string;
  likedBy: Types.ObjectId[];
  likes?: number;
  description: string;
  createdBy: Types.ObjectId;
}
