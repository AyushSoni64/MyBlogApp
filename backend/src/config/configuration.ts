import { config } from "dotenv";
import { IConfig } from "./IConfig";

config();

export const configuration: IConfig = Object.freeze({
  port: Number(process.env.PORT),
  jwt_secret: process.env.JWT_TOKEN_SECRET,
  mongoUrl: process.env.MONGO_DB_URI,
  saltRounds: Number(process.env.SALT_ROUNDS),
});


