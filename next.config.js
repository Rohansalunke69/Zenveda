const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.alias['@/lib/api'] = require('path').resolve(__dirname, 'lib/api');
    return config;
  },
};

module.exports = nextConfig;
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // ✅ GitHub Pages (repo name: ZenVeda)
  output: "export",
  images: { unoptimized: true },
  basePath: "/ZenVeda",
  assetPrefix: "/ZenVeda/",

  webpack: (config) => {
    config.resolve.alias["@/lib/api"] = path.resolve(__dirname, "lib/api");
    return config;
  },
};

module.exports = nextConfig;
