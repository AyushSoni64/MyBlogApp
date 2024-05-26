import { Router } from "express";
import blogController from "./blogController";

const router = Router();

router.post("/blogs", blogController.createBlog);
router.get("/blogs", blogController.getAllBlogs);
router.get("/blog/:blogId", blogController.getBlogById);

export default router;
