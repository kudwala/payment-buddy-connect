import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const base = process.env.BASE_PATH
  ? `/${process.env.BASE_PATH.replace(/^\/|\/$/g, "")}/`
  : "/";

export default defineConfig({
  tanstackStart: {
    client: {
      entry: "client",
    },
  },
  vite: {
    base,
  },
});
