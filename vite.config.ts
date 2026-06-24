import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const base = process.env.BASE_PATH
  ? `/${process.env.BASE_PATH.replace(/^\/|\/$/g, "")}/`
  : "/";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    // Prerender '/' to a static index.html so GitHub Pages has something to serve.
    // Combined with createHashHistory in src/router.tsx, the SPA handles all
    // subsequent routing client-side.
    prerender: {
      enabled: true,
      crawlLinks: false,
      routes: ["/"],
    },
    pages: [{ path: "/" }],
  },
  vite: {
    // For project pages: https://<user>.github.io/<repo>/
    // Set BASE_PATH=<repo> in CI; falls back to "/" for local dev.
    base,
  },
});
