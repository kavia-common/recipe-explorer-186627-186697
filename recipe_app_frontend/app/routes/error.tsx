import { Link, useRouteError, isRouteErrorResponse } from "@remix-run/react";

export default function GlobalErrorBoundary() {
  const err = useRouteError();
  let title = "Unexpected Error";
  let message = "An unexpected error occurred.";
  let status: number | undefined = undefined;

  if (isRouteErrorResponse(err)) {
    status = err.status;
    title = err.statusText;
    message = err.data || message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  return (
    <div className="ocean-card p-6">
      <h1 className="text-xl font-semibold mb-2">{title}{status ? ` (${status})` : ""}</h1>
      <p className="muted">{message}</p>
      <div className="mt-4">
        <Link to="/" className="ocean-btn">← Back to home</Link>
      </div>
    </div>
  );
}
