import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const base = process.env.BASE_PATH
  ? `/${process.env.BASE_PATH.replace(/^\/|\/$/g, "")}/`
  : "/";

export default defineConfig({
  tanstackStart: {
    // Prerender '/' to produce a static index.html for GitHub Pages.
    // Hash history (src/router.tsx) handles all other routes on the client.
    prerender: {
      enabled: true,
      crawlLinks: false,
      routes: ["/"],
    },
    pages: [{ path: "/" }],
  },
  vite: {
    base,
  },
});
