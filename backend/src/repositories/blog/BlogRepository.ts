import { Model, Types } from "mongoose";
import { IBlog } from "./IBlog";
import BlogModel from "./BlogModel";
import { User } from "../user/UserModel";

class BlogRepository {
  private blogModel: Model<IBlog>;

  constructor(blogModel: Model<IBlog>) {
    this.blogModel = blogModel;
  }

  public async getBlogs(page: number, limit: number) {
    try {
      const blogs = await this.blogModel.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("createdBy")
        .lean();
      return blogs;
    } catch (error) {
      throw new Error(`Error fetching blogs: ${error.message}`);
    }
  }

  public async addBlog(blogData: IBlog) {
    try {
      const blog = await this.blogModel.create(blogData);
      return blog.id;
    } catch (error) {
      throw new Error(`Error adding blog: ${error.message}`);
    }
  }

  public async editBlog(blogId: string, title: string, description: string, pictureUrl: string) {
    try {
      const updateData = { title, description };
      if (pictureUrl) {
        updateData['picture'] = pictureUrl;
      }
      const blog = await this.blogModel.findByIdAndUpdate(
        blogId,
        { $set: updateData },
        { new: true }
      ).lean();
      if (!blog) {
        throw new Error("Blog not found");
      }
      return blog;
    } catch (error) {
      throw new Error(`Error editing blog: ${error.message}`);
    }
  }

  public async findBlogById(blogId: string) {
    try {
      const blog = await this.blogModel.findById(blogId)
        .populate("createdBy")
        .lean();
      if (!blog) {
        throw new Error("Blog not found");
      }
      return blog;
    } catch (error) {
      throw new Error(`Error finding blog: ${error.message}`);
    }
  }

  public async getBlogsByUserId(userId: string) {
    try {
      const blogs = await this.blogModel.find({ createdBy: userId })
        .populate("createdBy")
        .lean();
      return blogs;
    } catch (error) {
      throw new Error(`Error fetching blogs by user ID: ${error.message}`);
    }
  }

  public async deleteBlogById(blogId: string) {
    try {
      const blog = await this.blogModel.findByIdAndDelete(blogId).lean();
      if (!blog) {
        throw new Error("Blog not found");
      }
      return blog;
    } catch (error) {
      throw new Error(`Error deleting blog: ${error.message}`);
    }
  }

  public async toggleLike(blogId: string, userId: string) {
    try {
      const blogById = await this.blogModel.findById(blogId);

      if (!blogById) {
        throw new Error("Blog not found");
      }

      const userObjectId = new Types.ObjectId(userId);
      const hasLiked = blogById.likedBy.some((id) => id.equals(userObjectId));

      let blog;
      if (hasLiked) {
        blog = await this.blogModel.findByIdAndUpdate(
          blogId,
          { $pull: { likedBy: userObjectId } },
          { new: true }
        ).lean();

        await User.findByIdAndUpdate(userId, {
          $pull: { likedBlogs: blogId },
        });
      } else {
        blog = await this.blogModel.findByIdAndUpdate(
          blogId,
          { $addToSet: { likedBy: userObjectId } },
          { new: true }
        ).lean();

        await User.findByIdAndUpdate(userId, {
          $addToSet: { likedBlogs: blogId },
        });
      }

      return blog;
    } catch (error) {
      throw new Error(`Error toggling like: ${error.message}`);
    }
  }
}

export default new BlogRepository(BlogModel);
