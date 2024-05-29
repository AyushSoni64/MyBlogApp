import { config } from "dotenv";
import { IConfig } from "./IConfig";

config();

export const configurations: IConfig = Object.freeze({
  port: Number(process.env.PORT),
  jwt_secret: process.env.JWT_TOKEN_SECRET,
  mongoUrl: process.env.MONGO_DB_URI,
  saltRounds: Number(process.env.SALT_ROUNDS),
  cloudinary_cloud: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api: process.env.CLOUDINARY_API_KEY,
  cloudinary_secret: process.env.CLOUDINARY_API_SECRET,
});
