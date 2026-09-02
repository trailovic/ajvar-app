import Link from "next/link";
import type { Recipe } from "@/schemas/recipe.schema";

type RecipeCardProps = {
  recipe: Recipe;
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  const { content } = recipe;

  const totalMinutes =
    (content.timing?.prepMinutes ?? 0) +
    (content.timing?.cookMinutes ?? 0);

  return (
    <article className="group overflow-hidden rounded-3xl border border-black/10 bg-white">
      <Link href={`/recipes/${recipe.slug}`} className="block">
        <div className="flex aspect-[16/10] items-center justify-center bg-[linear-gradient(135deg,#a6291f,#e2552f)]">
          <span className="font-display text-8xl text-white/90">
            {content.title.charAt(0)}
          </span>
        </div>

        <div className="p-6">
          <div className="mb-3 flex gap-4 text-sm text-black/55">
            {totalMinutes > 0 && <span>{totalMinutes} min</span>}

            {content.servings && (
              <span>
                {content.servings.amount}{" "}
                {content.servings.label ?? "servings"}
              </span>
            )}
          </div>

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