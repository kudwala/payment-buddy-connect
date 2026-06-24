import { QueryClient } from "@tanstack/react-query";
import { createRouter, createHashHistory } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  // Hash history is only for the handcrafted static GitHub Pages shell.
  // When TanStack Start provides SSR bootstrap data, keep the default history
  // so server and client route matching stay identical during hydration.
  const history =
    typeof window !== "undefined" && !(window as { $_TSR?: unknown }).$_TSR
      ? createHashHistory()
      : undefined;

  const router = createRouter({
    routeTree,
    ...(history ? { history } : {}),
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
