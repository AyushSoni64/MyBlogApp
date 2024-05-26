import { Schema, model, Document, Types, Model } from "mongoose";

interface ILike extends Document {
  userId: [Types.ObjectId];
  blogId: Types.ObjectId;
}

const likeSchema = new Schema<ILike>(
  {
    userId: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Like: Model<ILike> = model<ILike>("Like", likeSchema);

export default Like;
