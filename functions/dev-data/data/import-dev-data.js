const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Recipe = require("./../../models/recipeModel");
const { deleteMany } = require("./../../models/recipeModel");

dotenv.config({ path: "./../../config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {}).then(() => {
  console.log(`DB connection successful.`);

  // READ THE FILE

  const recipies = JSON.parse(
    fs.readFileSync("./../data/recipies.json", "utf-8")
  );

  // IMPORT THE FILE

  const importData = async () => {
    try {
      await Recipe.create(recipies);
      console.log("Data successfully loaded!");
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE ALL DATA FROM THE COLLECTION

  const deleteData = async () => {
    try {
      await Recipe.deleteMany();
      console.log("Data successfully deleted!");
    } catch (err) {
      console.log(err);
    }
  };

  if (process.argv[2] === "--import") {
    importData();
  } else if (process.argv[2] === "--delete") {
    deleteData();
  }

  console.log(process.argv);
});
