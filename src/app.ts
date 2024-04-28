import express, { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import userRouter from "./users/userRouter";
import bookRouter from "./book/bookRouter";

const app = express();
app.use(express.json());

app.get("", (req, res, next) => {
  const error = createHttpError(400, "something went wrong");
  throw error;
  res.json({ message: "Welcome to rest apis" });
});

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

export default app;
