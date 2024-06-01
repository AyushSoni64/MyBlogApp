import * as jwt from "jsonwebtoken";
import { configurations } from "../config/configurations";
import { Response, NextFunction } from "express";
import { userRepository } from "../repositories/user/UserRepository";
import { ApiError } from "../utils/ApiError";

export default async (request: any, response: Response, next: NextFunction) => {
  try {
    const token = request.header("Authorization");
    const { jwt_secret } = configurations;

    if (token) {
      const decodedToken: any = jwt.verify(token, jwt_secret);
      const userExists = await userRepository.findOneUser({
        originalId: decodedToken?.data?.originalId,
      });
      if (!userExists) {
        return next({
          error: "not exits",
          message: "Permission Denied",
          status: 404,
        });
      }
      request.user = decodedToken;
      next();
    } else {
      return response.status(404).send({
        message: "Token Not Found",
        status: 404,
      });
    }
  } catch (error) {
    console.log("CATCH BLOCK : AuthMiddleware =>", error);
    return next(new ApiError(401, error.message));
  }
};
