/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@docswriter/ui"],
  env: {
    SERVER_URL: process.env.SERVER_URL
  }
}

export default nextConfig
