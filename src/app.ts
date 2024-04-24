import express, { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import { config } from "./config/config";

const app = express();

app.get("", (req, res, next) => {
  const error = createHttpError(400, "something went wrong");
  throw error;
  res.json({ message: "Welcome to rest apis" });
});

export default app;
