import { Request, Response, NextFunction } from "express";
import BlogRepository from "../../repositories/blog/BlogRepository";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { uploadOnCloudinary } from "../../utils/Cloudinary";

class BlogController {
  async getAllBlogs(request: any, response: Response, next: NextFunction) {
    try {
      const { page, limit } = request.query;
      const blogs = await BlogRepository.getBlogs(Number(page), Number(limit));
      response.json(
        new ApiResponse(200, blogs, "Fetched all blogs successfully")
      );
    } catch (error) {
      console.log("CATCH BLOCK : blogs controller getAllBlogs =>", error);
      next(new ApiError(500, error.message));
    }
  }

  async addBlog(request: any, response: Response, next: NextFunction) {
    try {
      const blogData = request.body;
      const createdBy = request.user.data._id;
      const picturePath = request.file?.path;
      if (!picturePath) next(new ApiError(400, "Image is required"));
      const picture = await uploadOnCloudinary(picturePath);
      if (!picture) next(new ApiError(400, "Error in image upload"));
      const blogId = await BlogRepository.addBlog({
        picture: picture?.url,
        createdBy,
        ...blogData,
      });
      response.json(
        new ApiResponse(201, { blogId }, "Blog added successfully")
      );
    } catch (error) {
      console.log("CATCH BLOCK : blogs controller addBlog =>", error);
      next(new ApiError(400, error.message));
    }
  }

  async editBlog(request: any, response: Response, next: NextFunction) {
    try {
      const { blogId } = request.params;
      const { title, description } = request.body;
      let picture;
      if (request.file) {
        const picturePath = request.file.path;
        picture = await uploadOnCloudinary(picturePath);
        if (!picture) {
          return next(new ApiError(400, "Error in image upload"));
        }
      }
      const blog = await BlogRepository.editBlog(
        blogId,
        title,
        description,
        picture.url
      );
      response.json(new ApiResponse(200, blog, "Blog updated successfully"));
    } catch (error) {
      console.log("CATCH BLOCK : blogs controller editBlog =>", error);
      next(new ApiError(400, error.message));
    }
  }

  async findBlogById(request: Request, response: Response, next: NextFunction) {
    try {
      const { blogId } = request.params;
      const blog = await BlogRepository.findBlogById(blogId);
      response.json(new ApiResponse(200, blog, "Fetched blog successfully"));
    } catch (error) {
      console.log("CATCH BLOCK : blogs controller findBlogById =>", error);
      next(new ApiError(404, error.message));
    }
  }

  async getBlogsByUserId(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = request.params;
      const blogs = await BlogRepository.getBlogsByUserId(userId);
      response.json(
        new ApiResponse(200, blogs, "Fetched user's blogs successfully")
      );
    } catch (error) {
      console.log("CATCH BLOCK : blogs controller getBlogsByUserId =>", error);
      next(new ApiError(400, error.message));
    }
  }

  async deleteBlogById(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { blogId } = request.params;
      const blog = await BlogRepository.deleteBlogById(blogId);
      response.json(new ApiResponse(200, blog, "Blog deleted successfully"));
    } catch (error) {
      console.log("CATCH BLOCK : blogs controller deleteBlogById =>", error);
      next(new ApiError(400, error.message));
    }
  }

  async toggleLike(request: any, response: Response, next: NextFunction) {
    try {
      const { blogId } = request.params;
      const userId = request?.user?.data?._id;
      const blog = await BlogRepository.toggleLike(blogId, userId);
      response.json(new ApiResponse(200, blog, "Liked successfully"));
    } catch (error) {
      console.log("CATCH BLOCK : blogs controller toggleLike =>", error);
      next(new ApiError(400, error.message));
    }
  }
}

export default new BlogController();
