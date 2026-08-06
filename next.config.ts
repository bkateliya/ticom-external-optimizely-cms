import { remotePatterns } from "@/lib/next-config/images";
import { beforeFilesRewrites } from "@/lib/next-config/rewrites";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: remotePatterns,
  },
  transpilePackages: ['@ticom/form-components'],
  async rewrites() {
    return {
      beforeFiles: beforeFilesRewrites,
      afterFiles: [],
      fallback: [],
    };
  },
};

const withNextIntl = createNextIntlPlugin({
  experimental: {
    // Provide the path to the messages that you're using in `AppConfig`
    createMessagesDeclaration: "./messages/normalized.json",
  },
});
export default withNextIntl(nextConfig);
