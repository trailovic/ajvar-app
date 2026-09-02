import Link from "next/link";

import type { Recipe } from "@/schemas/recipe.schema";
import type { Tag } from "@/schemas/tag.schema";

type RecipeCardProps = {
  recipe: Recipe;
  tags?: Tag[];
};

export function RecipeCard({
  recipe,
  tags = [],
}: RecipeCardProps) {
  const { content } = recipe;

  const totalMinutes =
    (content.timing?.prepMinutes ?? 0) +
    (content.timing?.cookMinutes ?? 0);

  return (
    <article className="group overflow-hidden rounded-3xl border border-black/10 bg-white">
      <Link
        href={`/recipes/${recipe.slug}`}
        className="block"
      >
        <div className="flex aspect-16/10 items-center justify-center bg-[linear-gradient(135deg,#a6291f,#e2552f)]">
          <span className="font-display text-8xl text-white/90">
            {content.title.charAt(0)}
          </span>
        </div>

        <div className="p-6">
          <div className="mb-4 flex flex-wrap gap-4 text-sm text-black/55">
            {totalMinutes > 0 && (
              <span>{totalMinutes} min</span>
            )}

            {content.servings && (
              <span>
                {content.servings.amount}{" "}
                {content.servings.label ?? "servings"}
              </span>
            )}
          </div>

          {tags.length > 0 && (
            <ul
              className="mb-4 flex flex-wrap gap-2"
              aria-label="Recipe tags"
            >
              {tags.map((tag) => (
                <li
                  key={tag.id}
                  className="rounded-full bg-[#f3e7dc] px-3 py-1 text-xs font-semibold text-[#8f2d22]"
                >
                  {tag.label}
                </li>
              ))}
            </ul>
          )}

          <h2 className="font-display text-3xl leading-tight text-[#241814] transition-colors group-hover:text-[#a6291f]">
            {content.title}
          </h2>

          {content.description && (
            <p className="mt-3 leading-7 text-black/65">
              {content.description}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}