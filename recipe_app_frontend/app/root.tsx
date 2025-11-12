import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import "./styles/theme.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = typeof document !== "undefined" ? window.location : undefined;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header className="ocean-nav">
          <nav className="ocean-container flex items-center justify-between py-4" aria-label="Primary">
            <Link to="/" className="flex items-center gap-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 rounded-md">
              <div
                aria-hidden="true"
                className="h-8 w-8 rounded-lg"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(37,99,235,0.9), rgba(37,99,235,0.5))",
                  boxShadow: "0 6px 16px rgba(37,99,235,0.35)",
                }}
              />
              <span className="text-lg font-semibold" style={{ color: "var(--color-text)" }}>
                Ocean Recipes
              </span>
            </Link>
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/"
                className="ocean-btn"
                aria-current={location?.pathname === "/" ? "page" : undefined}
              >
                Home
              </Link>
              <a
                className="ocean-btn primary"
                href="https://remix.run/docs"
                target="_blank"
                rel="noreferrer"
              >
                Docs
              </a>
            </div>
          </nav>
        </header>

        <main className="ocean-container py-6 sm:py-8">{children}</main>

        <footer className="ocean-container py-10">
          <hr className="divider" />
          <p className="mt-4 text-sm muted">
            Demo app — no backend required. Theme: Ocean Professional.
          </p>
        </footer>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
