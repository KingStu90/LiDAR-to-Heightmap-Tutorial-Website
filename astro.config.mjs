import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import satteriCallouts from "satteri-callouts";

import expressiveCode from "astro-expressive-code";

export default defineConfig({
  markdown: {
    processor: satteri({
      hastPlugins: [satteriCallouts()],
    }),
  },

  integrations: [expressiveCode()],
});