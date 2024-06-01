import { NextFunction, Request, Response, Router } from "express";
import blogController from "./blogController";
import authMiddleware from "../../libs/authMiddleware";
import blogValidation from "./validation";
import validationHandler from "../../utils/ValidateHandler";
import { upload } from "../../libs/multer";

const blogRouter = Router();


blogRouter.get("/blogs", blogController.getAllBlogs);

blogRouter.post(
  "/blogs",
  authMiddleware,
  upload.single("picture"),
  validationHandler(blogValidation.addBlog),
  blogController.addBlog
);

blogRouter.put(
  "/blogs/:blogId",
  authMiddleware,
  upload.single("picture"),
  validationHandler(blogValidation.editBlog),
  blogController.editBlog
);

blogRouter.get(
  "/blogs/:blogId",
  validationHandler(blogValidation.findBlogById),
  blogController.findBlogById
);

blogRouter.delete(
  "/blogs/:blogId",
  authMiddleware,
  blogController.deleteBlogById
);

blogRouter.patch(
  "/blogs/:blogId/like",
  authMiddleware,
  validationHandler(blogValidation.toggleLike),
  blogController.toggleLike
);

blogRouter.get(
  "/user/:userId/blogs",
  authMiddleware,
  validationHandler(blogValidation.getBlogsByUserId),
  blogController.getBlogsByUserId
);



export default blogRouter;
