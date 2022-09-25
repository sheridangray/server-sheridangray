const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: [
        100,
        "a recipie must have less than or equal to 100 characters",
      ],
      minlength: [3, "A recipe must have at least 3 characters"],
      validate: [validator.isAlpha, "Recipe name must only contain characters"],
    },
    description: String,
    numberOfServings: {
      type: Number,
      required: [true, "Number of Services is required"],
    },
    caloriesPerServing: Number,
    prepTimeInMinutes: Number,
    cookTimeInMinutes: Number,
    imageCover: {
      type: String,
      required: [true, "A recipie must have a cover image"],
    },
    images: [String],
    secretRecipe: {
      type: Boolean,
      default: false,
    },
    slug: String,
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

recipeSchema.virtual("totalTimeInMinutes").get(function () {
  return this.prepTimeInMinutes + this.cookTimeInMinutes;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create() but not .insertMany()

recipeSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

recipeSchema.post("save", function (doc, next) {
  console.log(doc);
  next();
});

// QUERY MIDDLEWARE

recipeSchema.pre(/^find/, function (next) {
  // this.find({ secretRecipe: { $ne: true } });
  this.start = Date.now();
  next();
});

recipeSchema.post(/^find/, function (next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  next();
});

// AGGREGATION MIDDLEWARE

recipeSchema.pre("aggregate", function (next) {
  console.log(this.pipeline());
  next();
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
