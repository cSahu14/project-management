import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { User } from "./userTypes";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { AuthRequest } from "../middlewares/authenticate";


const createUser = async(req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, fullName, email, mobile, profession, password } = req.body;

    // Validation
    if(!firstName || !email || !password ) {
        return next(createHttpError(400, "All fields required."))
    }

    // Process
    try {
        const user = await userModel.findOne({email})
        if(user) {
            return next(createHttpError(400, "User already exist with this email."))
        }
    } catch (error) {
        return next(error)
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    let newUser:User;

    try {
        newUser = await userModel.create({
            firstName,
            lastName,
            fullName,
            email,
            mobile,
            profession,
            password: hashedPassword
        })
    } catch (error) {
        return next(createHttpError(500, "Error while creating user"));
    }

    // Token generation JWT

    try {
        //   Token generation JWT
        const token = sign({ sub: newUser._id }, config.JWT_SECRET as string, {
          expiresIn: "7d",
          algorithm: "HS256",
        });
    
        // response
        res.status(201).json({ accessToken: token });
    } catch (error) {
        return next(createHttpError(500, "Error while signing jwt token"));
    }
}


const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return next(createHttpError(400, "All fields are required."));
    }
  
    let user: User | null;
    try {
      user = await userModel.findOne({ email });
      if (!user) {
        return next(createHttpError(404, "User not found."));
      }
    } catch (error) {
      return next(createHttpError(500, "Error while getting user."));
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) {
      return next(createHttpError(400, "Incorrect email or password."));
    }
  
    try {
      //   Token generation JWT
      const token = sign({ sub: user._id }, config.JWT_SECRET as string, {
        expiresIn: "7d",
        algorithm: "HS256",
      });
  
      // response
      res.status(201).json({ accessToken: token });
    } catch (error) {
      return next(createHttpError(500, "Error while signing jwt token"));
    }
  };

const editUser = async (req: Request, res: Response, next: NextFunction) => {

  const _req = req as AuthRequest;
  try {
    const bodyData = req.body;
    const editUserData =  await userModel.findByIdAndUpdate({
      _id: _req.userId
    }, {
      ...bodyData
    }, {
      new: true
    })

    if(editUserData) {
      res.status(200).json({ user: editUserData });
    }
  } catch (error) {
    return next(createHttpError(500, "User update failed."))
  }
}
export {
    createUser,
    loginUser,
    editUser
}