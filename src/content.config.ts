import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const project = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/project",
  }),
});

export const collections = {
  project,
};

