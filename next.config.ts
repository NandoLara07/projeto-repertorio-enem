import type { NextConfig } from "next";

// GitHub Pages serves this project under /projeto-repertorio-enem/ instead of
// the domain root, so the build needs a matching basePath/assetPrefix.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/projeto-repertorio-enem" : "";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    viewTransition: true,
  },
  output: "export",
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
