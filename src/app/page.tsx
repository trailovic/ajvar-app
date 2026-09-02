import Link from "next/link";
import { RecipeCard } from "@/components/recipes/recipe-card";
import { recipes } from "@/lib/recipes";
import { getTagsForRecipe } from "@/lib/tags";

export default function HomePage() {
  const publicRecipes = recipes.filter(
    (recipe) => recipe.visibility === "public",
  );

  return (
    <>
      <header className="border-b border-black/10 bg-[#f7f2e8]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link
            href="/"
            className="font-display text-3xl font-semibold text-[#a6291f]"
          >
            ajvar
          </Link>

          <nav aria-label="Main navigation">
            <Link
              href="/"
              className="rounded-full bg-[#241814] px-5 py-2.5 text-sm font-medium text-white"
            >
              Discover
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-14">
        <section className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#a6291f]">
            Discover
          </p>

          <h1 className="font-display text-5xl leading-tight text-[#241814] sm:text-6xl">
            What shall we cook today?
          </h1>

          <p className="mt-5 text-lg leading-8 text-black/60">
            Recipes worth discovering, saving and actually cooking.
          </p>
        </section>

        <section aria-labelledby="latest-recipes">
          <div className="mb-6 flex items-end justify-between">
            <h2
              id="latest-recipes"
              className="font-display text-3xl text-[#241814]"
            >
              Latest recipes
            </h2>

            <span className="text-sm text-black/50">
              {publicRecipes.length}{" "}
              {publicRecipes.length === 1 ? "recipe" : "recipes"}
            </span>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {publicRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                tags={getTagsForRecipe(recipe.id)}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}