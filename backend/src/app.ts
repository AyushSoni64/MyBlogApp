import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./controllers/user/userRoutes.js";
import blogRoutes from "./controllers/blog/blogRoutes.js";
import likeRoutes from "./controllers/likes/likesRoutes.js";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/v1", userRoutes);
app.use("/v1", blogRoutes);
app.use("/v1", likeRoutes);

export { app };
