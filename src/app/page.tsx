import Link from "next/link";
import { BookOpen, UserRound } from "lucide-react";
import { AddRecipeDialog } from "@/components/recipes/add-recipe-dialog";

import { DiscoverFeed } from "@/components/recipes/discover-feed";
import { recipes } from "@/lib/recipes";
import { recipeTags, tags } from "@/lib/tags";

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

          <nav
            className="flex items-center gap-2"
            aria-label="Main navigation"
          >
            <Link
              href="/"
              className="mr-2 rounded-full bg-[#241814] px-5 py-2.5 text-sm font-medium text-white"
            >
              Discover
            </Link>

            <AddRecipeDialog />

            <button
              type="button"
              disabled
              title="Cookbooks — coming soon"
              aria-label="Cookbooks — coming soon"
              className="flex size-10 cursor-not-allowed items-center justify-center rounded-full border border-black/10 bg-white text-[#241814] opacity-60"
            >
              <BookOpen
                className="size-5"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              disabled
              title="Profile — coming soon"
              aria-label="Profile — coming soon"
              className="flex size-10 cursor-not-allowed items-center justify-center rounded-full border border-black/10 bg-white text-[#241814] opacity-60"
            >
              <UserRound
                className="size-5"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </button>
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

        <DiscoverFeed
          recipes={publicRecipes}
          tags={tags}
          recipeTags={recipeTags}
        />
      </main>
    </>
  );
}