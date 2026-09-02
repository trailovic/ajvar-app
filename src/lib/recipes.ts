import recipesData from "@/data/recipes.json";
import { recipeSchema } from "@/schemas/recipe.schema";
import { z } from "zod";

const recipeCollectionSchema = z.array(recipeSchema);

export const recipes = recipeCollectionSchema.parse(recipesData);

export function getRecipeBySlug(slug: string) {
  return recipes.find((recipe) => recipe.slug === slug);
}