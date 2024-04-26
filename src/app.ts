import express, { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import { config } from "./config/config";
import userRouter from "./users/userRouter";

const app = express();
app.use(express.json());

app.get("", (req, res, next) => {
  const error = createHttpError(400, "something went wrong");
  throw error;
  res.json({ message: "Welcome to rest apis" });
});

app.use("/api/users", userRouter);

export default app;
