// @ts-check
import { defineConfig, envField } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  env: {
    schema: {
      FONTS_CDN_URL: envField.string({
        context: "server",
        access: "public",
        default: "https://font-repo.pages.dev",
      }),
    },
  },
});
