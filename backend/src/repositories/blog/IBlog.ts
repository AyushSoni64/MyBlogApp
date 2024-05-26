import { Types } from "mongoose";

export interface IBlog extends Document {
    title: string;
    picture?: string;
    description: string;
    createdBy: Types.ObjectId;
    deletedBy: Types.ObjectId;
  }
  