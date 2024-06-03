import express from "express";
import userRoutes from "./controllers/user/userRoutes.js";
import blogRoutes from "./controllers/blog/blogRoutes.js";

const router: express.Router = express.Router();

router.use("/v1", userRoutes);
router.use("/v1", blogRoutes);

export { router };
