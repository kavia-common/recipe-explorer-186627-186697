import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getRecipeById, type Recipe } from "~/data/recipes";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const title = data?.recipe?.title
    ? `${data.recipe.title} — Ocean Recipes`
    : "Recipe — Ocean Recipes";
  return [
    { title },
    { name: "description", content: data?.recipe?.description ?? "Recipe details" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id!;
  const recipe = getRecipeById(id);
  if (!recipe) {
    throw new Response("Recipe not found", { status: 404 });
  }
  return json({ recipe });
}

export default function RecipeDetail() {
  const { recipe } = useLoaderData<typeof loader>() as { recipe: Recipe };

  return (
    <article className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <Link to="/" className="ocean-btn" aria-label="Back to list">
          ← Back
        </Link>
        <div className="flex items-center gap-2">
          <span className="ocean-tag ocean-badge-amber">⏱ {recipe.timeMinutes}m</span>
          <span className="ocean-tag">👥 {recipe.servings} servings</span>
        </div>
      </div>

      <header>
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2">{recipe.title}</h1>
        <p className="muted">{recipe.description}</p>
      </header>

      <div className="ocean-hero">
        <img
          src={recipe.image}
          alt={`${recipe.title} hero`}
          className="w-full h-72 sm:h-96 object-cover"
        />
      </div>

      <section className="ocean-card p-5 sm:p-6" aria-labelledby="ingredients-title">
        <h2 id="ingredients-title" className="text-xl font-semibold mb-3">Ingredients</h2>
        <ul className="list-disc pl-6 space-y-2">
          {recipe.ingredients.map((item, i) => (
            <li key={i} className="muted">{item}</li>
          ))}
        </ul>
      </section>

      <section className="ocean-card p-5 sm:p-6" aria-labelledby="steps-title">
        <h2 id="steps-title" className="text-xl font-semibold mb-3">Steps</h2>
        <ol className="list-decimal pl-6 space-y-3">
          {recipe.steps.map((step, i) => (
            <li key={i}>
              <p className="muted">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-label="Tags">
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((t) => (
            <span key={t} className="ocean-tag">{t}</span>
          ))}
        </div>
      </section>
    </article>
  );
}

// PUBLIC_INTERFACE
export function ErrorBoundary() {
  return (
    <div className="ocean-card p-6">
      <h2 className="text-lg font-semibold mb-1">Something went wrong</h2>
      <p className="muted">We couldn&apos;t load the recipe details. Please go back and try another one.</p>
      <div className="mt-4">
        <Link to="/" className="ocean-btn">← Back to recipes</Link>
      </div>
    </div>
  );
}
