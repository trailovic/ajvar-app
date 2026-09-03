import { z } from "zod";

const ingredientSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1),
  amount: z.string().trim().min(1).optional(),
  unit: z.string().trim().min(1).optional(),
  note: z.string().trim().min(1).optional(),
});

const recipeStepSchema = z.object({
  id: z.string().min(1),
  text: z.string().trim().min(1),
  timerSeconds: z.number().int().positive().optional(),
});

export const recipeContentSchema = z.object({
  schemaVersion: z.literal(1),

  title: z.string().trim().min(1),
  description: z.string().trim().min(1).optional(),

  servings: z
    .object({
      amount: z.number().positive(),
      label: z.string().trim().min(1).optional(),
    })
    .optional(),

  timing: z
    .object({
      prepMinutes: z.number().int().nonnegative().optional(),
      cookMinutes: z.number().int().nonnegative().optional(),
    })
    .optional(),

  coverImage: z
    .object({
      src: z.string().min(1),
      alt: z.string().trim().min(1),
    })
    .optional(),

  ingredients: z.array(ingredientSchema).min(1),
  steps: z.array(recipeStepSchema).min(1),

  notes: z.array(z.string().trim().min(1)).optional(),
});

export const recipeSchema = z.object({
  id: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),

  visibility: z.enum(["public", "unlisted", "private"]),

  content: recipeContentSchema,
});

export type Recipe = z.infer<typeof recipeSchema>;
export type RecipeContent = z.infer<typeof recipeContentSchema>;