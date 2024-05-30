import { Router } from "express";
import user from "./userController";
import userValidation from "./validation";
import validationHandler from "../../utils/ValidateHandler";
import authMiddleware from "../../libs/authMiddleware";

const userRouter: Router = Router();

userRouter.get("/profile", authMiddleware, user.profile);

userRouter
  .post("/login", validationHandler(userValidation.login), user.login)

  .get(
    "/allUsersData",
    authMiddleware,
    validationHandler(userValidation.get),
    user.getAllUsersData
  )

  .post(
    "/register",
    validationHandler(userValidation.create),
    user.registerUser
  )

  .put(
    "/user/:originalId",
    authMiddleware,
    validationHandler(userValidation.update),
    user.updateUser
  )

  .delete(
    "/user/:originalId",
    authMiddleware,
    validationHandler(userValidation.delete),
    user.deleteUser
  )

  .get(
    "/user/:userId/liked",
    authMiddleware,
    user.getLikedBlogs
  );
export default userRouter;
