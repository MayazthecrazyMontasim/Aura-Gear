import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root so Next doesn't pick up a stray lockfile in the home dir.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
