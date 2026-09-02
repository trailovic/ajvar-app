import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecipeBySlug, recipes } from "@/lib/recipes";

type RecipePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe || recipe.visibility === "private") {
    notFound();
  }

  const { content } = recipe;

  return (
    <main className="min-h-screen">
      <header className="border-b border-black/10">
        <div className="mx-auto flex h-20 max-w-5xl items-center px-6">
          <Link
            href="/"
            className="font-display text-3xl font-semibold text-[#a6291f]"
          >
            ajvar
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-5xl px-6 py-12">
        <Link
          href="/"
          className="text-sm font-medium text-[#a6291f] hover:underline"
        >
          ← Back to recipes
        </Link>

        <header className="mt-10 max-w-3xl">
          <h1 className="font-display text-5xl leading-tight text-[#241814] sm:text-7xl">
            {content.title}
          </h1>

          {content.description && (
            <p className="mt-6 text-xl leading-8 text-black/60">
              {content.description}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-6 border-y border-black/10 py-5 text-sm">
            {content.timing?.prepMinutes !== undefined && (
              <span>
                <strong>Prep:</strong> {content.timing.prepMinutes} min
              </span>
            )}

            {content.timing?.cookMinutes !== undefined && (
              <span>
                <strong>Cook:</strong> {content.timing.cookMinutes} min
              </span>
            )}

            {content.servings && (
              <span>
                <strong>Makes:</strong> {content.servings.amount}{" "}
                {content.servings.label ?? "servings"}
              </span>
            )}
          </div>
        </header>

        <div className="mt-14 grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <section>
            <h2 className="font-display text-3xl text-[#241814]">
              Ingredients
            </h2>

            <ul className="mt-6 divide-y divide-black/10">
              {content.ingredients.map((ingredient) => (
                <li key={ingredient.id} className="flex gap-3 py-4">
                  <span className="min-w-20 font-semibold text-[#a6291f]">
                    {[ingredient.amount, ingredient.unit]
                      .filter(Boolean)
                      .join(" ")}
                  </span>

                  <span>
                    {ingredient.name}
                    {ingredient.note && (
                      <span className="text-black/50">
                        {` — ${ingredient.note}`}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-3xl text-[#241814]">
              Preparation
            </h2>

            <ol className="mt-6 space-y-8">
              {content.steps.map((step, index) => (
                <li key={step.id} className="flex gap-5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#a6291f] font-semibold text-white">
                    {index + 1}
                  </span>

                  <div>
                    <p className="pt-1 text-lg leading-8">{step.text}</p>

                    {step.timerSeconds && (
                      <p className="mt-2 text-sm font-medium text-[#a6291f]">
                        Timer: {Math.round(step.timerSeconds / 60)} minutes
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {content.notes && content.notes.length > 0 && (
          <aside className="mt-16 rounded-3xl bg-[#efe2ca] p-7">
            <h2 className="font-display text-2xl text-[#241814]">
              Notes
            </h2>

            <ul className="mt-4 space-y-2 text-black/65">
              {content.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </aside>
        )}
      </article>
    </main>
  );
}