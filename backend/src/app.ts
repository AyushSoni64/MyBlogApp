import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./router";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(router);
app.use(notFound);
app.use(errorHandler);

export { app };
