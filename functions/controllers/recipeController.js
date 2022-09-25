const Recipe = require("../models/recipeModel");
const APIFeatures = require("./../utils/apiFeatures");

exports.aliasTopRecipes = async (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-caloriesPerServing";
  req.query.fields = "name,description,caloriesPerServing";
  next();
};

exports.getAllRecipes = async (req, res) => {
  try {
    // EXECUTE THE QUERY
    const features = new APIFeatures(Recipe.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const recipes = await features.query;

    // SEND RESPONSE

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: recipes.length,
      data: {
        recipes,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        recipe,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        recipe: newRecipe,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        recipe,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getRecipeStats = async (req, res) => {
  console.log("getting stats");
  try {
    const stats = await Recipe.aggregate([
      {
        $match: { caloriesPerServing: { gt: 0 } },
      },
      {
        $group: {
          _id: null,
          numRecipes: { $sum: 1 },
          averageCalories: { $avg: "$caloriesPerServing" },
          minCalories: { $min: "$caloriesPerServing" },
          maxCalories: { $max: "$caloriesPerServing" },
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: { stats },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
