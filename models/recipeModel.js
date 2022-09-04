const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  numberOfServings: {
    type: Number,
    required: [true, "Number of Services is required"],
  },
  caloriesPerServing: Number,
  prepTimeInMinutes: Number,
  cookTimeInMinutes: Number,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
