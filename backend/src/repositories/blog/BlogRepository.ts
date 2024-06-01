import { Types } from "mongoose";
import { IBlog } from "./IBlog";
import BlogModel from "./BlogModel";
import { User } from "../user/UserModel";

class BlogRepository {
  async getBlogs(page: number, limit: number) {
    try {
      const blogs = await BlogModel.find()
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

  async addBlog(blogData: IBlog) {
    try {
      const blog = await BlogModel.create(blogData);
      return blog.id;
    } catch (error) {
      throw new Error(`Error adding blog: ${error.message}`);
    }
  }

  async editBlog(blogId: string, title: string, description: string, pictureUrl: string) {
    try {
      // const blog = await BlogModel.findByIdAndUpdate(
      //   blogId,
      //   { title, description },
      //   { new: true }
      // ).lean();
      const updateData = { title, description };
      if (pictureUrl) {
        updateData['picture'] = pictureUrl;
      }
      const blog = await BlogModel.findByIdAndUpdate(
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

  async findBlogById(blogId: string) {
    try {
      const blog = await BlogModel.findById(blogId)
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

  async getBlogsByUserId(userId: string) {
    try {
      const blogs = await BlogModel.find({ createdBy: userId })
        .populate("createdBy")
        .lean();
      return blogs;
    } catch (error) {
      throw new Error(`Error fetching blogs by user ID: ${error.message}`);
    }
  }

  async deleteBlogById(blogId: string) {
    try {
      const blog = await BlogModel.findByIdAndDelete(blogId).lean();
      if (!blog) {
        throw new Error("Blog not found");
      }
      return blog;
    } catch (error) {
      throw new Error(`Error deleting blog: ${error.message}`);
    }
  }

  async toggleLike(blogId: string, userId: string) {
    try {
      const blogById = await BlogModel.findById(blogId);

      if (!blogById) {
        throw new Error("Blog not found");
      }

      const userObjectId = new Types.ObjectId(userId);
      const hasLiked = blogById.likedBy.some((id) => id.equals(userObjectId));

      let blog;
      if (hasLiked) {
        blog = await BlogModel.findByIdAndUpdate(
          blogId,
          { $pull: { likedBy: userObjectId } },
          { new: true }
        ).lean();

        await User.findByIdAndUpdate(userId, {
          $pull: { likedBlogs: blogId },
        });
      } else {
        blog = await BlogModel.findByIdAndUpdate(
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

export default new BlogRepository();
