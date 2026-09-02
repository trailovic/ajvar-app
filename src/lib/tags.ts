import recipeTagsData from "@/data/recipe-tags.json";
import tagsData from "@/data/tags.json";
import { recipes } from "@/lib/recipes";
import {
  recipeTagCollectionSchema,
  tagCollectionSchema,
} from "@/schemas/tag.schema";

export const tags = tagCollectionSchema.parse(tagsData);

export const recipeTags =
  recipeTagCollectionSchema.parse(recipeTagsData);

const tagIds = new Set(tags.map((tag) => tag.id));
const recipeIds = new Set(recipes.map((recipe) => recipe.id));

for (const relation of recipeTags) {
  if (!tagIds.has(relation.tagId)) {
    throw new Error(`Unknown tag ID: ${relation.tagId}`);
  }

  if (!recipeIds.has(relation.recipeId)) {
    throw new Error(`Unknown recipe ID: ${relation.recipeId}`);
  }
}

export function getTagsForRecipe(recipeId: string) {
  const matchingTagIds = new Set(
    recipeTags
      .filter((relation) => relation.recipeId === recipeId)
      .map((relation) => relation.tagId),
  );

  return tags.filter((tag) => matchingTagIds.has(tag.id));
}

export function getRecipesForTag(tagId: string) {
  const matchingRecipeIds = new Set(
    recipeTags
      .filter((relation) => relation.tagId === tagId)
      .map((relation) => relation.recipeId),
  );

  return recipes.filter((recipe) =>
    matchingRecipeIds.has(recipe.id),
  );
}