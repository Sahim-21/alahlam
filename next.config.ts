import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  // Points to our custom request config (cookie-based locale resolution)
  "./src/i18n/request.ts"
);

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
