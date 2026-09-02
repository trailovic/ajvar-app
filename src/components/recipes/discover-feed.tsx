"use client";

import { useState } from "react";

import { RecipeCard } from "@/components/recipes/recipe-card";
import type { Recipe } from "@/schemas/recipe.schema";
import type {
  RecipeTag,
  Tag,
} from "@/schemas/tag.schema";

type DiscoverFeedProps = {
  recipes: Recipe[];
  tags: Tag[];
  recipeTags: RecipeTag[];
};

export function DiscoverFeed({
  recipes,
  tags,
  recipeTags,
}: DiscoverFeedProps) {
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    [],
  );

  function toggleTag(tagId: string) {
    setSelectedTagIds((currentTags) =>
      currentTags.includes(tagId)
        ? currentTags.filter((id) => id !== tagId)
        : [...currentTags, tagId],
    );
  }

  function clearFilters() {
    setSelectedTagIds([]);
  }

  function getTagsForRecipe(recipeId: string) {
    const matchingTagIds = new Set(
      recipeTags
        .filter((relation) => relation.recipeId === recipeId)
        .map((relation) => relation.tagId),
    );

    return tags.filter((tag) => matchingTagIds.has(tag.id));
  }

  const visibleRecipes = recipes.filter((recipe) => {
    if (selectedTagIds.length === 0) {
      return true;
    }

    const recipeTagIds = new Set(
      recipeTags
        .filter((relation) => relation.recipeId === recipe.id)
        .map((relation) => relation.tagId),
    );

    return selectedTagIds.every((tagId) =>
      recipeTagIds.has(tagId),
    );
  });

  return (
    <section aria-labelledby="latest-recipes">
      <div className="mb-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="latest-recipes"
              className="font-display text-3xl text-[#241814]"
            >
              Latest recipes
            </h2>

            <p
              className="mt-2 text-sm text-black/50"
              aria-live="polite"
            >
              {visibleRecipes.length}{" "}
              {visibleRecipes.length === 1
                ? "recipe"
                : "recipes"}
            </p>
          </div>

          {selectedTagIds.length > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-semibold text-[#a6291f] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        <div
          className="mt-6 flex flex-wrap gap-2"
          aria-label="Filter recipes by tag"
        >
          {tags.map((tag) => {
            const isSelected = selectedTagIds.includes(tag.id);

            return (
              <button
                key={tag.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggleTag(tag.id)}
                className={
                  isSelected
                    ? "rounded-full bg-[#a6291f] px-4 py-2 text-sm font-semibold text-white transition-colors"
                    : "rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#594942] transition-colors hover:border-[#a6291f]/40 hover:text-[#a6291f]"
                }
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </div>

      {visibleRecipes.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visibleRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              tags={getTagsForRecipe(recipe.id)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-black/20 px-6 py-16 text-center">
          <h3 className="font-display text-3xl text-[#241814]">
            No recipes found
          </h3>

          <p className="mx-auto mt-3 max-w-md leading-7 text-black/55">
            Nothing matches all those tags yet. Try removing one
            of the filters.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded-full bg-[#a6291f] px-5 py-2.5 font-semibold text-white"
          >
            Show all recipes
          </button>
        </div>
      )}
    </section>
  );
}