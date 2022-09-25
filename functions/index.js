const functions = require("firebase-functions");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const api = require("./api");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {}).then(() => {
  console.log(`DB connection successful.`);
});

exports.api = functions.https.onRequest(api);
