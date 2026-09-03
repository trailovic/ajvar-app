import { z } from "zod";

const multilineListSchema = z
  .string()
  .trim()
  .transform((value) =>
    value
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean),
  )
  .pipe(z.array(z.string().min(1)).min(1));

const commaSeparatedTagsSchema = z
  .string()
  .trim()
  .transform((value) => {
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    return [...new Map(tags.map((tag) => [tag.toLowerCase(), tag])).values()];
  })
  .pipe(
    z
      .array(z.string().min(1).max(40))
      .min(1, "Add at least one tag.")
      .max(12, "Use no more than 12 tags."),
  );

export const createRecipeInputSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Enter a recipe title.")
    .max(120),

  description: z
    .string()
    .trim()
    .max(500)
    .transform((value) => value || undefined),

  servings: z.coerce
    .number()
    .int()
    .positive("Servings must be at least 1."),

  prepMinutes: z.coerce.number().int().nonnegative(),
  cookMinutes: z.coerce.number().int().nonnegative(),

  ingredients: multilineListSchema,
  steps: multilineListSchema,
  tags: commaSeparatedTagsSchema,
});

export type CreateRecipeInput = z.infer<
  typeof createRecipeInputSchema
>;