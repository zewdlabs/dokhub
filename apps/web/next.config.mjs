/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@wisecare/ui", "@wisecare/tailwind-config"],
  output: "standalone",
};

export default nextConfig;
