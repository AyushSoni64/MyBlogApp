import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./controllers/user/userRoutes.js";
import blogRoutes from "./controllers/blog/blogRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/v1", userRoutes);
app.use("/v1", blogRoutes);

app.use(notFound)
app.use(errorHandler)

export { app };
