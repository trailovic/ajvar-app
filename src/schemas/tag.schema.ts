import { z } from "zod";

export const tagFamilySchema = z.enum([
  "meal",
  "dish",
  "diet",
  "cuisine",
  "ingredient",
  "technique",
  "time",
  "custom",
]);

export const tagSchema = z.object({
  id: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  label: z.string().trim().min(1),
  family: tagFamilySchema,
});

export const recipeTagSchema = z.object({
  recipeId: z.string().min(1),
  tagId: z.string().min(1),
});

export const tagCollectionSchema = z.array(tagSchema);
export const recipeTagCollectionSchema = z.array(recipeTagSchema);

export type Tag = z.infer<typeof tagSchema>;
export type TagFamily = z.infer<typeof tagFamilySchema>;
export type RecipeTag = z.infer<typeof recipeTagSchema>;