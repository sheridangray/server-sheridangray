const express = require("express");
const morgan = require("morgan");

const recipeRouter = require("./routes/recipeRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// MIDDLEWARE

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES

app.use("/api/v1/recipies", recipeRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
