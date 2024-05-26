import { Schema } from "mongoose";
import { IBlog } from "./IBlog";

export const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
