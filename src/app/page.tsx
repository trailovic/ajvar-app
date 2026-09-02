import Link from "next/link";
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

        <DiscoverFeed
          recipes={publicRecipes}
          tags={tags}
          recipeTags={recipeTags}
        />
      </main>
    </>
  );
}