import { Model, model } from "mongoose";
import { IBlog } from "./IBlog";
import { blogSchema } from "./BlogSchema";

const Blog: Model<IBlog> = model<IBlog>("Blog", blogSchema);

export default Blog;
