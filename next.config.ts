import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-expect-error type missing in older or beta config definitions
  allowedDevOrigins: ['10.86.18.157'],
};

export default nextConfig;
