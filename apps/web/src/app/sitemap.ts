import type { MetadataRoute } from "next";

// This allows us to generate a `sitemap.xml` file dynamically based on the needs of the Node.js Website
// Next.js Sitemap Generation doesn't support `alternate` refs yet
// @see https://github.com/vercel/next.js/discussions/55646
const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const paths: Array<string> = [];

  // Add all the static pages here before returning the paths

  const currentDate = new Date().toISOString();

  return [...paths].map((route) => ({
    url: route,
    lastModified: currentDate,
    changeFrequency: "always",
  }));
};

export default sitemap;

// Enforces that this route is used as static rendering
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "error";
