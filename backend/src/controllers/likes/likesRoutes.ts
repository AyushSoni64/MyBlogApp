import { Router } from "express";
import likeController from "./likeController";

const router = Router();

router.post("/blogs/:blogId/like", likeController.likeBlog);
router.get("/users/:userId/likes", likeController.getUserLikedBlogs);

export default router;
