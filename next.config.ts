import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  // Turso/libSQL এর নেটিভ মডিউল bundler দিয়ে না ভেঙে বাইরে রাখা হয়
  serverExternalPackages: ["@libsql/client", "libsql", "@prisma/client", ".prisma/client"],
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  devIndicators: false,
  allowedDevOrigins: ["*.space-z.ai"],
};

export default nextConfig;
