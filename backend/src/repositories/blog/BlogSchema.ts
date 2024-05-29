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
      required: true,
    },
    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

blogSchema.virtual("likes").get(function () {
  return this.likedBy.length;
});
