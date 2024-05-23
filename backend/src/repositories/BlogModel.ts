import { Document, Types, model, Schema } from "mongoose";

interface IBlog extends Document {
  title: string;
  picture?: string;
  description: string;
  createdBy: Types.ObjectId;
}

const blogSchema = new Schema<IBlog>(
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
  },
  {
    timestamps: true,
  }
);

const Blog = model<IBlog>("Blog", blogSchema);

export default Blog;
