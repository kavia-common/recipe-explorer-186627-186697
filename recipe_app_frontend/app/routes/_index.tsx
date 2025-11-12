import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import { searchRecipes, type Recipe } from "~/data/recipes";

export const meta: MetaFunction = () => {
  return [
    { title: "Ocean Recipes — Explore and Search" },
    { name: "description", content: "Browse, search, and discover delicious recipes." },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get("q") ?? "";
    // Mocked data source; future: integrate with VITE_API_BASE or VITE_BACKEND_URL
    const data = searchRecipes(q);
    return json({ recipes: data, q });
  } catch (e) {
    // Basic error state
    return json({ recipes: [], q: "", error: "Failed to load recipes." }, { status: 500 });
  }
}

export default function Index() {
  const { recipes, q, error } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [input, setInput] = useState(q ?? "");
  const navigate = useNavigate();

  // Debounce search updates to the URL so loader can refilter (and client can filter in the meantime)
  useEffect(() => {
    const id = setTimeout(() => {
      const next = new URLSearchParams(searchParams);
      if (input) next.set("q", input);
      else next.delete("q");
      // avoid navigation if same
      if (next.toString() !== searchParams.toString()) {
        setSearchParams(next, { preventScrollReset: true });
      }
    }, 250);
    return () => clearTimeout(id);
  }, [input]); // eslint-disable-line react-hooks/exhaustive-deps

  // Client-side filter while typing for snappier UX
  const visible = useMemo<Recipe[]>(() => {
    if (!input) return recipes as Recipe[];
    const ql = input.toLowerCase();
    return (recipes as Recipe[]).filter(
      (r) =>
        r.title.toLowerCase().includes(ql) ||
        r.description.toLowerCase().includes(ql) ||
        r.tags.some((t) => t.toLowerCase().includes(ql))
    );
  }, [recipes, input]);

  return (
    <div className="space-y-6">
      <section
        className="ocean-card p-5 sm:p-6"
        aria-labelledby="search-title"
        style={{
          background:
            "linear-gradient(180deg, rgba(59,130,246,0.08), rgba(255,255,255,0.9))",
        }}
      >
        <h1 id="search-title" className="text-2xl sm:text-3xl font-semibold mb-2">
          Find your next recipe
        </h1>
        <p className="muted mb-4">
          Search by name, ingredient, or tag. Try “salmon”, “quick”, or “vegetarian”.
        </p>
        <div className="relative">
          <svg
            className="search-icon"
            width="18"
            height="18"
            viewBox="0 0 20 20"
            aria-hidden="true"
            fill="none"
          >
            <path
              d="M14.5 14.5L19 19"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle
              cx="9"
              cy="9"
              r="6.6"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
          <label htmlFor="search" className="visually-hidden">
            Search recipes
          </label>
          <input
            id="search"
            className="ocean-search"
            type="search"
            name="q"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search recipes..."
            autoComplete="off"
            aria-describedby={error ? "search-error" : undefined}
          />
        </div>
        {error ? (
          <p id="search-error" className="mt-2 text-sm" style={{ color: "var(--color-error)" }}>
            {error}
          </p>
        ) : null}
      </section>

      <section aria-labelledby="results-title">
        <div className="flex items-center justify-between mb-3">
          <h2 id="results-title" className="text-lg font-medium">
            {input ? `Results for “${input}”` : "Popular recipes"}
          </h2>
          <span className="ocean-tag ocean-badge-amber" aria-live="polite">
            {visible.length} {visible.length === 1 ? "recipe" : "recipes"}
          </span>
        </div>

        {visible.length === 0 ? (
          <div className="ocean-card p-6 text-center">
            <p className="mb-2 font-medium">No results</p>
            <p className="muted">
              We couldn’t find anything matching “{input}”. Try a different search term.
            </p>
            <button
              className="ocean-btn mt-4"
              onClick={() => {
                setInput("");
                navigate("/", { replace: true });
              }}
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid-autofill">
            {visible.map((r) => (
              <article key={r.id} className="ocean-card overflow-hidden">
                <Link
                  to={`/recipes/${r.id}`}
                  className="block focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
                  aria-label={`View details for ${r.title}`}
                >
                  <div className="relative">
                    <img
                      src={r.image}
                      alt=""
                      role="presentation"
                      className="h-44 w-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      aria-hidden="true"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.25))",
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{r.title}</h3>
                    <p className="muted text-sm line-clamp-2 mb-3">{r.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {r.tags.slice(0, 3).map((t) => (
                        <span key={t} className="ocean-tag">
                          {t}
                        </span>
                      ))}
                      <span className="ocean-tag ocean-badge-amber">
                        ⏱ {r.timeMinutes}m
                      </span>
                      <span className="ocean-tag">👥 {r.servings}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
