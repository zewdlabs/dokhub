import withMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // transpilePackages: ["@dokhub/ui"],
  output: "standalone",
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

const withMDXConfig = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDXConfig(nextConfig);
