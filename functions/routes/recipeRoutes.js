const express = require("express");
const recipeController = require("../controllers/recipeController");

const router = express.Router();

router
  .route("/top-5-cook-time")
  .get(recipeController.aliasTopRecipes, recipeController.getAllRecipes);

router.route("/tour-stats").get(recipeController.getRecipeStats);

router.route("/recipe-stats").get(recipeController.getRecipeStats);

router
  .route("/")
  .get(recipeController.getAllRecipes)
  .post(recipeController.createRecipe);

router
  .route("/:id")
  .get(recipeController.getRecipe)
  .patch(recipeController.updateRecipe)
  .delete(recipeController.deleteRecipe);

module.exports = router;
