const express = require("express");
const morgan = require("morgan");

const recipeRouter = require("./routes/recipeRoutes");
const userRouter = require("./routes/userRoutes");

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

module.exports = api;
