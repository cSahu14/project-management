import express from "express"
import { createUser, editUser, loginUser } from "./userController";
import authenticate from "../middlewares/authenticate";

const userRouter = express.Router();


userRouter.post("/register", createUser)
userRouter.post("/login", loginUser)
userRouter.patch("/editUser", authenticate, editUser)

export default userRouter;