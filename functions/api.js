const express = require("express");
const { app } = require("firebase-admin");
const morgan = require("morgan");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const recipeRouter = require("./routes/recipeRoutes");
const userRouter = require("./routes/userRoutes");
const APIFeatures = require("./utils/apiFeatures");

const api = express();

// MIDDLEWARE

if (process.env.NODE_ENV === "development") {
  api.use(morgan("dev"));
}

api.use(express.json());

api.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES

api.use("/v1/recipes", recipeRouter);
api.use("/v1/users", userRouter);

api.all((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = api;
