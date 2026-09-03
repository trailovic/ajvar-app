"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";

import { db } from "@/prisma/db";
import { createRecipeInputSchema } from "@/schemas/create-recipe.schema";
import { recipeContentSchema } from "@/schemas/recipe.schema";

export type CreateRecipeActionState = {
  status: "idle" | "error" | "success";
  message?: string;
  errors?: Record<string, string[] | undefined>;
  slug?: string;
};

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function createUniqueSlug(title: string) {
  const baseSlug = slugify(title) || "recipe";

  let slug = baseSlug;
  let suffix = 2;

  while (
    await db.orm.public.Recipe.where({
      slug,
    }).first()
  ) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

export async function createRecipe(
  _previousState: CreateRecipeActionState,
  formData: FormData,
): Promise<CreateRecipeActionState> {
  const result = createRecipeInputSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    servings: formData.get("servings"),
    prepMinutes: formData.get("prepMinutes"),
    cookMinutes: formData.get("cookMinutes"),
    ingredients: formData.get("ingredients"),
    steps: formData.get("steps"),
    tags: formData.get("tags"),
  });

  if (!result.success) {
    return {
      status: "error",
      message: "Please check the highlighted recipe details.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const input = result.data;
  const slug = await createUniqueSlug(input.title);

  const content = recipeContentSchema.parse({
    schemaVersion: 1,
    title: input.title,
    description: input.description,

    servings: {
      amount: input.servings,
      label: "servings",
    },

    timing: {
      prepMinutes: input.prepMinutes,
      cookMinutes: input.cookMinutes,
    },

    ingredients: input.ingredients.map((name) => ({
      id: randomUUID(),
      name,
    })),

    steps: input.steps.map((text) => ({
      id: randomUUID(),
      text,
    })),
  });

  try {
    await db.transaction(async (tx) => {
      const recipe = await tx.orm.public.Recipe.create({
        slug,
        visibility: "public",
        content,
      });

      for (const label of input.tags) {
        const tagSlug = slugify(label);

        if (!tagSlug) {
          continue;
        }

        const existingTag = await tx.orm.public.Tag.where({
          slug: tagSlug,
        }).first();

        const tag =
          existingTag ??
          (await tx.orm.public.Tag.create({
            slug: tagSlug,
            label,
            family: "custom",
          }));

        await tx.orm.public.RecipeTag.create({
          recipeId: recipe.id,
          tagId: tag.id,
        });
      }
    });

    revalidatePath("/");
    revalidatePath(`/recipes/${slug}`);

    return {
      status: "success",
      message: "Recipe published successfully.",
      slug,
    };
  } catch (error) {
    console.error("Failed to publish recipe:", error);

    return {
      status: "error",
      message: "The recipe could not be published. Please try again.",
    };
  }
}