import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModal from "./userModal";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are require");
    return next(error);
  }

  try {
    const user = await userModal.findOne({ email });

    if (user) {
      const error = createHttpError(404, "User already exits with this email");
      return next(error);
    }
  } catch (error) {
    return next(createHttpError(400, "Error while getting error"));
  }

  const hashPassword = await bcrypt.hash(password, 10);

  let newUser: User;
  try {
    newUser = await userModal.create({
      name,
      email,
      password: hashPassword,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while creating error"));
  }

  try {
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });

    res.status(201).json({ accessToken: token });
  } catch (error) {
    return next(createHttpError(500, "Error while signing the jwt token"));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createHttpError(400, "All fields are required"));
  }

  try {
    const user = await userModal.findOne({ email });

    if (!user) {
      return next(createHttpError(404, "User not found"));
    }

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return next(createHttpError(401, "Invalid Username or Password"));
      }

      const token = sign({ sub: user._id }, config.jwtSecret as string, {
        expiresIn: "7d",
      });

      res.json({ accessToken: token });
    } catch (error) {
      return next(createHttpError(500, "Error while comparing passwords"));
    }
  } catch (error) {
    return next(createHttpError(500, "Error while finding user"));
  }
};

export { createUser, loginUser };
