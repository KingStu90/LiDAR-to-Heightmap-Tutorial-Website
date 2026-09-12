import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import satteriCallouts from "satteri-callouts";

import expressiveCode from "astro-expressive-code";

export default defineConfig({
  site: "https://KingStu90.github.io",
  base: "/LiDAR-to-Heightmap-Tutorial-Website",

  markdown: {
    processor: satteri({
      hastPlugins: [satteriCallouts()],
    }),
  },

  integrations: [expressiveCode()],
});
