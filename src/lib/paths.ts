const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Prefixes a public/ asset path with the deployment's basePath (e.g. GitHub
// Pages project sites), since Next.js only rewrites basePath automatically
// for next/link and next/navigation, not raw HTML src/href attributes.
export function asset(path: string) {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}