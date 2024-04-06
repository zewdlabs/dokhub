import withBundleAnalyzer from "@next/bundle-analyzer";
import withMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // transpilePackages: ["@dokhub/ui"],
  output: "standalone",
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

const withMDXConfig = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withMDXConfig(withBundleAnalyzerConfig(nextConfig));
