import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModal from "./userModal";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  const user = await userModal.findOne({ email });

  if (user) {
    const error = createHttpError(404, "User already exits with this email");
    return next(error);
  }

  res.json({ message: "User created" });
};

export { createUser };
